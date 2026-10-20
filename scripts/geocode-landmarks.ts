import { mkdir, readFile, writeFile, open, unlink, rename } from 'node:fs/promises';
import { setTimeout as delay } from 'node:timers/promises';

// Manual, one-machine batch only. Never import this script into the app.
// Policy: https://operations.osmfoundation.org/policies/nominatim/
const endpoint = process.env.NOMINATIM_SEARCH_URL ?? 'https://nominatim.openstreetmap.org/search';
// Explicit manual retry only after fixing connectivity; successful/empty lookups stay cached.
const retryErrors = process.argv.includes('--retry-errors');
const userAgent = 'van-hoc-map/1.0 (manual landmark coordinate review)';
const outputDirectory = new URL('./output/', import.meta.url);
const outputFile = new URL('geocode-candidates.json', outputDirectory);
const lockFile = new URL('geocode.lock', outputDirectory);

type Candidate = {
  name: string;
  type: string;
  display_name: string;
  lat: number;
  lng: number;
  // Nominatim order: south, north, west, east.
  boundingbox: [number, number, number, number];
  osm_type: string;
  osm_id: number;
};
type SearchResult = {
  query: string;
  url: string;
  fetchedAt: string;
  status: 'ok' | 'error';
  candidates: Candidate[];
  error?: string;
};
type Plan = { order: number; slug: string; name: string; queries: string[]; note?: string; referenceSlug?: string };
const plan: Plan[] = [
  { order: 1, slug: 'thap-ba-po-nagar', name: 'Tháp Bà Po Nagar', queries: ['Tháp Bà Ponagar, Nha Trang, Khánh Hòa'] },
  { order: 2, slug: 'duong-len-nui-da-trang', name: 'Đường lên núi Đá Trắng', queries: [], referenceSlug: 'nui-da-trang', note: 'Đặt tay điểm trên đường; tham khảo kết quả núi của mốc 3, không dùng tâm núi làm tọa độ đường.' },
  { order: 3, slug: 'nui-da-trang', name: 'Cek Yang Patao - núi Đá Trắng', queries: ['Núi Đá Trắng, Việt Nam'] },
  { order: 4, slug: 'nha-sinh-hoat-cham', name: 'Nhà sinh hoạt cộng đồng Chăm', queries: [], note: 'Cần tên làng và tọa độ đặt tay.' },
  { order: 5, slug: 'cua-bien-phan-ri', name: 'Cửa biển Phan Rí', queries: ['Cửa Phan Rí, Tuy Phong'] },
  { order: 6, slug: 'nuong-ray-cham', name: 'Nương rẫy của người Chăm', queries: [], note: 'Cần tọa độ đặt tay.' },
  { order: 7, slug: 'nuong-ngo', name: 'Nương ngô', queries: [], note: 'Cần tọa độ đặt tay.' },
];

function record(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}
function numeric(value: unknown): number {
  if ((typeof value !== 'string' && typeof value !== 'number') || value === '') throw new Error('Missing numeric value');
  const result = Number(value);
  if (!Number.isFinite(result)) throw new Error('Invalid numeric value');
  return result;
}
function parseCandidates(value: unknown): Candidate[] {
  if (!Array.isArray(value)) throw new Error('Nominatim response is not an array');
  return value.map((item: unknown) => {
    if (!record(item) || typeof item.display_name !== 'string' || typeof item.type !== 'string'
      || !Array.isArray(item.boundingbox) || item.boundingbox.length !== 4) throw new Error('Invalid Nominatim candidate');
    const lat = numeric(item.lat), lng = numeric(item.lng ?? item.lon);
    const [south, north, west, east] = item.boundingbox.map(numeric);
    if (Math.abs(lat) > 90 || Math.abs(lng) > 180 || south > north || west > east) throw new Error('Invalid coordinates');
    return { name: typeof item.name === 'string' ? item.name : '', type: item.type,
      display_name: item.display_name, lat, lng, boundingbox: [south, north, west, east],
      osm_type: typeof item.osm_type === 'string' ? item.osm_type : '', osm_id: numeric(item.osm_id) };
  });
}

function printSummary(searches: SearchResult[]) {
  console.table(plan.flatMap<Record<string, string | number>>((landmark) => {
    const results = searches.filter((search) => landmark.queries.includes(search.query));
    const candidates = results.flatMap((search) => search.candidates);
    return candidates.length ? candidates.map((candidate, index) => ({
      order: landmark.order, slug: landmark.slug, candidate: index + 1,
      display_name: candidate.display_name, lng: candidate.lng, lat: candidate.lat, status: 'Chờ duyệt',
    })) : [{ order: landmark.order, slug: landmark.slug, candidate: '', display_name: '', lng: '', lat: '',
      status: !landmark.queries.length ? landmark.note ?? 'Đặt tay' : results.some((s) => s.status === 'error') ? 'Lỗi tra cứu; xem JSON' : 'Không có ứng viên; cần đặt tay' }];
  }));
}

async function main() {
  await mkdir(outputDirectory, { recursive: true });
  const lock = await open(lockFile, 'wx'); // Refuse parallel runs.
  const searches: SearchResult[] = [];
  try {
    try {
      const cached: unknown = JSON.parse(await readFile(outputFile, 'utf8'));
      if (!record(cached) || cached.version !== 1 || !Array.isArray(cached.searches)) throw new Error('Invalid cache; inspect output before rerunning');
      for (const item of cached.searches as unknown[]) {
        if (!record(item) || typeof item.query !== 'string' || typeof item.url !== 'string'
          || typeof item.fetchedAt !== 'string' || (item.status !== 'ok' && item.status !== 'error')) throw new Error('Invalid cached search');
        searches.push({ query: item.query, url: item.url, fetchedAt: item.fetchedAt, status: item.status,
          candidates: parseCandidates(item.candidates), ...(typeof item.error === 'string' ? { error: item.error } : {}) });
      }
    } catch (error) {
      if (!record(error) || error.code !== 'ENOENT') throw error;
    }
    const save = async () => {
      const tempFile = new URL('geocode-candidates.json.tmp', outputDirectory);
      await writeFile(tempFile, JSON.stringify({ version: 1, provider: endpoint,
        attribution: '© OpenStreetMap contributors, ODbL', policy: 'https://operations.osmfoundation.org/policies/nominatim/',
        searches, landmarks: plan.map((landmark) => ({ ...landmark, approvedCoordinates: null,
          candidates: searches.filter((s) => landmark.queries.includes(s.query)).flatMap((s) => s.candidates),
        })),
      }, null, 2) + '\n');
      await rename(tempFile, outputFile);
    };
    // Cache empty results and errors too. No automatic retries or refreshes.
    let lastFinished = 0;
    for (const landmark of plan) {
      for (const query of landmark.queries) {
        const cachedIndex = searches.findIndex((s) => s.query === query);
        if (cachedIndex >= 0) {
          if (!retryErrors || searches[cachedIndex].status !== 'error') continue;
          searches.splice(cachedIndex, 1);
        }
        await delay(Math.max(0, 1100 - (performance.now() - lastFinished)));
        const url = new URL(endpoint);
        url.search = new URLSearchParams({ format: 'jsonv2', countrycodes: 'vn', limit: '5', 'accept-language': 'vi', q: query }).toString();
        const result: SearchResult = { query, url: url.href, fetchedAt: new Date().toISOString(), status: 'ok', candidates: [] };
        let throttled = false;
        try {
          console.log(`Searching: ${query}`);
          const response = await fetch(url, { headers: { 'User-Agent': userAgent, Accept: 'application/json' }, signal: AbortSignal.timeout(30000) });
          throttled = response.status === 429 || response.status === 403;
          if (!response.ok) throw new Error(`Nominatim HTTP ${response.status}`);
          const body: unknown = await response.json();
          result.candidates = parseCandidates(body);
        } catch (error) {
          result.status = 'error';
          result.error = error instanceof Error
            ? `${error.message}${error.cause instanceof Error ? `: ${error.cause.message}` : ''}`
            : String(error);
          console.error(`${query}: ${result.error}`);
        } finally {
          lastFinished = performance.now();
        }
        searches.push(result);
        await save();
        if (throttled) throw new Error('Service denied or rate-limited the batch; stopped without retrying. Partial results saved.');
        if (result.candidates.length) break;
      }
    }
    await save();
    printSummary(searches);
    console.log(`Saved ${outputFile.pathname}. Coordinates are candidates only; landmarksData.ts was not changed.`);
    if (searches.some((s) => s.status === 'error')) process.exitCode = 1;
  } finally {
    await lock.close();
    await unlink(lockFile);
  }
}
main().catch((error: unknown) => { console.error(error); process.exitCode = 1; });

import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { setTimeout as delay } from 'node:timers/promises';
import * as turf from '@turf/turf';

// Center of Phan Rí Cửa town (Wikipedia: 11°10′26″N 108°33′58″E -> [108.56611, 11.17389])
const CENTER_LNG_LAT: [number, number] = [108.56611, 11.17389];
const CENTER_LAT = 11.17389;
const CENTER_LNG = 108.56611;
const RADIUS_METERS = 3000;

const USER_AGENT = 'van-hoc-map/1.0';

const OVERPASS_ENDPOINTS = [
  'https://overpass.openstreetmap.fr/api/interpreter',
  'https://overpass-api.de/api/interpreter',
];

interface OsmElement {
  type: 'node' | 'way' | 'relation';
  id: number;
  lat?: number;
  lon?: number;
  center?: { lat: number; lon: number };
  bounds?: { minlat: number; minlon: number; maxlat: number; maxlon: number };
  geometry?: Array<{ lat: number; lon: number }>;
  nodes?: number[];
  tags?: Record<string, string>;
}

interface OverpassResponse {
  version: number;
  elements: OsmElement[];
}

export interface PhanRiCandidate {
  id: string; // e.g. "node/123" or "way/456"
  osmId: number;
  osmType: 'node' | 'way' | 'relation';
  name: string;
  category: string;
  lng: number;
  lat: number;
  distanceToCenterMeters: number;
  distanceToCoastMeters: number;
  province: string;
  isValid: boolean;
  notes: string;
}

async function queryOverpass(query: string): Promise<OsmElement[]> {
  for (const endpoint of OVERPASS_ENDPOINTS) {
    try {
      console.log(`Đang gọi Overpass: ${endpoint}...`);
      const body = `data=${encodeURIComponent(query)}`;
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'User-Agent': USER_AGENT,
        },
        body,
        signal: AbortSignal.timeout(35000),
      });

      if (!res.ok) {
        console.warn(`Endpoint ${endpoint} trả mã lỗi ${res.status}`);
        continue;
      }

      const json = (await res.json()) as OverpassResponse;
      if (Array.isArray(json.elements)) {
        return json.elements;
      }
    } catch (err) {
      console.warn(`Lỗi khi gọi ${endpoint}:`, err instanceof Error ? err.message : String(err));
    }
  }
  return [];
}

type TurfPoint = ReturnType<typeof turf.point>;
type TurfLine = Parameters<typeof turf.pointToLineDistance>[1];
type TurfPolygon = Parameters<typeof turf.booleanPointInPolygon>[1];
type TurfPolygonFeature = Extract<TurfPolygon, { type: 'Feature' }>;

interface ProvinceProperties {
  name: string;
  merged?: string;
  code?: string;
}

interface ProvinceGeoFeature {
  type: 'Feature';
  geometry: TurfPolygonFeature['geometry'];
  properties: ProvinceProperties;
}

async function main() {
  console.log('--- TÌM KIẾM ỨNG VIÊN CỬA BIỂN PHAN RÍ ---');
  console.log(`Tâm xã Phan Rí Cửa: [${CENTER_LNG}, ${CENTER_LAT}] (Wikipedia)`);
  console.log(`Bán kính tìm kiếm: ${RADIUS_METERS} m`);

  // 1. Tải GeoJSON các tỉnh Việt Nam để tính ranh giới bờ biển và tỉnh
  const provincesGeoRaw = JSON.parse(await readFile('public/data/vietnam-provinces.geojson', 'utf8')) as {
    type: 'FeatureCollection';
    features: ProvinceGeoFeature[];
  };

  // Tạo các đoạn thẳng ranh giới để đo khoảng cách tới bờ biển
  const boundaryLines: TurfLine[] = [];
  for (const feat of provincesGeoRaw.features) {
    const line = turf.polygonToLine(feat as unknown as Parameters<typeof turf.polygonToLine>[0]);
    const flattened = turf.flatten(line);
    for (const f of flattened.features) {
      boundaryLines.push(f);
    }
  }

  // Hàm tính khoảng cách tới bờ biển (m)
  function getDistanceToCoast(pt: TurfPoint): number {
    let minDistKm = Infinity;
    for (const line of boundaryLines) {
      const d = turf.pointToLineDistance(pt, line, { units: 'kilometers' });
      if (d < minDistKm) minDistKm = d;
    }
    return Math.round(minDistKm * 1000);
  }

  // Hàm xác định tỉnh chứa điểm
  function getProvince(pt: TurfPoint): string {
    for (const feat of provincesGeoRaw.features) {
      if (turf.booleanPointInPolygon(pt, feat as unknown as Parameters<typeof turf.booleanPointInPolygon>[1])) {
        return feat.properties.name;
      }
    }
    // Nếu điểm nằm sát mép biển ngoài polygon đất liền, tìm tỉnh gần nhất
    let nearestProv = 'Biển (ngoài ranh giới)';
    let minDist = Infinity;
    for (const feat of provincesGeoRaw.features) {
      const line = turf.polygonToLine(feat as unknown as Parameters<typeof turf.polygonToLine>[0]);
      const flattened = turf.flatten(line);
      for (const f of flattened.features) {
        const d = turf.pointToLineDistance(pt, f, { units: 'kilometers' });
        if (d < minDist) {
          minDist = d;
          nearestProv = feat.properties.name;
        }
      }
    }
    return nearestProv;
  }

  const centerPoint = turf.point(CENTER_LNG_LAT);

  // Danh sách các câu truy vấn Overpass riêng biệt (để tránh quá tải)
  // Quy định: tối đa 1 request / giây
  const queries = [
    {
      desc: 'Sông Lũy và các dòng sông/kênh',
      ql: `[out:json][timeout:25];way["waterway"~"river|canal"](around:${RADIUS_METERS},${CENTER_LAT},${CENTER_LNG});out body geom;`,
    },
    {
      desc: 'Bến cảng (harbour)',
      ql: `[out:json][timeout:25];nwr["harbour"](around:${RADIUS_METERS},${CENTER_LAT},${CENTER_LNG});out body geom;`,
    },
    {
      desc: 'Cầu tàu (pier)',
      ql: `[out:json][timeout:25];nwr["man_made"="pier"](around:${RADIUS_METERS},${CENTER_LAT},${CENTER_LNG});out body geom;`,
    },
    {
      desc: 'Cảng (amenity=port)',
      ql: `[out:json][timeout:25];nwr["amenity"="port"](around:${RADIUS_METERS},${CENTER_LAT},${CENTER_LNG});out body geom;`,
    },
    {
      desc: 'Điểm có tên chứa "Phan Rí", "cảng cá", "Lũy"',
      ql: `[out:json][timeout:25];node["name"~"Phan Rí|cảng cá|Lũy",i](around:${RADIUS_METERS},${CENTER_LAT},${CENTER_LNG});out body;`,
    },
    {
      desc: 'Đường/vùng có tên chứa "Phan Rí", "cảng cá", "Lũy"',
      ql: `[out:json][timeout:25];way["name"~"cảng cá|Cảng cá|Phan Rí",i](around:${RADIUS_METERS},${CENTER_LAT},${CENTER_LNG});out body geom;`,
    },
  ];

  const rawElements: OsmElement[] = [];

  for (let i = 0; i < queries.length; i++) {
    const q = queries[i];
    console.log(`[${i + 1}/${queries.length}] Đang truy vấn: ${q.desc}...`);
    const elems = await queryOverpass(q.ql);
    console.log(` -> Nhận được ${elems.length} phần tử.`);
    rawElements.push(...elems);
    // Chờ 1.5 giây giữa các lượt gọi
    await delay(1500);
  }

  // Xử lý các phần tử tìm được thành danh sách ứng viên
  const candidates: PhanRiCandidate[] = [];
  const seenKeys = new Set<string>();

  for (const el of rawElements) {
    const key = `${el.type}/${el.id}`;
    if (seenKeys.has(key)) continue;
    seenKeys.add(key);

    const tags = el.tags ?? {};
    const name = tags.name ?? tags['name:vi'] ?? tags['name:en'] ?? '(Không có tên)';

    // Xác định tọa độ
    let lng: number | undefined;
    let lat: number | undefined;
    let category = el.tags?.waterway ?? el.tags?.harbour ?? el.tags?.amenity ?? el.tags?.man_made ?? el.type;

    if (el.type === 'node' && el.lon !== undefined && el.lat !== undefined) {
      lng = el.lon;
      lat = el.lat;
    } else if (el.geometry && el.geometry.length > 0) {
      // Đối với dòng sông có tên Sông Lũy:
      // Đặc biệt chú ý điểm nút cuối cùng đổ ra biển
      if (tags.waterway === 'river' && /Lũy/i.test(name)) {
        // Nút cuối cùng ở hạ lưu sông
        const lastNode = el.geometry[el.geometry.length - 1];
        const riverMouthPt = turf.point([lastNode.lon, lastNode.lat]);
        const distToCenter = Math.round(turf.distance(centerPoint, riverMouthPt, { units: 'meters' }));
        const distToCoast = getDistanceToCoast(riverMouthPt);
        const prov = getProvince(riverMouthPt);

        candidates.push({
          id: `${key}/river-mouth`,
          osmId: el.id,
          osmType: el.type,
          name: `${name} (Nút hạ lưu đổ ra biển)`,
          category: 'Cửa sông đổ ra biển (river mouth)',
          lng: Number(lastNode.lon.toFixed(6)),
          lat: Number(lastNode.lat.toFixed(6)),
          distanceToCenterMeters: distToCenter,
          distanceToCoastMeters: distToCoast,
          province: prov,
          isValid: distToCoast <= 300 && distToCenter <= 3000 && prov.includes('Lâm Đồng'),
          notes: 'Nút cuối cùng của Sông Lũy trước khi hòa vào biển Đông',
        });
      }

      // Điểm trọng tâm hoặc trung điểm của way
      const coords = el.geometry.map((g) => [g.lon, g.lat]);
      const line = turf.lineString(coords);
      const center = turf.center(line);
      lng = center.geometry.coordinates[0];
      lat = center.geometry.coordinates[1];
    }

    if (lng === undefined || lat === undefined) continue;

    const pt = turf.point([lng, lat]);
    const distToCenter = Math.round(turf.distance(centerPoint, pt, { units: 'meters' }));
    const distToCoast = getDistanceToCoast(pt);
    const prov = getProvince(pt);

    // Điều kiện hợp lệ:
    // - cách bờ biển <= 300 m
    // - nằm trong tỉnh Lâm Đồng theo GeoJSON
    // - cách tâm xã <= 3 km
    const isValid = distToCoast <= 300 && distToCenter <= 3000 && prov.includes('Lâm Đồng');

    candidates.push({
      id: key,
      osmId: el.id,
      osmType: el.type,
      name,
      category,
      lng: Number(lng.toFixed(6)),
      lat: Number(lat.toFixed(6)),
      distanceToCenterMeters: distToCenter,
      distanceToCoastMeters: distToCoast,
      province: prov,
      isValid,
      notes: Object.entries(tags)
        .slice(0, 3)
        .map(([k, v]) => `${k}=${v}`)
        .join(', '),
    });
  }

  // Sắp xếp: các ứng viên hợp lệ lên trước, ưu tiên khoảng cách tới bờ biển nhỏ nhất
  candidates.sort((a, b) => {
    if (a.isValid && !b.isValid) return -1;
    if (!a.isValid && b.isValid) return 1;
    return a.distanceToCoastMeters - b.distanceToCoastMeters;
  });

  // Lưu kết quả vào scripts/output/phan-ri-candidates.json
  await mkdir('scripts/output', { recursive: true });
  const outputFile = 'scripts/output/phan-ri-candidates.json';
  const outputData = {
    generatedAt: new Date().toISOString(),
    searchCenter: {
      name: 'Tâm xã Phan Rí Cửa (Wikipedia)',
      coordinates: CENTER_LNG_LAT,
    },
    criteria: {
      maxDistanceToCoastMeters: 300,
      maxDistanceToCenterMeters: 3000,
      requiredProvince: 'Lâm Đồng (theo GeoJSON)',
    },
    totalCandidatesFound: candidates.length,
    validCandidatesCount: candidates.filter((c) => c.isValid).length,
    candidates,
  };

  await writeFile(outputFile, JSON.stringify(outputData, null, 2), 'utf8');
  console.log(`\nĐã lưu kết quả ra ${outputFile}`);

  // In bảng ứng viên
  console.log('\n================ BẢNG ỨNG VIÊN CỬA BIỂN PHAN RÍ ================');
  console.table(
    candidates.map((c) => ({
      ID: c.id,
      Tên: c.name.slice(0, 35),
      Loại: c.category,
      'Kinh độ (lng)': c.lng,
      'Vĩ độ (lat)': c.lat,
      'Cách tâm xã (m)': c.distanceToCenterMeters,
      'Cách bờ biển (m)': c.distanceToCoastMeters,
      Tỉnh: c.province,
      'Hợp lệ': c.isValid ? '✅ HỢP LỆ' : '❌ Loại',
    }))
  );
  console.log('=================================================================\n');
}

main().catch((err: unknown) => {
  console.error('Lỗi khi thực thi tìm kiếm Phan Rí:', err);
  process.exitCode = 1;
});

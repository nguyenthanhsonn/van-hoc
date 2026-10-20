import { readFile, writeFile } from 'node:fs/promises';
import { union, mask, cleanCoords, buffer, featureCollection, flatten, difference, area } from '@turf/turf';

async function main() {
  const input = JSON.parse(await readFile('public/data/vietnam-provinces.geojson', 'utf8')) as Parameters<typeof union>[0];
  const polygons = input.features.filter((f) => f.geometry?.type === 'Polygon' || f.geometry?.type === 'MultiPolygon');
  const original = featureCollection(polygons);
  let vietnam: ReturnType<typeof union>;
  try {
    vietnam = union(original);
  } catch {
    console.warn('Union failed; retrying with cleanCoords + buffer(0).');
    vietnam = union(featureCollection(polygons.map((f) => {
      const repaired = buffer(cleanCoords(f), 0, { units: 'meters' });
      if (!repaired || repaired.type !== 'Feature') throw new Error('Cannot repair polygon');
      return repaired;
    })));
  }
  if (!vietnam) throw new Error('Union returned no geometry');
  const before = flatten(original);
  const after = flatten(vietnam);
  // Verify every component, including offshore islands, survives the union.
  const missing = before.features.filter((part) => {
    const remainder = difference(featureCollection([part, vietnam]));
    return remainder !== null && area(remainder) > 1; // tolerate <1 m² numerical slivers
  });
  if (missing.length) throw new Error(`${missing.length} input polygon(s) lost during union`);
  const result = mask(vietnam);
  await writeFile('public/data/vietnam-mask.geojson', JSON.stringify(result) + '\n');
  console.log(`Polygons in: ${before.features.length}; union: ${after.features.length}; mask holes: ${result.geometry.coordinates.length - 1}; lost: ${missing.length}`);
}

main().catch((error: unknown) => {
  console.error(error);
  process.exitCode = 1;
});

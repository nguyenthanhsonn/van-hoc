import { existsSync, readFileSync } from 'node:fs';
import path from 'node:path';
import { cache } from 'react';

export const availableImage = (src?: string) => {
  if (!src?.startsWith('/images/landmarks/')) return undefined;
  const directory = path.resolve(process.cwd(), 'public/images/landmarks');
  const candidate = path.resolve(process.cwd(), 'public', src.slice(1));
  return candidate.startsWith(directory + path.sep) && existsSync(candidate) ? src : undefined;
};

// Use the actual map geometry so the dot and coastline share one coordinate system.
export const miniMapPaths = cache(() => {
  try {
    const geo = JSON.parse(readFileSync(path.join(process.cwd(), 'public/data/vietnam-provinces.geojson'), 'utf8')) as {
      features: { geometry: { type: string; coordinates: number[][][][] } }[];
    };
    return geo.features.filter((f) => f.geometry.type === 'MultiPolygon').flatMap((f) => f.geometry.coordinates)
      .filter((polygon) => polygon[0].length > 6)
      .map((polygon) => polygon.map((ring) => ring.map(([lng, lat], index) => {
        const [x, y] = miniMapPoint([lng, lat]);
        return `${index ? 'L' : 'M'}${x.toFixed(1)},${y.toFixed(1)}`;
      }).join(' ') + 'Z').join(' '));
  } catch { return []; }
});

export function miniMapPoint([lng, lat]: readonly number[]) {
  // Linear geographic schematic, including both archipelagos, not a navigation map.
  return [16 + (lng - 102) / 16.2 * 228, 16 + (23.6 - lat) / 17 * 238];
}

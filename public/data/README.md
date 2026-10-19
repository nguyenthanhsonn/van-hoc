# Map data and glyphs

`vietnam-provinces.geojson` contains the 34 province polygons from the existing project data. Duplicate point features were removed; every province now has a precomputed `labelPoint` (polylabel, precision 0.001 degrees, on its largest polygon).

Geometry processing: mapshaper 8% `keep-shapes`, output precision 0.0001 degrees. Original island rings around Phú Quốc, Côn Đảo and Cát Bà were restored at four decimal places after simplification. Result: 129,547 bytes. Archipelago dots and labels are configured separately in `src/features/map/config/mapConfig.ts`.

`fonts/Noto Sans Regular/*.pbf` are generated with fontnik 0.7.7 from NotoSans-Regular.ttf, https://github.com/notofonts/noto-fonts/tree/main/hinted/ttf/NotoSans. License: `fonts-LICENSE.txt` (SIL OFL). Included Unicode ranges cover Latin, Latin Extended, combining accents, Vietnamese and general punctuation. Next.js rewrites `/fonts/{fontstack}/{range}.pbf` to these local assets, requiring no external font service at runtime.

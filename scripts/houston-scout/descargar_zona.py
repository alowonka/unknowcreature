#!/usr/bin/env python3
"""Descarga una zona de OpenStreetMap (Overpass) para Houston Location Scout.

Guarda public/houston-scout/data/<clave>.json con el formato que lee la app:
{"name", "lat", "lon", "r", "elements": [...]}

Uso:
  # zona por radio (metros) alrededor de un punto
  python3 descargar_zona.py montrose 29.7442 -95.3906 450 "Montrose"
  # zona por caja (sur oeste norte este); r = medio lado aproximado
  python3 descargar_zona.py skyline --bbox 29.7530 -95.3790 29.7770 -95.3580 1300 "Skyline desde White Oak Bayou"

Pide primero vías (calles + tren), luego edificios con building:part y luego
parques/agua/árboles. Overpass falla seguido (504/timeouts): el script rota
entre espejos y reintenta cada 2 minutos.
"""
import json, math, os, sys, time, urllib.parse, urllib.request

OUT = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', '..', 'public', 'houston-scout', 'data')
MIRRORS = [
    'https://maps.mail.ru/osm/tools/overpass/api/interpreter',
    'https://overpass-api.de/api/interpreter',
    'https://overpass.private.coffee/api/interpreter',
    'https://overpass.kumi.systems/api/interpreter',
]


def query(body, label, rounds=15):
    for r in range(rounds):
        for ep in MIRRORS:
            try:
                data = urllib.parse.urlencode({'data': f'[out:json][timeout:120];({body});out geom;'}).encode()
                req = urllib.request.Request(ep, data=data, headers={'User-Agent': 'houston-scout/1.0'})
                els = json.load(urllib.request.urlopen(req, timeout=150))['elements']
                print(f'{label}: {len(els)} elementos ({ep.split("/")[2]})', flush=True)
                return els
            except Exception as e:
                print(f'  {label} falló en {ep.split("/")[2]}: {str(e)[:60]}', flush=True)
        print(f'  ronda {r + 1} sin suerte, espero 2 min…', flush=True)
        time.sleep(120)
    sys.exit(f'{label}: Overpass no respondió')


def main(a):
    key = a[0]
    if a[1] == '--bbox':
        s, w, n, e, r, name = float(a[2]), float(a[3]), float(a[4]), float(a[5]), float(a[6]), a[7]
        lat, lon = (s + n) / 2, (w + e) / 2
    else:
        lat, lon, r, name = float(a[1]), float(a[2]), float(a[3]), a[4]
        dlat, dlon = r / 111320, r / (111320 * math.cos(math.radians(lat)))
        s, w, n, e = lat - dlat, lon - dlon, lat + dlat, lon + dlon
    bb = f'{s},{w},{n},{e}'
    els = query(f'way["highway"]({bb});way["railway"~"rail|light_rail"]({bb});', 'vías')
    els += query(f'way["building"]({bb});relation["building"]({bb});'
                 f'way["building:part"]({bb});relation["building:part"]({bb});', 'edificios')
    els += query(f'way["leisure"~"park|garden|pitch|dog_park"]({bb});way["landuse"~"grass|recreation_ground"]({bb});'
                 f'way["natural"~"water|wood|scrub"]({bb});way["waterway"]({bb});node["natural"="tree"]({bb});', 'resto')
    os.makedirs(OUT, exist_ok=True)
    path = os.path.join(OUT, f'{key}.json')
    with open(path, 'w') as f:
        json.dump({'name': name, 'lat': lat, 'lon': lon, 'r': r, 'elements': els}, f, separators=(',', ':'))
    print(f'guardado {os.path.normpath(path)} ({len(els)} elementos)')


if __name__ == '__main__':
    if len(sys.argv) < 5:
        sys.exit(__doc__)
    main(sys.argv[1:])

import json, sys
sys.stdout.reconfigure(encoding='utf-8')

with open(r'D:\AI\openclaw\.openclaw\workspace\Tuan-food\vdn_nutrition.json', encoding='utf-8') as f:
    vdn = json.load(f)

def search(kw):
    return [(i['name_vi'], i['energy'], i['protein'], i['carb'], i['fat'])
            for i in vdn if kw.lower() in i['name_vi'].lower()]

for kw in ['gà', 'thịt lợn', 'thịt bò', 'cá thu', 'cá ngừ', 'rau muống', 'cải xanh',
           'cà chua', 'giá đỗ', 'bí đỏ', 'bắp cải', 'hành lá', 'gừng', 'tỏi',
           'nước mắm', 'sả', 'đậu xanh', 'mì', 'bánh phở', 'ức']:
    results = search(kw)
    if results:
        print(f"\n[{kw}]")
        for name, e, p, c, f in results[:5]:
            print(f"  {name}: E:{e} P:{p} C:{c} F:{f}")

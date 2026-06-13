import urllib.request, json

url = 'https://viendinhduong.vn/api/fe/foodNatunal/getPageFoodData?page=1&pageSize=1000&energy=0'
req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0', 'Referer': 'https://viendinhduong.vn/'})
with urllib.request.urlopen(req, timeout=30) as r:
    data = json.loads(r.read())
items = data['data']

result = []
for item in items:
    nutr = {n['name_en']: n['value'] for n in item.get('nutrition', [])}
    result.append({
        'code': item['code'],
        'name_vi': item['name_vi'],
        'name_en': item['name_en'],
        'category': item['category'],
        'energy': item.get('energy', 0),
        'protein': nutr.get('Protein', 0),
        'fat': nutr.get('Total lipid (Fat)', 0),
        'carb': nutr.get('Carbohydrate by difference', 0),
        'nutrition': nutr,
    })

out_path = r'D:\AI\openclaw\.openclaw\workspace\Tuan-food\vdn_nutrition.json'
with open(out_path, 'w', encoding='utf-8') as f:
    json.dump(result, f, ensure_ascii=False, indent=2)

print(f'Saved {len(result)} items to {out_path}')

s = result[0]
print(f'Sample: {s["name_vi"]} | {s["category"]} | E:{s["energy"]}kcal P:{s["protein"]}g C:{s["carb"]}g F:{s["fat"]}g')

cats = sorted(set(i['category'] for i in result))
print(f'\nCategories ({len(cats)}):')
for c in cats:
    count = sum(1 for i in result if i['category'] == c)
    print(f'  {c}: {count} món')

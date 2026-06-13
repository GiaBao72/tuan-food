import json, sys
sys.stdout.reconfigure(encoding='utf-8')

with open(r'D:\AI\openclaw\.openclaw\workspace\Tuan-food\vdn_nutrition.json', encoding='utf-8') as f:
    vdn = json.load(f)

# Thống kê theo nhóm
from collections import Counter
cats = Counter(item['category'] for item in vdn)
for cat, count in cats.most_common():
    print(f"  {cat}: {count}")

# Tìm các nguyên liệu cơ bản cho món Việt
keywords = ['gà', 'cá', 'tôm', 'thịt', 'bò', 'heo', 'rau', 'gạo', 'bún', 'đậu', 'trứng', 'chuối', 'cà rốt', 'khoai']
print("\n--- Mẫu tìm kiếm ---")
for kw in keywords:
    found = [i['name_vi'] for i in vdn if kw.lower() in i['name_vi'].lower()][:5]
    print(f"{kw}: {found}")

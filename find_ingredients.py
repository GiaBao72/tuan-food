import json, sys
sys.stdout.reconfigure(encoding='utf-8')

with open(r'D:\AI\openclaw\.openclaw\workspace\Tuan-food\vdn_nutrition.json', encoding='utf-8') as f:
    vdn = json.load(f)

# Build lookup
vdn_map = {item['name_vi']: item for item in vdn}

def find(name):
    if name in vdn_map:
        i = vdn_map[name]
        return f"E:{i['energy']} P:{i['protein']} C:{i['carb']} F:{i['fat']}"
    return "NOT FOUND"

# Các nguyên liệu cần cho 30 món Việt
ingredients_needed = [
    # Tinh bột
    'Gạo, tẻ, chưa xát (gạo lứt), sống',
    'Gạo, trắng, tẻ, xát máy, sống',
    'Bún, tươi',
    'Gạo, trắng, nếp thường, sống',
    'Mì trứng, sợi, khô',
    'Bánh phở, tươi',
    # Đạm
    'Ức gà, sống',
    'Thịt gà ta, thịt đùi, sống',
    'Thịt bò, thịt thăn, sống',
    'Thịt lợn, nạc vai, sống',
    'Tôm biển, tươi',
    'Cá thu, phi lê, sống',
    'Cá ngừ, phi lê, sống',
    'Quả trứng gà, tươi',
    'Đậu phụ, sống',
    'Đậu xanh, hạt, khô',
    # Rau
    'Rau muống, tươi',
    'Rau cải xanh, tươi',
    'Cải thảo, tươi',
    'Củ cà rốt, tươi',
    'Khoai lang, tươi',
    'Cà chua, tươi',
    'Giá đỗ xanh, tươi',
    'Bí đỏ, tươi',
    'Rau bí, tươi',
    'Bắp cải, tươi',
    # Gia vị / chất béo
    'Dầu oliu',
    'Dầu mè',
    'Hành lá, tươi',
    'Gừng, tươi',
    'Tỏi, tươi',
    'Nước mắm',
    'Sả, tươi',
]

print("=== KIỂM TRA NGUYÊN LIỆU ===")
found = []
not_found = []
for name in ingredients_needed:
    result = find(name)
    if 'NOT FOUND' in result:
        not_found.append(name)
        # Tìm gần đúng
        similar = [k for k in vdn_map.keys() if any(w in k.lower() for w in name.lower().split(',')[0].split()[:2])][:3]
        print(f"❌ {name} → gợi ý: {similar}")
    else:
        found.append(name)
        print(f"✅ {name}: {result}")

print(f"\nTìm thấy: {len(found)}/{len(ingredients_needed)}")

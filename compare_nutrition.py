import json, sys
from difflib import SequenceMatcher
sys.stdout.reconfigure(encoding='utf-8')

# Load VDN data
with open(r'D:\AI\openclaw\.openclaw\workspace\Tuan-food\vdn_nutrition.json', encoding='utf-8') as f:
    vdn = json.load(f)

# Build lookup by name_vi (lowercase)
vdn_map = {item['name_vi'].lower().strip(): item for item in vdn}
vdn_list = list(vdn_map.keys())

# All ingredients from menu.ts
ingredients = [
    # Breakfast
    ('Yến mạch',        3.89, 0.133, 0.661, 0.072),
    ('Sữa hạnh nhân',   0.17, 0.006, 0.025, 0.012),
    ('Chuối',           0.89, 0.011, 0.229, 0.003),
    ('Hạt chia',        4.86, 0.166, 0.421, 0.309),
    ('Mật ong',         3.04, 0.003, 0.823, 0.000),
    ('Bánh mì ngũ cốc', 2.47, 0.099, 0.411, 0.033),
    ('Trứng gà',        1.55, 0.127, 0.011, 0.107),
    ('Bơ avocado',      1.60, 0.020, 0.085, 0.147),
    ('Cà chua bi',      0.18, 0.009, 0.039, 0.002),
    ('Whey protein',    3.73, 0.731, 0.046, 0.043),
    ('Chuối đông lạnh', 0.89, 0.011, 0.229, 0.003),
    ('Granola',         4.71, 0.100, 0.640, 0.200),
    ('Blueberry',       0.57, 0.007, 0.145, 0.003),
    # Lunch
    ('Ức gà nướng',     1.65, 0.310, 0.000, 0.036),
    ('Quinoa',          1.20, 0.044, 0.218, 0.019),
    ('Cải bó xôi',      0.23, 0.029, 0.036, 0.004),
    ('Dầu olive',       8.84, 0.000, 0.000, 1.000),
    ('Cá hồi',          2.08, 0.200, 0.000, 0.133),
    ('Gạo lứt',         1.11, 0.026, 0.230, 0.009),
    ('Edamame',         1.22, 0.118, 0.100, 0.054),
    ('Tương Nhật',      0.53, 0.084, 0.049, 0.006),
    ('Bò thăn',         2.50, 0.260, 0.000, 0.150),
    ('Bún gạo',         1.08, 0.020, 0.250, 0.002),
    ('Rau thơm',        0.23, 0.021, 0.034, 0.003),
    ('Giá đỗ',          0.30, 0.030, 0.060, 0.002),
    # Dinner
    ('Tôm nướng',       0.99, 0.200, 0.009, 0.011),
    ('Rau rocket',      0.25, 0.026, 0.037, 0.007),
    ('Chanh',           0.22, 0.003, 0.070, 0.002),
    ('Đậu hũ cứng',     0.76, 0.082, 0.019, 0.046),
    ('Tương miso',      1.99, 0.117, 0.268, 0.060),
    ('Cải thìa',        0.13, 0.015, 0.022, 0.002),
    ('Mè rang',         5.73, 0.179, 0.234, 0.499),
    ('Ức gà hấp',       1.65, 0.310, 0.000, 0.036),
    ('Bông cải',        0.34, 0.028, 0.067, 0.004),
    ('Cà rốt',          0.41, 0.009, 0.096, 0.002),
    ('Khoai lang',      0.86, 0.016, 0.201, 0.001),
    ('Dầu mè',          8.84, 0.000, 0.000, 1.000),
]

def find_best_match(name):
    name_lower = name.lower()
    # Exact match
    if name_lower in vdn_map:
        return vdn_map[name_lower], 1.0
    # Partial match
    best_score = 0
    best_item = None
    for vdn_name, item in vdn_map.items():
        score = SequenceMatcher(None, name_lower, vdn_name).ratio()
        if score > best_score:
            best_score = score
            best_item = item
    return best_item, best_score

print(f"{'Nguyên liệu':<20} | {'Match VDN':<30} | {'Score':>5} | {'Menu E/P/C/F':<20} | {'VDN E/P/C/F':<20} | Sai lệch E")
print("-" * 130)

no_match = []
big_diff = []

for name, kP, pP, cP, fP in ingredients:
    match, score = find_best_match(name)

    menu_e = kP * 100  # kcal/100g
    menu_p = pP * 100
    menu_c = cP * 100
    menu_f = fP * 100

    if match and score >= 0.5:
        vdn_e = match['energy']
        vdn_p = match['protein']
        vdn_c = match['carb']
        vdn_f = match['fat']
        diff_e = menu_e - vdn_e
        flag = '⚠️ ' if abs(diff_e) > 20 else '✅ '
        if abs(diff_e) > 20:
            big_diff.append((name, match['name_vi'], menu_e, vdn_e, diff_e))
        print(f"{flag}{name:<18} | {match['name_vi']:<30} | {score:>5.2f} | E:{menu_e:>5.1f} P:{menu_p:>4.1f} C:{menu_c:>4.1f} F:{menu_f:>4.1f} | E:{vdn_e:>5.1f} P:{vdn_p:>4.1f} C:{vdn_c:>4.1f} F:{vdn_f:>4.1f} | {diff_e:+.1f}")
    else:
        no_match.append(name)
        print(f"❌ {name:<18} | KHÔNG TÌM THẤY trong VDN")

print(f"\n=== TÓM TẮT ===")
print(f"Tổng nguyên liệu: {len(ingredients)}")
print(f"Không tìm thấy: {len(no_match)} → {no_match}")
print(f"Sai lệch lớn (>20 kcal/100g): {len(big_diff)}")
for name, vdn_name, me, ve, diff in big_diff:
    print(f"  {name} vs {vdn_name}: Menu={me:.1f} VDN={ve:.1f} ({diff:+.1f})")

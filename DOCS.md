# NutriKitchen — Tài liệu hệ thống

**Cập nhật lần cuối:** 2026-06-06
**Deploy:** http://103.166.183.57:3002 (Frontend) | http://103.166.183.57:3001 (API)
**Repo:** https://github.com/GiaBao72/tuan-food

---

## 1. Tổng quan

NutriKitchen là ứng dụng đặt thực đơn healthy cá nhân hoá theo TDEE. Gồm 2 giao diện:
- **App khách** (`/`) — khách đặt món theo chỉ số cơ thể
- **Trang bếp** (`/#/kitchen`) — bếp xử lý đơn, xem lịch sử khách hàng

---

## 2. Stack kỹ thuật

| Layer | Tech |
|-------|------|
| Frontend | Vite + React + TypeScript + Tailwind CSS |
| State | Zustand (profile store + order store) |
| Router | React Router v6 — HashRouter |
| Backend | Hono + Node.js (ESM) |
| Database | SQLite (better-sqlite3) |
| Process | PM2 (`tuan-food-api`, id: 2) |
| Web server | Nginx (reverse proxy + static serve) |
| Deploy | Git push → SSH vào VPS build thủ công |

---

## 3. Cấu trúc thư mục

```
Tuan-food/
├── src/
│   ├── data/
│   │   ├── menu.ts          # 30 món Việt Nam (10 sáng / 10 trưa / 10 tối)
│   │   ├── activity.ts      # 4 mức độ vận động
│   │   └── packages.ts      # Gói đặt (lẻ / 1 tuần / 2 tuần), meal slots, days
│   ├── pages/
│   │   ├── customer/
│   │   │   ├── CustomerApp.tsx    # Shell — routing giữa các step
│   │   │   ├── Step0Profile.tsx   # Nhập thông tin cơ thể
│   │   │   ├── Step1TDEE.tsx      # Kết quả TDEE + chọn gói
│   │   │   ├── Step2Menu.tsx      # Chọn món (có phân trang 5/trang)
│   │   │   └── Step3Confirm.tsx   # Xác nhận + đặt hàng
│   │   └── kitchen/
│   │       └── KitchenApp.tsx     # Trang bếp
│   ├── components/
│   │   ├── customer/
│   │   │   ├── LoginScreen.tsx    # Màn hình đăng nhập bằng SĐT
│   │   │   ├── BottomNav.tsx      # Nút Trước / Tiếp theo
│   │   │   ├── FoodCard.tsx       # Card hiển thị món ăn
│   │   │   ├── HealthBox.tsx      # Cảnh báo tốc độ giảm/tăng cân
│   │   │   ├── StepBar.tsx        # Thanh tiến trình 4 bước
│   │   │   ├── WeightCheckin.tsx  # Check-in cân nặng hàng tuần
│   │   │   └── MilestoneToast.tsx # Thông báo mốc giảm cân
│   │   ├── kitchen/
│   │   │   ├── OrderCard.tsx      # Card đơn hàng (tick từng món, định lượng)
│   │   │   ├── CustomerList.tsx   # Danh sách khách hàng + lịch sử
│   │   │   └── StatusBadge.tsx    # Badge trạng thái đơn
│   │   └── ui/
│   │       ├── Badge.tsx
│   │       ├── Button.tsx
│   │       └── Card.tsx
│   ├── store/
│   │   ├── useProfileStore.ts     # Profile + TDEE state (lưu theo SĐT)
│   │   └── useOrderStore.ts       # Orders state (gọi API)
│   ├── utils/
│   │   ├── nutrition.ts           # calcBMI, calcBMR, calcTDEE, scaleItem, healthCheck
│   │   ├── api.ts                 # Wrapper fetch tới backend API
│   │   └── format.ts              # vnd() — format tiền Việt
│   └── types/
│       └── index.ts               # UserProfile, Order, MenuItem, ScaledItem...
├── vdn_nutrition.json             # 853 thực phẩm từ Viện Dinh Dưỡng VN
└── .github/workflows/deploy.yml  # CI/CD → GitHub Pages (base: /tuan-food/)
```

---

## 4. Tính năng chi tiết

### 4.1 App khách — 4 bước

**Bước 0 — Đăng nhập & Hồ sơ**
- Nhập SĐT → dùng làm ID khách hàng (không cần mật khẩu)
- Số mới → tạo hồ sơ mới | Số cũ → tải lại dữ liệu từ localStorage
- Nhập: giới tính, tuổi, cân nặng, chiều cao → hiển thị BMI
- Chọn mức độ vận động (4 mức: Ít / Nhẹ / Vừa / Năng động)
- Chọn mục tiêu (Giảm cân / Giữ cân / Tăng cân)

**Bước 1 — TDEE**
- Tính TDEE theo công thức Mifflin-St Jeor
- Điều chỉnh: Giảm cân −500 kcal/ngày | Giữ nguyên | Tăng cân +400 kcal/ngày
- Hiển thị: TDEE duy trì vs Mục tiêu nạp (kcal/ngày)
- Chọn gói: Lẻ/Thử (1 ngày) | 1 Tuần (7 ngày, −5%) | 2 Tuần (14 ngày)
- Check-in cân nặng hàng tuần + milestone toast

**Bước 2 — Chọn thực đơn**
- 3 bữa: Sáng (25% kcal) / Trưa (40%) / Tối (35%)
- 10 món/bữa, phân trang 5 món/trang
- Scale khẩu phần tự động: chọn nhiều món → chia đều budget kcal
- 2 chế độ: Đặt lẻ (1 ngày) | Đặt theo tuần (chọn từng ngày)
- Hiển thị kcal, P/C/F, giá từng món sau khi scale

**Bước 3 — Xác nhận**
- Tóm tắt đơn hàng theo SĐT + thông tin dinh dưỡng
- Ghi chú / dị ứng thực phẩm
- Tính tổng tiền, hiển thị tiết kiệm nếu có discount
- Gửi đơn → API POST /orders → lưu SQLite

### 4.2 Trang bếp

**Tab Đơn hàng**
- Lọc theo trạng thái: Tất cả / Mới / Đã xác nhận / Đang giao / Xong
- Tự động refresh mỗi 10 giây, chuông báo khi có đơn mới
- Mỗi đơn hiển thị: SĐT, mục tiêu, gói, TDEE
- Progress bar tiến độ món đã xong
- Bấm vào từng món → expand xem định lượng nguyên liệu (g/ml)
- Tick ✓ từng món đã làm xong
- Nút chuyển trạng thái: Xác nhận → Giao hàng → Hoàn thành
- Nút "Giao hàng" chỉ active khi tick hết tất cả món

**Tab Khách hàng**
- Danh sách khách theo SĐT, sắp xếp theo số đơn
- Tổng số khách / tổng đơn / tổng doanh thu
- Tìm kiếm theo SĐT
- Bấm vào khách → expand lịch sử tất cả đơn (ngày, gói, trạng thái, tiền)

---

## 5. Backend API

**Base URL:** `http://103.166.183.57:3001`

| Method | Endpoint | Mô tả |
|--------|----------|-------|
| GET | `/` | Health check |
| GET | `/orders?status=new` | Danh sách đơn (lọc theo status) |
| POST | `/orders` | Tạo đơn mới |
| PATCH | `/orders/:id/status` | Cập nhật trạng thái đơn |
| PATCH | `/orders/:id/done-items` | Toggle món đã xong |
| GET | `/customers` | Danh sách khách + lịch sử đơn grouped by phone |

**SQLite schema:** `/root/tuan-food-api/data/orders.db`

---

## 6. Dữ liệu dinh dưỡng

- **Nguồn:** Viện Dinh Dưỡng Việt Nam (viendinhduong.vn)
- **File local:** `vdn_nutrition.json` — 853 thực phẩm
- **API gốc:** `https://viendinhduong.vn/api/fe/foodNatunal/getPageFoodData?page=1&pageSize=1000`
- **Menu hiện tại:** 30 món Việt Nam, nguyên liệu tra từ VDN
- **Công thức scale:** khẩu phần = (budget_kcal_bữa / tổng_base_kcal_các_món_chọn) × base_amount

---

## 7. Deploy

**Frontend (VPS):**
```bash
cd /root/tuan-food
git pull
VITE_BASE_PATH=/ VITE_API_URL=http://103.166.183.57:3001 npm run build
# Nginx tự serve từ /root/tuan-food/dist trên port 3002
```

**Frontend (GitHub Pages):**
- Push lên main → GitHub Actions tự build → deploy branch gh-pages
- URL: https://giabao72.github.io/tuan-food/ (không kết nối được API do mixed content)

**Backend:**
```bash
pm2 restart tuan-food-api
pm2 save
```

---

## 8. Lưu ý kỹ thuật

- **HashRouter** — dùng `/#/kitchen` thay vì `/kitchen` vì GitHub Pages không hỗ trợ SPA routing
- **CORS** — API set `origin: '*'` cho môi trường demo
- **localStorage per-phone** — mỗi SĐT lưu key `nk4-profile-{phone}` riêng
- **npm bị hỏng** trên máy Windows dev — dùng `node node_modules\vite\bin\vite.js` thay thế
- **File tiếng Việt** — dùng `write` tool trực tiếp, không dùng PowerShell redirect

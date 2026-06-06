import type { MenuItem } from '../types'

export const MENU: Record<'breakfast' | 'lunch' | 'dinner', MenuItem[]> = {
  breakfast: [
    {
      id: 'b1', name: 'Cháo Yến Mạch', icon: '🥣', tag: 'TĂNG NĂNG LƯỢNG', basePrice: 55000,
      ingredients: [
        { name: 'Yến mạch',      baseAmt: 80,  unit: 'g',  kP: 3.89, pP: .133, cP: .661, fP: .072 },
        { name: 'Sữa hạnh nhân', baseAmt: 150, unit: 'ml', kP: .17,  pP: .006, cP: .025, fP: .012 },
        { name: 'Chuối',         baseAmt: 60,  unit: 'g',  kP: .89,  pP: .011, cP: .229, fP: .003 },
        { name: 'Hạt chia',      baseAmt: 15,  unit: 'g',  kP: 4.86, pP: .166, cP: .421, fP: .309 },
        { name: 'Mật ong',       baseAmt: 10,  unit: 'g',  kP: 3.04, pP: .003, cP: .823, fP: .0   },
      ],
    },
    {
      id: 'b2', name: 'Bánh Mì Trứng Bơ', icon: '🥑', tag: 'GIÀU PROTEIN', basePrice: 65000,
      ingredients: [
        { name: 'Bánh mì ngũ cốc', baseAmt: 80,  unit: 'g', kP: 2.47, pP: .099, cP: .411, fP: .033 },
        { name: 'Trứng gà',        baseAmt: 100, unit: 'g', kP: 1.55, pP: .127, cP: .011, fP: .107 },
        { name: 'Bơ avocado',      baseAmt: 60,  unit: 'g', kP: 1.60, pP: .020, cP: .085, fP: .147 },
        { name: 'Cà chua bi',      baseAmt: 50,  unit: 'g', kP: .18,  pP: .009, cP: .039, fP: .002 },
      ],
    },
    {
      id: 'b3', name: 'Smoothie Bowl Protein', icon: '🫐', tag: 'PHỤC HỒI', basePrice: 70000,
      ingredients: [
        { name: 'Whey protein',    baseAmt: 30,  unit: 'g', kP: 3.73, pP: .731, cP: .046, fP: .043 },
        { name: 'Chuối đông lạnh', baseAmt: 100, unit: 'g', kP: .89,  pP: .011, cP: .229, fP: .003 },
        { name: 'Granola',         baseAmt: 40,  unit: 'g', kP: 4.71, pP: .100, cP: .640, fP: .200 },
        { name: 'Blueberry',       baseAmt: 80,  unit: 'g', kP: .57,  pP: .007, cP: .145, fP: .003 },
      ],
    },
  ],
  lunch: [
    {
      id: 'l1', name: 'Bowl Gà Nướng Quinoa', icon: '🥗', tag: 'CÂN BẰNG', basePrice: 85000,
      ingredients: [
        { name: 'Ức gà nướng', baseAmt: 150, unit: 'g',  kP: 1.65, pP: .310, cP: .0,   fP: .036 },
        { name: 'Quinoa',      baseAmt: 120, unit: 'g',  kP: 1.20, pP: .044, cP: .218, fP: .019 },
        { name: 'Cải bó xôi',  baseAmt: 60,  unit: 'g',  kP: .23,  pP: .029, cP: .036, fP: .004 },
        { name: 'Cà chua bi',  baseAmt: 50,  unit: 'g',  kP: .18,  pP: .009, cP: .039, fP: .002 },
        { name: 'Dầu olive',   baseAmt: 10,  unit: 'ml', kP: 8.84, pP: .0,   cP: .0,   fP: 1.0  },
      ],
    },
    {
      id: 'l2', name: 'Cơm Lứt Cá Hồi', icon: '🍱', tag: 'OMEGA-3', basePrice: 95000,
      ingredients: [
        { name: 'Cá hồi',    baseAmt: 130, unit: 'g',  kP: 2.08, pP: .200, cP: .0,   fP: .133 },
        { name: 'Gạo lứt',   baseAmt: 150, unit: 'g',  kP: 1.11, pP: .026, cP: .230, fP: .009 },
        { name: 'Edamame',   baseAmt: 60,  unit: 'g',  kP: 1.22, pP: .118, cP: .100, fP: .054 },
        { name: 'Cải bó xôi',baseAmt: 40,  unit: 'g',  kP: .23,  pP: .029, cP: .036, fP: .004 },
        { name: 'Tương Nhật',baseAmt: 10,  unit: 'ml', kP: .53,  pP: .084, cP: .049, fP: .006 },
      ],
    },
    {
      id: 'l3', name: 'Bún Bò Sốt Thái', icon: '🍜', tag: 'CHUA CAY', basePrice: 88000,
      ingredients: [
        { name: 'Bò thăn',  baseAmt: 120, unit: 'g', kP: 2.50, pP: .260, cP: .0,   fP: .150 },
        { name: 'Bún gạo',  baseAmt: 100, unit: 'g', kP: 1.08, pP: .020, cP: .250, fP: .002 },
        { name: 'Rau thơm', baseAmt: 20,  unit: 'g', kP: .23,  pP: .021, cP: .034, fP: .003 },
        { name: 'Giá đỗ',   baseAmt: 50,  unit: 'g', kP: .30,  pP: .030, cP: .060, fP: .002 },
        { name: 'Sốt Thái', baseAmt: 25,  unit: 'g', kP: 1.00, pP: .020, cP: .200, fP: .020 },
      ],
    },
  ],
  dinner: [
    {
      id: 'd1', name: 'Salad Tôm Bơ', icon: '🥙', tag: 'ÍT TINH BỘT', basePrice: 78000,
      ingredients: [
        { name: 'Tôm nướng',  baseAmt: 120, unit: 'g',  kP: .99,  pP: .200, cP: .009, fP: .011 },
        { name: 'Bơ avocado', baseAmt: 80,  unit: 'g',  kP: 1.60, pP: .020, cP: .085, fP: .147 },
        { name: 'Rau rocket', baseAmt: 40,  unit: 'g',  kP: .25,  pP: .026, cP: .037, fP: .007 },
        { name: 'Dầu olive',  baseAmt: 8,   unit: 'ml', kP: 8.84, pP: .0,   cP: .0,   fP: 1.0  },
        { name: 'Chanh',      baseAmt: 15,  unit: 'ml', kP: .22,  pP: .003, cP: .070, fP: .002 },
      ],
    },
    {
      id: 'd2', name: 'Đậu Hũ Nướng Miso', icon: '🥢', tag: 'THUẦN CHAY', basePrice: 70000,
      ingredients: [
        { name: 'Đậu hũ cứng', baseAmt: 180, unit: 'g', kP: .76,  pP: .082, cP: .019, fP: .046 },
        { name: 'Tương miso',  baseAmt: 20,  unit: 'g', kP: 1.99, pP: .117, cP: .268, fP: .060 },
        { name: 'Cải thìa',   baseAmt: 80,  unit: 'g', kP: .13,  pP: .015, cP: .022, fP: .002 },
        { name: 'Gạo lứt',    baseAmt: 120, unit: 'g', kP: 1.11, pP: .026, cP: .230, fP: .009 },
        { name: 'Mè rang',    baseAmt: 8,   unit: 'g', kP: 5.73, pP: .179, cP: .234, fP: .499 },
      ],
    },
    {
      id: 'd3', name: 'Gà Hấp Rau Củ', icon: '🍗', tag: 'SẠCH & TỰ NHIÊN', basePrice: 80000,
      ingredients: [
        { name: 'Ức gà hấp', baseAmt: 160, unit: 'g',  kP: 1.65, pP: .310, cP: .0,   fP: .036 },
        { name: 'Bông cải',  baseAmt: 80,  unit: 'g',  kP: .34,  pP: .028, cP: .067, fP: .004 },
        { name: 'Cà rốt',    baseAmt: 60,  unit: 'g',  kP: .41,  pP: .009, cP: .096, fP: .002 },
        { name: 'Khoai lang',baseAmt: 100, unit: 'g',  kP: .86,  pP: .016, cP: .201, fP: .001 },
        { name: 'Dầu mè',    baseAmt: 5,   unit: 'ml', kP: 8.84, pP: .0,   cP: .0,   fP: 1.0  },
      ],
    },
  ],
}

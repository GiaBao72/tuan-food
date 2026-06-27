import type { MenuItem } from '../types'

export const MENU: Record<'breakfast' | 'lunch' | 'dinner', MenuItem[]> = {
  breakfast: [
  {
    id: 'b1', name: 'Cuộn ngũ sắc', icon: '🌈', tag: 'FRESH', basePrice: 49000,
    ingredients: [
        { name: 'Cải bó xôi', baseAmt: 60, unit: 'g', kP: 0.23, pP: 0.029, cP: 0.036, fP: 0.004 },
        { name: 'Cà rốt', baseAmt: 40, unit: 'g', kP: 0.44, pP: 0.015, cP: 0.09, fP: 0.002 },
        { name: 'Ớt chuông', baseAmt: 40, unit: 'g', kP: 0.31, pP: 0.01, cP: 0.06, fP: 0.003 },
        { name: 'Rong biển', baseAmt: 10, unit: 'g', kP: 0.35, pP: 0.057, cP: 0.054, fP: 0.007 },
        { name: 'Ức gà', baseAmt: 60, unit: 'g', kP: 1.65, pP: 0.31, cP: 0.0, fP: 0.036 },
    ],
  },
  {
    id: 'b2', name: 'Kimbap khoai lang bò tiêu đen', icon: '🍙', tag: 'FUSION', basePrice: 63000,
    ingredients: [
        { name: 'Gạo lứt', baseAmt: 100, unit: 'g', kP: 3.59, pP: 0.075, cP: 0.762, fP: 0.027 },
        { name: 'Khoai lang', baseAmt: 60, unit: 'g', kP: 1.24, pP: 0.008, cP: 0.298, fP: 0.002 },
        { name: 'Thịt bò', baseAmt: 70, unit: 'g', kP: 1.18, pP: 0.21, cP: 0.0, fP: 0.038 },
        { name: 'Rong biển', baseAmt: 10, unit: 'g', kP: 0.35, pP: 0.057, cP: 0.054, fP: 0.007 },
    ],
  },
  {
    id: 'b3', name: 'Kimbap gạo lứt gà áp chảo', icon: '🍙', tag: 'HEALTHY', basePrice: 49000,
    ingredients: [
        { name: 'Gạo lứt', baseAmt: 100, unit: 'g', kP: 3.59, pP: 0.075, cP: 0.762, fP: 0.027 },
        { name: 'Ức gà', baseAmt: 80, unit: 'g', kP: 1.65, pP: 0.31, cP: 0.0, fP: 0.036 },
        { name: 'Rong biển', baseAmt: 10, unit: 'g', kP: 0.35, pP: 0.057, cP: 0.054, fP: 0.007 },
        { name: 'Lá chanh', baseAmt: 5, unit: 'g', kP: 0.5, pP: 0.01, cP: 0.1, fP: 0.005 },
    ],
  },
  {
    id: 'b4', name: 'Phở cuốn', icon: '🥢', tag: 'NHẸ BỤNG', basePrice: 38000,
    ingredients: [
        { name: 'Ức gà', baseAmt: 80, unit: 'g', kP: 1.65, pP: 0.31, cP: 0.0, fP: 0.036 },
        { name: 'Bắp cải', baseAmt: 50, unit: 'g', kP: 0.25, pP: 0.013, cP: 0.058, fP: 0.001 },
        { name: 'Cà rốt', baseAmt: 40, unit: 'g', kP: 0.44, pP: 0.015, cP: 0.09, fP: 0.002 },
        { name: 'Hành lá', baseAmt: 10, unit: 'g', kP: 0.26, pP: 0.013, cP: 0.052, fP: 0.0 },
    ],
  },
  {
    id: 'b5', name: 'Trứng đúc nấm', icon: '🥚', tag: 'PROTEIN', basePrice: 43000,
    ingredients: [
        { name: 'Trứng gà', baseAmt: 120, unit: 'g', kP: 1.44, pP: 0.124, cP: 0.008, fP: 0.098 },
        { name: 'Nấm tươi', baseAmt: 60, unit: 'g', kP: 0.22, pP: 0.031, cP: 0.032, fP: 0.003 },
        { name: 'Hành lá', baseAmt: 10, unit: 'g', kP: 0.26, pP: 0.013, cP: 0.052, fP: 0.0 },
        { name: 'Nước mắm', baseAmt: 10, unit: 'g', kP: 0.35, pP: 0.051, cP: 0.036, fP: 0.0 },
    ],
  },
  {
    id: 'b6', name: 'Trứng hấp cải bó xôi', icon: '🥚', tag: 'ÍT DẦU', basePrice: 47000,
    ingredients: [
        { name: 'Trứng gà', baseAmt: 120, unit: 'g', kP: 1.44, pP: 0.124, cP: 0.008, fP: 0.098 },
        { name: 'Cải bó xôi', baseAmt: 80, unit: 'g', kP: 0.23, pP: 0.029, cP: 0.036, fP: 0.004 },
        { name: 'Tỏi', baseAmt: 5, unit: 'g', kP: 1.26, pP: 0.06, cP: 0.247, fP: 0.004 },
        { name: 'Nước mắm', baseAmt: 10, unit: 'g', kP: 0.35, pP: 0.051, cP: 0.036, fP: 0.0 },
    ],
  },
  {
    id: 'b7', name: 'Củ quả luộc theo mùa', icon: '🥕', tag: 'DETOX', basePrice: 66000,
    ingredients: [
        { name: 'Khoai lang', baseAmt: 100, unit: 'g', kP: 1.24, pP: 0.008, cP: 0.298, fP: 0.002 },
        { name: 'Bí đỏ', baseAmt: 80, unit: 'g', kP: 0.26, pP: 0.01, cP: 0.06, fP: 0.001 },
        { name: 'Cà rốt', baseAmt: 60, unit: 'g', kP: 0.44, pP: 0.015, cP: 0.09, fP: 0.002 },
        { name: 'Nước mắm', baseAmt: 5, unit: 'g', kP: 0.35, pP: 0.051, cP: 0.036, fP: 0.0 },
    ],
  },
  {
    id: 'b8', name: 'Gà áp chảo lá chanh', icon: '🍗', tag: 'THƠM', basePrice: 51000,
    ingredients: [
        { name: 'Ức gà', baseAmt: 160, unit: 'g', kP: 1.65, pP: 0.31, cP: 0.0, fP: 0.036 },
        { name: 'Lá chanh', baseAmt: 10, unit: 'g', kP: 0.5, pP: 0.01, cP: 0.1, fP: 0.005 },
        { name: 'Tỏi', baseAmt: 5, unit: 'g', kP: 1.26, pP: 0.06, cP: 0.247, fP: 0.004 },
        { name: 'Dầu olive', baseAmt: 8, unit: 'g', kP: 9.0, pP: 0.0, cP: 0.0, fP: 1.0 },
    ],
  },
  ],
  lunch: [
  {
    id: 'l1', name: 'Bò steak (BBQ, Kem nấm)', icon: '🥩', tag: 'PREMIUM', basePrice: 65000,
    ingredients: [
        { name: 'Thịt bò', baseAmt: 180, unit: 'g', kP: 1.18, pP: 0.21, cP: 0.0, fP: 0.038 },
        { name: 'Nấm đông cô', baseAmt: 30, unit: 'g', kP: 0.34, pP: 0.028, cP: 0.065, fP: 0.004 },
        { name: 'Kem tươi', baseAmt: 20, unit: 'g', kP: 3.45, pP: 0.025, cP: 0.032, fP: 0.35 },
        { name: 'Dầu olive', baseAmt: 10, unit: 'g', kP: 9.0, pP: 0.0, cP: 0.0, fP: 1.0 },
    ],
  },
  {
    id: 'l2', name: 'Bò lúc lắc', icon: '🥩', tag: 'ĐẶC SẢN', basePrice: 64000,
    ingredients: [
        { name: 'Thịt bò', baseAmt: 180, unit: 'g', kP: 1.18, pP: 0.21, cP: 0.0, fP: 0.038 },
        { name: 'Hành tây', baseAmt: 50, unit: 'g', kP: 0.4, pP: 0.009, cP: 0.093, fP: 0.001 },
        { name: 'Ớt chuông', baseAmt: 30, unit: 'g', kP: 0.31, pP: 0.01, cP: 0.06, fP: 0.003 },
        { name: 'Dầu olive', baseAmt: 10, unit: 'g', kP: 9.0, pP: 0.0, cP: 0.0, fP: 1.0 },
    ],
  },
  {
    id: 'l3', name: 'Bò xào măng tây sốt tiêu đen', icon: '🥩', tag: 'CAO ĐẠM', basePrice: 54000,
    ingredients: [
        { name: 'Thịt bò', baseAmt: 160, unit: 'g', kP: 1.18, pP: 0.21, cP: 0.0, fP: 0.038 },
        { name: 'Măng tây', baseAmt: 80, unit: 'g', kP: 0.2, pP: 0.022, cP: 0.037, fP: 0.001 },
        { name: 'Tỏi', baseAmt: 5, unit: 'g', kP: 1.26, pP: 0.06, cP: 0.247, fP: 0.004 },
        { name: 'Dầu olive', baseAmt: 8, unit: 'g', kP: 9.0, pP: 0.0, cP: 0.0, fP: 1.0 },
    ],
  },
  {
    id: 'l4', name: 'Heo sốt Teriyaki', icon: '🍖', tag: 'NHẬT', basePrice: 65000,
    ingredients: [
        { name: 'Thịt heo nạc', baseAmt: 180, unit: 'g', kP: 1.39, pP: 0.19, cP: 0.0, fP: 0.07 },
        { name: 'Sốt teriyaki', baseAmt: 30, unit: 'g', kP: 1.2, pP: 0.035, cP: 0.247, fP: 0.008 },
        { name: 'Hành tây', baseAmt: 40, unit: 'g', kP: 0.4, pP: 0.009, cP: 0.093, fP: 0.001 },
        { name: 'Dầu olive', baseAmt: 8, unit: 'g', kP: 9.0, pP: 0.0, cP: 0.0, fP: 1.0 },
    ],
  },
  {
    id: 'l5', name: 'Cải thảo cuộn thịt', icon: '🥬', tag: 'NHẸ', basePrice: 52000,
    ingredients: [
        { name: 'Cải thảo', baseAmt: 100, unit: 'g', kP: 0.13, pP: 0.009, cP: 0.022, fP: 0.001 },
        { name: 'Thịt heo nạc', baseAmt: 120, unit: 'g', kP: 1.39, pP: 0.19, cP: 0.0, fP: 0.07 },
        { name: 'Tỏi', baseAmt: 5, unit: 'g', kP: 1.26, pP: 0.06, cP: 0.247, fP: 0.004 },
        { name: 'Nước mắm', baseAmt: 10, unit: 'g', kP: 0.35, pP: 0.051, cP: 0.036, fP: 0.0 },
    ],
  },
  {
    id: 'l6', name: 'Bí đỏ đúc thịt', icon: '🎃', tag: 'TRUYỀN THỐNG', basePrice: 57000,
    ingredients: [
        { name: 'Bí đỏ', baseAmt: 120, unit: 'g', kP: 0.26, pP: 0.01, cP: 0.06, fP: 0.001 },
        { name: 'Thịt heo xay', baseAmt: 100, unit: 'g', kP: 1.5, pP: 0.175, cP: 0.0, fP: 0.09 },
        { name: 'Hành lá', baseAmt: 10, unit: 'g', kP: 0.26, pP: 0.013, cP: 0.052, fP: 0.0 },
        { name: 'Nước mắm', baseAmt: 10, unit: 'g', kP: 0.35, pP: 0.051, cP: 0.036, fP: 0.0 },
    ],
  },
  {
    id: 'l7', name: 'Thịt viên áp chảo', icon: '🍖', tag: 'NGON MIỆNG', basePrice: 51000,
    ingredients: [
        { name: 'Thịt heo xay', baseAmt: 160, unit: 'g', kP: 1.5, pP: 0.175, cP: 0.0, fP: 0.09 },
        { name: 'Tỏi', baseAmt: 10, unit: 'g', kP: 1.26, pP: 0.06, cP: 0.247, fP: 0.004 },
        { name: 'Hành tây', baseAmt: 30, unit: 'g', kP: 0.4, pP: 0.009, cP: 0.093, fP: 0.001 },
        { name: 'Dầu olive', baseAmt: 8, unit: 'g', kP: 9.0, pP: 0.0, cP: 0.0, fP: 1.0 },
    ],
  },
  {
    id: 'l8', name: 'Cá hồi áp chảo sốt chanh leo', icon: '🐟', tag: 'OMEGA-3', basePrice: 63000,
    ingredients: [
        { name: 'Cá hồi', baseAmt: 160, unit: 'g', kP: 2.08, pP: 0.2, cP: 0.0, fP: 0.13 },
        { name: 'Dứa', baseAmt: 40, unit: 'g', kP: 0.5, pP: 0.005, cP: 0.131, fP: 0.001 },
        { name: 'Dầu olive', baseAmt: 10, unit: 'g', kP: 9.0, pP: 0.0, cP: 0.0, fP: 1.0 },
        { name: 'Gừng', baseAmt: 5, unit: 'g', kP: 0.41, pP: 0.004, cP: 0.086, fP: 0.005 },
    ],
  },
  {
    id: 'l9', name: 'Mỳ sốt kem nấm cá hồi', icon: '🍝', tag: 'FUSION', basePrice: 70000,
    ingredients: [
        { name: 'Mì pasta', baseAmt: 120, unit: 'g', kP: 3.71, pP: 0.13, cP: 0.742, fP: 0.015 },
        { name: 'Cá hồi', baseAmt: 100, unit: 'g', kP: 2.08, pP: 0.2, cP: 0.0, fP: 0.13 },
        { name: 'Nấm đông cô', baseAmt: 30, unit: 'g', kP: 0.34, pP: 0.028, cP: 0.065, fP: 0.004 },
        { name: 'Kem tươi', baseAmt: 30, unit: 'g', kP: 3.45, pP: 0.025, cP: 0.032, fP: 0.35 },
    ],
  },
  {
    id: 'l10', name: 'Mỳ sốt pesto gà áp chảo', icon: '🍝', tag: 'Ý', basePrice: 80000,
    ingredients: [
        { name: 'Mì pasta', baseAmt: 120, unit: 'g', kP: 3.71, pP: 0.13, cP: 0.742, fP: 0.015 },
        { name: 'Ức gà', baseAmt: 120, unit: 'g', kP: 1.65, pP: 0.31, cP: 0.0, fP: 0.036 },
        { name: 'Sốt pesto', baseAmt: 30, unit: 'g', kP: 3.7, pP: 0.05, cP: 0.06, fP: 0.36 },
        { name: 'Dầu olive', baseAmt: 8, unit: 'g', kP: 9.0, pP: 0.0, cP: 0.0, fP: 1.0 },
    ],
  },
  ],
  dinner: [
  {
    id: 'd1', name: 'Gà cuộn măng tây', icon: '🍗', tag: 'TƯƠI', basePrice: 52000,
    ingredients: [
        { name: 'Ức gà', baseAmt: 150, unit: 'g', kP: 1.65, pP: 0.31, cP: 0.0, fP: 0.036 },
        { name: 'Măng tây', baseAmt: 80, unit: 'g', kP: 0.2, pP: 0.022, cP: 0.037, fP: 0.001 },
        { name: 'Tỏi', baseAmt: 5, unit: 'g', kP: 1.26, pP: 0.06, cP: 0.247, fP: 0.004 },
        { name: 'Dầu olive', baseAmt: 8, unit: 'g', kP: 9.0, pP: 0.0, cP: 0.0, fP: 1.0 },
    ],
  },
  {
    id: 'd2', name: 'Rong biển cuộn ức gà', icon: '🌿', tag: 'NHẬT', basePrice: 36000,
    ingredients: [
        { name: 'Ức gà', baseAmt: 140, unit: 'g', kP: 1.65, pP: 0.31, cP: 0.0, fP: 0.036 },
        { name: 'Rong biển', baseAmt: 20, unit: 'g', kP: 0.35, pP: 0.057, cP: 0.054, fP: 0.007 },
        { name: 'Gừng', baseAmt: 5, unit: 'g', kP: 0.41, pP: 0.004, cP: 0.086, fP: 0.005 },
        { name: 'Nước mắm', baseAmt: 10, unit: 'g', kP: 0.35, pP: 0.051, cP: 0.036, fP: 0.0 },
    ],
  },
  {
    id: 'd3', name: 'Gà xào chua ngọt', icon: '🍗', tag: 'CHUA NGỌT', basePrice: 58000,
    ingredients: [
        { name: 'Ức gà', baseAmt: 150, unit: 'g', kP: 1.65, pP: 0.31, cP: 0.0, fP: 0.036 },
        { name: 'Dứa', baseAmt: 50, unit: 'g', kP: 0.5, pP: 0.005, cP: 0.131, fP: 0.001 },
        { name: 'Ớt chuông', baseAmt: 40, unit: 'g', kP: 0.31, pP: 0.01, cP: 0.06, fP: 0.003 },
        { name: 'Dầu olive', baseAmt: 8, unit: 'g', kP: 9.0, pP: 0.0, cP: 0.0, fP: 1.0 },
    ],
  },
  {
    id: 'd4', name: 'Bò băm xào rau củ', icon: '🥩', tag: 'CÂN BẰNG', basePrice: 76000,
    ingredients: [
        { name: 'Thịt bò xay', baseAmt: 150, unit: 'g', kP: 1.25, pP: 0.195, cP: 0.0, fP: 0.055 },
        { name: 'Cà rốt', baseAmt: 50, unit: 'g', kP: 0.44, pP: 0.015, cP: 0.09, fP: 0.002 },
        { name: 'Bắp cải', baseAmt: 60, unit: 'g', kP: 0.25, pP: 0.013, cP: 0.058, fP: 0.001 },
        { name: 'Dầu olive', baseAmt: 8, unit: 'g', kP: 9.0, pP: 0.0, cP: 0.0, fP: 1.0 },
    ],
  },
  {
    id: 'd5', name: 'Bò cuộn lá lốt', icon: '🌿', tag: 'ĐẶC SẢN', basePrice: 39000,
    ingredients: [
        { name: 'Thịt bò', baseAmt: 150, unit: 'g', kP: 1.18, pP: 0.21, cP: 0.0, fP: 0.038 },
        { name: 'Lá lốt', baseAmt: 30, unit: 'g', kP: 0.37, pP: 0.028, cP: 0.074, fP: 0.005 },
        { name: 'Tỏi', baseAmt: 5, unit: 'g', kP: 1.26, pP: 0.06, cP: 0.247, fP: 0.004 },
        { name: 'Dầu olive', baseAmt: 8, unit: 'g', kP: 9.0, pP: 0.0, cP: 0.0, fP: 1.0 },
    ],
  },
  {
    id: 'd6', name: 'Cá lóc nướng', icon: '🐟', tag: 'NƯỚNG', basePrice: 44000,
    ingredients: [
        { name: 'Cá lóc', baseAmt: 180, unit: 'g', kP: 0.9, pP: 0.18, cP: 0.0, fP: 0.02 },
        { name: 'Sả', baseAmt: 15, unit: 'g', kP: 0.01, pP: 0.008, cP: 0.165, fP: 0.01 },
        { name: 'Gừng', baseAmt: 10, unit: 'g', kP: 0.41, pP: 0.004, cP: 0.086, fP: 0.005 },
        { name: 'Nước mắm', baseAmt: 10, unit: 'g', kP: 0.35, pP: 0.051, cP: 0.036, fP: 0.0 },
    ],
  },
  {
    id: 'd7', name: 'Tôm sốt dứa', icon: '🍍', tag: 'CHUA NGỌT', basePrice: 58000,
    ingredients: [
        { name: 'Tôm', baseAmt: 150, unit: 'g', kP: 0.82, pP: 0.176, cP: 0.009, fP: 0.009 },
        { name: 'Dứa', baseAmt: 60, unit: 'g', kP: 0.5, pP: 0.005, cP: 0.131, fP: 0.001 },
        { name: 'Ớt chuông', baseAmt: 30, unit: 'g', kP: 0.31, pP: 0.01, cP: 0.06, fP: 0.003 },
        { name: 'Dầu olive', baseAmt: 8, unit: 'g', kP: 9.0, pP: 0.0, cP: 0.0, fP: 1.0 },
    ],
  },
  {
    id: 'd8', name: 'Tôm nướng BBQ', icon: '🦐', tag: 'NƯỚNG', basePrice: 61000,
    ingredients: [
        { name: 'Tôm', baseAmt: 180, unit: 'g', kP: 0.82, pP: 0.176, cP: 0.009, fP: 0.009 },
        { name: 'Tỏi', baseAmt: 10, unit: 'g', kP: 1.26, pP: 0.06, cP: 0.247, fP: 0.004 },
        { name: 'Sả', baseAmt: 10, unit: 'g', kP: 0.01, pP: 0.008, cP: 0.165, fP: 0.01 },
        { name: 'Dầu olive', baseAmt: 8, unit: 'g', kP: 9.0, pP: 0.0, cP: 0.0, fP: 1.0 },
    ],
  },
  {
    id: 'd9', name: 'Tôm hấp sả', icon: '🦐', tag: 'THANH', basePrice: 54000,
    ingredients: [
        { name: 'Tôm', baseAmt: 180, unit: 'g', kP: 0.82, pP: 0.176, cP: 0.009, fP: 0.009 },
        { name: 'Sả', baseAmt: 15, unit: 'g', kP: 0.01, pP: 0.008, cP: 0.165, fP: 0.01 },
        { name: 'Gừng', baseAmt: 10, unit: 'g', kP: 0.41, pP: 0.004, cP: 0.086, fP: 0.005 },
        { name: 'Nước mắm', baseAmt: 10, unit: 'g', kP: 0.35, pP: 0.051, cP: 0.036, fP: 0.0 },
    ],
  },
  {
    id: 'd10', name: 'Nấm đông cô sốt Teriyaki', icon: '🍄', tag: 'CHAY', basePrice: 42000,
    ingredients: [
        { name: 'Nấm đông cô', baseAmt: 150, unit: 'g', kP: 0.34, pP: 0.028, cP: 0.065, fP: 0.004 },
        { name: 'Sốt teriyaki', baseAmt: 30, unit: 'g', kP: 1.2, pP: 0.035, cP: 0.247, fP: 0.008 },
        { name: 'Tỏi', baseAmt: 5, unit: 'g', kP: 1.26, pP: 0.06, cP: 0.247, fP: 0.004 },
        { name: 'Dầu olive', baseAmt: 8, unit: 'g', kP: 9.0, pP: 0.0, cP: 0.0, fP: 1.0 },
    ],
  },
  ],
}

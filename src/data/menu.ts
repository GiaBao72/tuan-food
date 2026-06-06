import type { MenuItem } from '../types'

export const MENU: Record<'breakfast' | 'lunch' | 'dinner', MenuItem[]> = {
  breakfast: [
    {
      id: 'b1', name: 'Cháo Gà Gừng', icon: '🍲', tag: 'NHẸ BỤNG', basePrice: 45000,
      ingredients: [
        { name: 'Gạo trắng', baseAmt: 60,  unit: 'g',  kP: 3.46, pP: .079, cP: .763, fP: .010 },
        { name: 'Gà',        baseAmt: 80,  unit: 'g',  kP: 1.65, pP: .310, cP: .000, fP: .036 },
        { name: 'Hành lá',   baseAmt: 10,  unit: 'g',  kP: 0.26, pP: .013, cP: .052, fP: .000 },
        { name: 'Gừng',      baseAmt: 5,   unit: 'g',  kP: 0.41, pP: .004, cP: .086, fP: .005 },
      ],
    },
    {
      id: 'b2', name: 'Xôi Đậu Xanh', icon: '🟡', tag: 'NO LÂU', basePrice: 40000,
      ingredients: [
        { name: 'Gạo nếp',  baseAmt: 100, unit: 'g',  kP: 3.50, pP: .084, cP: .754, fP: .016 },
        { name: 'Đậu xanh', baseAmt: 30,  unit: 'g',  kP: 3.46, pP: .234, cP: .578, fP: .024 },
        { name: 'Dầu mè',   baseAmt: 5,   unit: 'ml', kP: 9.00, pP: .000, cP: .000, fP: 1.000 },
      ],
    },
    {
      id: 'b3', name: 'Trứng Chiên Cà Chua', icon: '🍳', tag: 'PROTEIN', basePrice: 35000,
      ingredients: [
        { name: 'Trứng gà', baseAmt: 120, unit: 'g',  kP: 1.06, pP: .043, cP: .213, fP: .004 },
        { name: 'Cà chua',  baseAmt: 80,  unit: 'g',  kP: 0.24, pP: .006, cP: .048, fP: .002 },
        { name: 'Hành lá',  baseAmt: 10,  unit: 'g',  kP: 0.26, pP: .013, cP: .052, fP: .000 },
        { name: 'Dầu mè',   baseAmt: 5,   unit: 'ml', kP: 9.00, pP: .000, cP: .000, fP: 1.000 },
      ],
    },
    {
      id: 'b4', name: 'Cháo Cá Ngừ Cải Xanh', icon: '🐟', tag: 'OMEGA-3', basePrice: 50000,
      ingredients: [
        { name: 'Gạo trắng', baseAmt: 60, unit: 'g',  kP: 3.46, pP: .079, cP: .763, fP: .010 },
        { name: 'Cá ngừ',   baseAmt: 80,  unit: 'g',  kP: 0.87, pP: .210, cP: .000, fP: .003 },
        { name: 'Cải xanh', baseAmt: 50,  unit: 'g',  kP: 0.23, pP: .017, cP: .038, fP: .001 },
        { name: 'Gừng',     baseAmt: 5,   unit: 'g',  kP: 0.41, pP: .004, cP: .086, fP: .005 },
      ],
    },
    {
      id: 'b5', name: 'Bún Gà Rau Muống', icon: '🍜', tag: 'TRUYỀN THỐNG', basePrice: 55000,
      ingredients: [
        { name: 'Bún tươi',  baseAmt: 150, unit: 'g',  kP: 1.16, pP: .017, cP: .253, fP: .009 },
        { name: 'Gà',        baseAmt: 80,  unit: 'g',  kP: 1.65, pP: .310, cP: .000, fP: .036 },
        { name: 'Rau muống', baseAmt: 50,  unit: 'g',  kP: 0.28, pP: .032, cP: .033, fP: .002 },
        { name: 'Nước mắm',  baseAmt: 10,  unit: 'ml', kP: 0.35, pP: .051, cP: .036, fP: .000 },
      ],
    },
    {
      id: 'b6', name: 'Cháo Đậu Xanh Rau Bí', icon: '🌿', tag: 'DETOX', basePrice: 40000,
      ingredients: [
        { name: 'Gạo trắng', baseAmt: 60, unit: 'g',  kP: 3.46, pP: .079, cP: .763, fP: .010 },
        { name: 'Đậu xanh',  baseAmt: 30, unit: 'g',  kP: 3.46, pP: .234, cP: .578, fP: .024 },
        { name: 'Rau bí',    baseAmt: 80, unit: 'g',  kP: 0.26, pP: .027, cP: .031, fP: .003 },
        { name: 'Hành lá',   baseAmt: 10, unit: 'g',  kP: 0.26, pP: .013, cP: .052, fP: .000 },
      ],
    },
    {
      id: 'b7', name: 'Trứng Hấp Hành Lá', icon: '🥚', tag: 'ÍT DẦU', basePrice: 30000,
      ingredients: [
        { name: 'Trứng gà', baseAmt: 150, unit: 'g',  kP: 1.06, pP: .043, cP: .213, fP: .004 },
        { name: 'Hành lá',  baseAmt: 15,  unit: 'g',  kP: 0.26, pP: .013, cP: .052, fP: .000 },
        { name: 'Nước mắm', baseAmt: 10,  unit: 'ml', kP: 0.35, pP: .051, cP: .036, fP: .000 },
        { name: 'Dầu mè',   baseAmt: 3,   unit: 'ml', kP: 9.00, pP: .000, cP: .000, fP: 1.000 },
      ],
    },
    {
      id: 'b8', name: 'Cháo Tôm Rau Muống', icon: '🦐', tag: 'VỊ BIỂN', basePrice: 55000,
      ingredients: [
        { name: 'Gạo trắng', baseAmt: 60, unit: 'g',  kP: 3.46, pP: .079, cP: .763, fP: .010 },
        { name: 'Tôm biển',  baseAmt: 80, unit: 'g',  kP: 0.82, pP: .176, cP: .009, fP: .009 },
        { name: 'Rau muống', baseAmt: 60, unit: 'g',  kP: 0.28, pP: .032, cP: .033, fP: .002 },
        { name: 'Sả',        baseAmt: 10, unit: 'g',  kP: 0.01, pP: .008, cP: .165, fP: .010 },
      ],
    },
    {
      id: 'b9', name: 'Xôi Lạc Dầu Mè', icon: '🌾', tag: 'NĂNG LƯỢNG', basePrice: 40000,
      ingredients: [
        { name: 'Gạo nếp',  baseAmt: 120, unit: 'g',  kP: 3.50, pP: .084, cP: .754, fP: .016 },
        { name: 'Lạc rang', baseAmt: 20,  unit: 'g',  kP: 5.85, pP: .260, cP: .160, fP: .500 },
        { name: 'Dầu mè',   baseAmt: 5,   unit: 'ml', kP: 9.00, pP: .000, cP: .000, fP: 1.000 },
      ],
    },
    {
      id: 'b10', name: 'Cơm Trứng Kho Gừng', icon: '🍚', tag: 'ĐẬM ĐÀ', basePrice: 35000,
      ingredients: [
        { name: 'Gạo trắng', baseAmt: 80,  unit: 'g',  kP: 3.46, pP: .079, cP: .763, fP: .010 },
        { name: 'Trứng gà',  baseAmt: 100, unit: 'g',  kP: 1.06, pP: .043, cP: .213, fP: .004 },
        { name: 'Gừng',      baseAmt: 10,  unit: 'g',  kP: 0.41, pP: .004, cP: .086, fP: .005 },
        { name: 'Nước mắm',  baseAmt: 10,  unit: 'ml', kP: 0.35, pP: .051, cP: .036, fP: .000 },
      ],
    },
  ],
  lunch: [
    {
      id: 'l1', name: 'Cơm Lứt Gà Luộc', icon: '🍱', tag: 'CLEAN EAT', basePrice: 75000,
      ingredients: [
        { name: 'Gạo lứt',   baseAmt: 120, unit: 'g',  kP: 3.59, pP: .075, cP: .762, fP: .027 },
        { name: 'Gà',        baseAmt: 150, unit: 'g',  kP: 1.65, pP: .310, cP: .000, fP: .036 },
        { name: 'Rau muống', baseAmt: 80,  unit: 'g',  kP: 0.28, pP: .032, cP: .033, fP: .002 },
        { name: 'Cà rốt',    baseAmt: 60,  unit: 'g',  kP: 0.44, pP: .015, cP: .090, fP: .002 },
      ],
    },
    {
      id: 'l2', name: 'Bún Bò Nam Bộ', icon: '🍜', tag: 'ĐẶC SẢN', basePrice: 85000,
      ingredients: [
        { name: 'Bún tươi',  baseAmt: 150, unit: 'g',  kP: 1.16, pP: .017, cP: .253, fP: .009 },
        { name: 'Thịt bò',   baseAmt: 120, unit: 'g',  kP: 1.18, pP: .210, cP: .000, fP: .038 },
        { name: 'Giá đỗ',    baseAmt: 60,  unit: 'g',  kP: 0.52, pP: .055, cP: .072, fP: .001 },
        { name: 'Lạc rang',  baseAmt: 15,  unit: 'g',  kP: 5.85, pP: .260, cP: .160, fP: .500 },
      ],
    },
    {
      id: 'l3', name: 'Canh Cá Thu Cải Xanh', icon: '🐠', tag: 'OMEGA-3', basePrice: 80000,
      ingredients: [
        { name: 'Cá thu',    baseAmt: 130, unit: 'g',  kP: 1.66, pP: .182, cP: .000, fP: .103 },
        { name: 'Cải xanh',  baseAmt: 80,  unit: 'g',  kP: 0.23, pP: .017, cP: .038, fP: .001 },
        { name: 'Cà chua',   baseAmt: 60,  unit: 'g',  kP: 0.24, pP: .006, cP: .048, fP: .002 },
        { name: 'Gừng',      baseAmt: 10,  unit: 'g',  kP: 0.41, pP: .004, cP: .086, fP: .005 },
      ],
    },
    {
      id: 'l4', name: 'Cơm Thịt Lợn Kho', icon: '🥩', tag: 'TRUYỀN THỐNG', basePrice: 70000,
      ingredients: [
        { name: 'Gạo trắng',    baseAmt: 120, unit: 'g',  kP: 3.46, pP: .079, cP: .763, fP: .010 },
        { name: 'Thịt lợn nạc', baseAmt: 120, unit: 'g',  kP: 1.39, pP: .190, cP: .000, fP: .070 },
        { name: 'Tỏi',          baseAmt: 5,   unit: 'g',  kP: 1.26, pP: .060, cP: .247, fP: .004 },
        { name: 'Nước mắm',     baseAmt: 15,  unit: 'ml', kP: 0.35, pP: .051, cP: .036, fP: .000 },
      ],
    },
    {
      id: 'l5', name: 'Bún Đậu Phụ Rau Sống', icon: '🌿', tag: 'THUẦN CHAY', basePrice: 55000,
      ingredients: [
        { name: 'Bún tươi',  baseAmt: 150, unit: 'g',  kP: 1.16, pP: .017, cP: .253, fP: .009 },
        { name: 'Đậu phụ',   baseAmt: 150, unit: 'g',  kP: 0.97, pP: .109, cP: .011, fP: .054 },
        { name: 'Cải xanh',  baseAmt: 60,  unit: 'g',  kP: 0.23, pP: .017, cP: .038, fP: .001 },
        { name: 'Nước mắm',  baseAmt: 10,  unit: 'ml', kP: 0.35, pP: .051, cP: .036, fP: .000 },
      ],
    },
    {
      id: 'l6', name: 'Cơm Lứt Cá Ngừ Áp Chảo', icon: '🐟', tag: 'GIẢM CÂN', basePrice: 85000,
      ingredients: [
        { name: 'Gạo lứt',   baseAmt: 120, unit: 'g',  kP: 3.59, pP: .075, cP: .762, fP: .027 },
        { name: 'Cá ngừ',    baseAmt: 130, unit: 'g',  kP: 0.87, pP: .210, cP: .000, fP: .003 },
        { name: 'Cải xanh',  baseAmt: 60,  unit: 'g',  kP: 0.23, pP: .017, cP: .038, fP: .001 },
        { name: 'Dầu olive', baseAmt: 8,   unit: 'ml', kP: 9.00, pP: .000, cP: .000, fP: 1.000 },
      ],
    },
    {
      id: 'l7', name: 'Phở Gà Thanh Đạm', icon: '🍲', tag: 'PHỞ NHẸ', basePrice: 75000,
      ingredients: [
        { name: 'Bánh phở', baseAmt: 150, unit: 'g',  kP: 1.46, pP: .032, cP: .312, fP: .009 },
        { name: 'Gà',       baseAmt: 100, unit: 'g',  kP: 1.65, pP: .310, cP: .000, fP: .036 },
        { name: 'Hành lá',  baseAmt: 15,  unit: 'g',  kP: 0.26, pP: .013, cP: .052, fP: .000 },
        { name: 'Gừng',     baseAmt: 10,  unit: 'g',  kP: 0.41, pP: .004, cP: .086, fP: .005 },
      ],
    },
    {
      id: 'l8', name: 'Cơm Tôm Rang Sả', icon: '🦐', tag: 'VỊ BIỂN', basePrice: 80000,
      ingredients: [
        { name: 'Gạo trắng', baseAmt: 120, unit: 'g',  kP: 3.46, pP: .079, cP: .763, fP: .010 },
        { name: 'Tôm biển',  baseAmt: 130, unit: 'g',  kP: 0.82, pP: .176, cP: .009, fP: .009 },
        { name: 'Sả',        baseAmt: 15,  unit: 'g',  kP: 0.01, pP: .008, cP: .165, fP: .010 },
        { name: 'Tỏi',       baseAmt: 5,   unit: 'g',  kP: 1.26, pP: .060, cP: .247, fP: .004 },
        { name: 'Dầu mè',    baseAmt: 5,   unit: 'ml', kP: 9.00, pP: .000, cP: .000, fP: 1.000 },
      ],
    },
    {
      id: 'l9', name: 'Cơm Lứt Bò Xào Cải', icon: '🥩', tag: 'CAO ĐẠM', basePrice: 90000,
      ingredients: [
        { name: 'Gạo lứt',   baseAmt: 100, unit: 'g',  kP: 3.59, pP: .075, cP: .762, fP: .027 },
        { name: 'Thịt bò',   baseAmt: 130, unit: 'g',  kP: 1.18, pP: .210, cP: .000, fP: .038 },
        { name: 'Cải xanh',  baseAmt: 80,  unit: 'g',  kP: 0.23, pP: .017, cP: .038, fP: .001 },
        { name: 'Tỏi',       baseAmt: 5,   unit: 'g',  kP: 1.26, pP: .060, cP: .247, fP: .004 },
        { name: 'Dầu olive', baseAmt: 8,   unit: 'ml', kP: 9.00, pP: .000, cP: .000, fP: 1.000 },
      ],
    },
    {
      id: 'l10', name: 'Bún Chả Cải Xanh', icon: '🍜', tag: 'NƯỚNG THAN', basePrice: 80000,
      ingredients: [
        { name: 'Bún tươi',     baseAmt: 150, unit: 'g',  kP: 1.16, pP: .017, cP: .253, fP: .009 },
        { name: 'Thịt lợn nạc', baseAmt: 120, unit: 'g',  kP: 1.39, pP: .190, cP: .000, fP: .070 },
        { name: 'Cải xanh',     baseAmt: 80,  unit: 'g',  kP: 0.23, pP: .017, cP: .038, fP: .001 },
        { name: 'Nước mắm',     baseAmt: 15,  unit: 'ml', kP: 0.35, pP: .051, cP: .036, fP: .000 },
        { name: 'Tỏi',          baseAmt: 5,   unit: 'g',  kP: 1.26, pP: .060, cP: .247, fP: .004 },
      ],
    },
  ],
  dinner: [
    {
      id: 'd1', name: 'Đậu Phụ Sốt Cà Chua', icon: '🥢', tag: 'THUẦN CHAY', basePrice: 55000,
      ingredients: [
        { name: 'Đậu phụ', baseAmt: 200, unit: 'g',  kP: 0.97, pP: .109, cP: .011, fP: .054 },
        { name: 'Cà chua', baseAmt: 100, unit: 'g',  kP: 0.24, pP: .006, cP: .048, fP: .002 },
        { name: 'Hành lá', baseAmt: 15,  unit: 'g',  kP: 0.26, pP: .013, cP: .052, fP: .000 },
        { name: 'Dầu mè',  baseAmt: 8,   unit: 'ml', kP: 9.00, pP: .000, cP: .000, fP: 1.000 },
      ],
    },
    {
      id: 'd2', name: 'Gà Hấp Sả Gừng', icon: '🍗', tag: 'ÍT MỠ', basePrice: 70000,
      ingredients: [
        { name: 'Gà',      baseAmt: 180, unit: 'g',  kP: 1.65, pP: .310, cP: .000, fP: .036 },
        { name: 'Sả',      baseAmt: 15,  unit: 'g',  kP: 0.01, pP: .008, cP: .165, fP: .010 },
        { name: 'Gừng',    baseAmt: 10,  unit: 'g',  kP: 0.41, pP: .004, cP: .086, fP: .005 },
        { name: 'Dầu mè',  baseAmt: 5,   unit: 'ml', kP: 9.00, pP: .000, cP: .000, fP: 1.000 },
        { name: 'Hành lá', baseAmt: 10,  unit: 'g',  kP: 0.26, pP: .013, cP: .052, fP: .000 },
      ],
    },
    {
      id: 'd3', name: 'Rau Muống Xào Tỏi', icon: '🌿', tag: 'DETOX', basePrice: 40000,
      ingredients: [
        { name: 'Rau muống', baseAmt: 200, unit: 'g',  kP: 0.28, pP: .032, cP: .033, fP: .002 },
        { name: 'Tỏi',      baseAmt: 10,  unit: 'g',  kP: 1.26, pP: .060, cP: .247, fP: .004 },
        { name: 'Dầu mè',   baseAmt: 8,   unit: 'ml', kP: 9.00, pP: .000, cP: .000, fP: 1.000 },
        { name: 'Nước mắm', baseAmt: 10,  unit: 'ml', kP: 0.35, pP: .051, cP: .036, fP: .000 },
      ],
    },
    {
      id: 'd4', name: 'Canh Cải Xanh Tôm', icon: '🦐', tag: 'NHẸ BỤNG', basePrice: 65000,
      ingredients: [
        { name: 'Cải xanh', baseAmt: 150, unit: 'g',  kP: 0.23, pP: .017, cP: .038, fP: .001 },
        { name: 'Tôm biển', baseAmt: 100, unit: 'g',  kP: 0.82, pP: .176, cP: .009, fP: .009 },
        { name: 'Hành lá',  baseAmt: 15,  unit: 'g',  kP: 0.26, pP: .013, cP: .052, fP: .000 },
        { name: 'Gừng',     baseAmt: 5,   unit: 'g',  kP: 0.41, pP: .004, cP: .086, fP: .005 },
      ],
    },
    {
      id: 'd5', name: 'Khoai Lang Luộc Trứng', icon: '🍠', tag: 'ÍT TINH BỘT', basePrice: 45000,
      ingredients: [
        { name: 'Khoai lang', baseAmt: 200, unit: 'g',  kP: 1.24, pP: .008, cP: .298, fP: .002 },
        { name: 'Trứng gà',   baseAmt: 100, unit: 'g',  kP: 1.06, pP: .043, cP: .213, fP: .004 },
        { name: 'Hành lá',    baseAmt: 10,  unit: 'g',  kP: 0.26, pP: .013, cP: .052, fP: .000 },
      ],
    },
    {
      id: 'd6', name: 'Cá Thu Kho Gừng', icon: '🐠', tag: 'TRUYỀN THỐNG', basePrice: 75000,
      ingredients: [
        { name: 'Cá thu',    baseAmt: 150, unit: 'g',  kP: 1.66, pP: .182, cP: .000, fP: .103 },
        { name: 'Gừng',      baseAmt: 15,  unit: 'g',  kP: 0.41, pP: .004, cP: .086, fP: .005 },
        { name: 'Tỏi',       baseAmt: 5,   unit: 'g',  kP: 1.26, pP: .060, cP: .247, fP: .004 },
        { name: 'Nước mắm',  baseAmt: 15,  unit: 'ml', kP: 0.35, pP: .051, cP: .036, fP: .000 },
      ],
    },
    {
      id: 'd7', name: 'Thịt Bò Xào Cải', icon: '🥩', tag: 'CAO ĐẠM', basePrice: 80000,
      ingredients: [
        { name: 'Thịt bò',   baseAmt: 150, unit: 'g',  kP: 1.18, pP: .210, cP: .000, fP: .038 },
        { name: 'Cải xanh',  baseAmt: 100, unit: 'g',  kP: 0.23, pP: .017, cP: .038, fP: .001 },
        { name: 'Tỏi',       baseAmt: 8,   unit: 'g',  kP: 1.26, pP: .060, cP: .247, fP: .004 },
        { name: 'Dầu olive', baseAmt: 8,   unit: 'ml', kP: 9.00, pP: .000, cP: .000, fP: 1.000 },
      ],
    },
    {
      id: 'd8', name: 'Canh Đậu Xanh Rau Bí', icon: '🌿', tag: 'CHAY NHẸ', basePrice: 45000,
      ingredients: [
        { name: 'Đậu xanh', baseAmt: 40,  unit: 'g',  kP: 3.46, pP: .234, cP: .578, fP: .024 },
        { name: 'Rau bí',   baseAmt: 150, unit: 'g',  kP: 0.26, pP: .027, cP: .031, fP: .003 },
        { name: 'Hành lá',  baseAmt: 10,  unit: 'g',  kP: 0.26, pP: .013, cP: .052, fP: .000 },
        { name: 'Dầu mè',   baseAmt: 5,   unit: 'ml', kP: 9.00, pP: .000, cP: .000, fP: 1.000 },
      ],
    },
    {
      id: 'd9', name: 'Tôm Hấp Sả Gừng', icon: '🦐', tag: 'ÍT CALO', basePrice: 70000,
      ingredients: [
        { name: 'Tôm biển', baseAmt: 180, unit: 'g',  kP: 0.82, pP: .176, cP: .009, fP: .009 },
        { name: 'Sả',       baseAmt: 15,  unit: 'g',  kP: 0.01, pP: .008, cP: .165, fP: .010 },
        { name: 'Gừng',     baseAmt: 10,  unit: 'g',  kP: 0.41, pP: .004, cP: .086, fP: .005 },
        { name: 'Nước mắm', baseAmt: 10,  unit: 'ml', kP: 0.35, pP: .051, cP: .036, fP: .000 },
      ],
    },
    {
      id: 'd10', name: 'Cà Rốt Khoai Lang Đậu Phụ Hầm', icon: '🥕', tag: 'THUẦN CHAY', basePrice: 50000,
      ingredients: [
        { name: 'Cà rốt',    baseAmt: 100, unit: 'g',  kP: 0.44, pP: .015, cP: .090, fP: .002 },
        { name: 'Khoai lang', baseAmt: 100, unit: 'g',  kP: 1.24, pP: .008, cP: .298, fP: .002 },
        { name: 'Đậu phụ',   baseAmt: 120, unit: 'g',  kP: 0.97, pP: .109, cP: .011, fP: .054 },
        { name: 'Gừng',      baseAmt: 8,   unit: 'g',  kP: 0.41, pP: .004, cP: .086, fP: .005 },
        { name: 'Nước mắm',  baseAmt: 10,  unit: 'ml', kP: 0.35, pP: .051, cP: .036, fP: .000 },
      ],
    },
  ],
}

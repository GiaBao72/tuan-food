import { useState } from 'react'
import { useProfileStore } from '../../store/useProfileStore'

export function LoginScreen() {
  const { login } = useProfileStore()
  const [phone, setPhone] = useState('')
  const [loading, setLoading] = useState(false)

  const isValid = /^(0[3-9]\d{8})$/.test(phone.replace(/\s/g, ''))

  const handleLogin = () => {
    if (!isValid) return
    setLoading(true)
    const clean = phone.replace(/\s/g, '')
    const { isNew } = login(clean)
    // nhỏ delay để UI mượt
    setTimeout(() => setLoading(false), 300)
    void isNew // dùng sau nếu cần
  }

  return (
    <div className="min-h-screen bg-olive-900 flex flex-col items-center justify-center px-6">
      <div className="w-full max-w-sm">
        {/* Logo */}
        <div className="text-center mb-10">
          <div className="text-5xl mb-3">🥗</div>
          <h1 className="text-3xl font-bold text-white font-serif tracking-tight">NutriKitchen</h1>
          <p className="text-olive-300 text-sm mt-2">Thực đơn cá nhân hoá theo TDEE của bạn</p>
        </div>

        {/* Form */}
        <div className="bg-white rounded-3xl p-6 shadow-2xl">
          <h2 className="text-base font-bold text-olive-900 mb-1">Nhập số điện thoại</h2>
          <p className="text-xs text-olive-400 mb-5">Số điện thoại là ID của bạn — không cần mật khẩu</p>

          <input
            type="tel"
            value={phone}
            onChange={e => setPhone(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && isValid && handleLogin()}
            placeholder="09xx xxx xxx"
            maxLength={11}
            className="w-full border-2 border-cream-dark rounded-2xl px-4 py-3.5 text-xl font-bold text-olive-900 outline-none focus:border-olive-500 transition-colors bg-cream-light tracking-widest text-center"
            autoFocus
          />

          {phone.length > 3 && !isValid && (
            <p className="text-xs text-rust-600 mt-2 text-center">Số điện thoại không hợp lệ</p>
          )}

          <button
            onClick={handleLogin}
            disabled={!isValid || loading}
            className="w-full mt-4 bg-olive-700 text-white font-bold py-3.5 rounded-2xl text-base hover:bg-olive-800 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {loading ? '...' : 'Tiếp tục →'}
          </button>

          <p className="text-center text-xs text-olive-300 mt-4">
            Số mới → tạo hồ sơ · Số cũ → tải lại dữ liệu
          </p>
        </div>
      </div>
    </div>
  )
}

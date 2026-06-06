interface StepBarProps {
  step: number
  total?: number
  labels?: string[]
}

export function StepBar({ step, total = 4, labels = ['Hồ sơ', 'TDEE', 'Thực đơn', 'Xác nhận'] }: StepBarProps) {
  return (
    <div className="flex items-center justify-between mb-6 px-1">
      {Array.from({ length: total }).map((_, i) => (
        <div key={i} className="flex items-center flex-1">
          <div className="flex flex-col items-center">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                i < step
                  ? 'bg-olive-600 text-white'
                  : i === step
                  ? 'bg-olive-500 text-white ring-2 ring-olive-300'
                  : 'bg-cream-dark text-olive-400'
              }`}
            >
              {i < step ? '✓' : i + 1}
            </div>
            <span className={`text-[10px] mt-1 ${i <= step ? 'text-olive-700 font-medium' : 'text-olive-300'}`}>
              {labels[i]}
            </span>
          </div>
          {i < total - 1 && (
            <div className={`flex-1 h-0.5 mx-1 mb-4 ${i < step ? 'bg-olive-500' : 'bg-cream-dark'}`} />
          )}
        </div>
      ))}
    </div>
  )
}

interface BottomNavProps {
  step: number
  onPrev: () => void
  onNext: () => void
  nextLabel?: string
  nextDisabled?: boolean
  showPrev?: boolean
}

export function BottomNav({ step, onPrev, onNext, nextLabel = 'Tiep theo', nextDisabled, showPrev = true }: BottomNavProps) {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-cream-white border-t border-cream-dark px-4 py-3 flex gap-3 max-w-lg mx-auto">
      {showPrev && step > 0 && (
        <button
          onClick={onPrev}
          className="flex-1 py-3 rounded-xl border border-cream-dark text-olive-700 font-medium text-sm hover:bg-cream-base transition-colors"
        >
          Quay lai
        </button>
      )}
      <button
        onClick={onNext}
        disabled={nextDisabled}
        className={`flex-1 py-3 rounded-xl font-semibold text-sm transition-colors ${
          nextDisabled
            ? 'bg-olive-200 text-olive-400 cursor-not-allowed'
            : 'bg-olive-600 text-white hover:bg-olive-700'
        }`}
      >
        {nextLabel}
      </button>
    </div>
  )
}

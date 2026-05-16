import { useEffect, useRef, useState } from 'react'

// tier picker that sits inside the parent dropdown (Upgrade Commission Tier)
function CheckIcon() {
  return (
    <svg
      className="h-4 w-4 shrink-0 text-saral-purple"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2.5}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
  )
}

export default function InlineNestedSelect({
  value,
  onChange,
  options = [],
  placeholder = 'Select duration',
}) {
  const [open, setOpen] = useState(false)
  const containerRef = useRef(null)

  useEffect(() => {
    if (!open) return

    const handleClickOutside = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [open])

  const selectedOption = options.find((opt) => opt.value === value)

  return (
    <div ref={containerRef} className="relative mx-2 mb-1 min-w-[150px]">
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation()
          setOpen((prev) => !prev)
        }}
        className="flex w-full items-center justify-between rounded-lg border-2 border-saral-purple bg-white px-3 py-2.5 text-left text-sm text-saral-heading outline-none transition hover:border-saral-purple focus:border-saral-purple focus:ring-2 focus:ring-saral-icon-bg"
      >
        <span className={`${value ? '' : 'text-[#c4bec6]'}`}>
          {selectedOption?.label || placeholder}
        </span>
        <svg
          className={`h-4 w-4 shrink-0 text-[#a8a3ad] transition-transform ${open ? 'rotate-180' : ''}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {open && (
        <div className="absolute left-0 right-0 z-20 mt-1 overflow-hidden rounded-xl border border-[#ebe6ec] bg-white shadow-[0_10px_30px_rgba(45,10,49,0.12)]">
          <div className="max-h-44 overflow-y-auto">
            {options.length === 0 ? (
              <div className="px-3 py-2 text-sm text-[#8a8490]">{placeholder}</div>
            ) : (
              options.map((option) => {
                const isSelected = value === option.value
                return (
                  <button
                    key={option.value}
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation()
                      onChange(option.value)
                      setOpen(false)
                    }}
                    className={`flex w-full items-center justify-between gap-2 px-3 py-2 text-left text-sm transition ${
                      isSelected
                        ? 'bg-[#fdf2f8] font-medium text-saral-purple'
                        : 'text-saral-heading hover:bg-[#faf8fa]'
                    }`}
                  >
                    <span>{option.label}</span>
                    {isSelected && <CheckIcon />}
                  </button>
                )
              })
            )}
          </div>
        </div>
      )}
    </div>
  )
}

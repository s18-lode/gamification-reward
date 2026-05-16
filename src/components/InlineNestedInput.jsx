// the little $ input that shows up inside the dropdown when an option needs a value

export function InlineCurrencyInput({ value, onChange, placeholder = 'e.g. 100' }) {
  return (
    <div className="mx-2 mb-1 flex min-w-[100px] flex-1 items-center gap-1 rounded-lg border-2 border-saral-purple bg-white px-3 py-2.5">
      <span className="text-sm font-medium text-saral-purple">$</span>
      <input
        type="number"
        min={0}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full min-w-0 bg-transparent text-sm text-saral-heading outline-none placeholder:text-[#c4bec6]"
        onClick={(e) => e.stopPropagation()}
      />
    </div>
  )
}

export function InlineNumberInput({ value, onChange, placeholder, prefix = '' }) {
  return (
    <div className="mx-2 mb-1 flex min-w-[100px] flex-1 items-center gap-1 rounded-lg border-2 border-saral-purple bg-white px-3 py-2.5">
      {prefix && <span className="text-sm font-medium text-saral-purple">{prefix}</span>}
      <input
        type="number"
        min={0}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full min-w-0 bg-transparent text-sm text-saral-heading outline-none placeholder:text-[#c4bec6]"
        onClick={(e) => e.stopPropagation()}
      />
    </div>
  )
}

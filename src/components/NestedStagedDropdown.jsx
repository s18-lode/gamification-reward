import { useEffect, useRef } from 'react'
import { InlineCurrencyInput, InlineNumberInput } from './InlineNestedInput'
import InlineNestedSelect from './InlineNestedSelect'

function CheckIcon() {
  return (
    <svg className="h-4 w-4 shrink-0 text-saral-purple" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
  )
}

function renderInlineField(field, values, onFieldChange) {
  if (field.type === 'currency') {
    return (
      <InlineCurrencyInput
        key={field.name}
        value={values[field.name] ?? ''}
        onChange={(val) => onFieldChange(field.name, val)}
        placeholder={field.placeholder}
      />
    )
  }

  if (field.type === 'number') {
    return (
      <InlineNumberInput
        key={field.name}
        value={values[field.name] ?? ''}
        onChange={(val) => onFieldChange(field.name, val)}
        placeholder={field.placeholder}
        prefix={field.name === 'rate' ? '%' : ''}
      />
    )
  }

  if (field.type === 'select' && field.inline) {
    return (
      <InlineNestedSelect
        key={field.name}
        value={values[field.name] ?? ''}
        onChange={(val) => onFieldChange(field.name, val)}
        options={field.options}
        placeholder={field.placeholder}
      />
    )
  }

  return null
}

export default function NestedStagedDropdown({
  label,
  placeholder = 'Select',
  options = [],
  selectedOption,
  confirmedFieldValues = {},
  stagedOption,
  stagedFieldValues = {},
  onSelectOption,
  onFieldChange,
  getLiveLabel,
  isOpen,
  onOpen,
  onCancel,
  onSave,
  disabled = false,
  required = false,
  emptyMessage = 'No options available',
  variant = 'default',
  validateSave,
}) {
  const containerRef = useRef(null)
  const listRef = useRef(null)
  const isModal = variant === 'modal'

  const hasNestedPanel = stagedOption?.fields?.some((f) => f.inline)

  useEffect(() => {
    if (!isOpen) return
    const handleClickOutside = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        onCancel()
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [isOpen, onCancel])

  // keep nested input + save row in view when it opens
  useEffect(() => {
    if (!isOpen || !hasNestedPanel || !listRef.current) return
    const selectedEl = listRef.current.querySelector('[data-selected="true"]')
    selectedEl?.scrollIntoView({ block: 'nearest' })
  }, [isOpen, hasNestedPanel, stagedOption?.id])

  const activeOption = isOpen ? stagedOption : selectedOption
  const values = isOpen ? stagedFieldValues : confirmedFieldValues
  const liveLabel =
    activeOption && getLiveLabel ? getLiveLabel(activeOption, values) : null
  const displayText = liveLabel || activeOption?.label || placeholder
  const hasValue = Boolean(activeOption && (liveLabel || activeOption?.label))

  const canSave = stagedOption
    ? validateSave
      ? validateSave(stagedOption, stagedFieldValues)
      : true
    : false

  if (!isModal) {
    return (
      <div ref={containerRef} className="relative">
        <label className="mb-1.5 block text-sm font-medium text-slate-700">{label}</label>
        <button type="button" onClick={onOpen} disabled={disabled} className="w-full rounded-lg border px-3 py-2.5 text-left text-sm">
          {displayText}
        </button>
      </div>
    )
  }

  return (
    <div ref={containerRef} className={`relative ${isOpen ? 'z-100' : ''}`}>
      <label className="mb-2 block text-sm text-saral-nav">
        {label}
        {required && <span className="ml-0.5 text-red-500">*</span>}
      </label>

      <button
        type="button"
        onClick={onOpen}
        disabled={disabled}
        className={`flex w-full items-center justify-between rounded-lg border border-[#e8e4ea] bg-white px-4 py-3 text-left text-sm outline-none transition hover:border-[#d4ced6] focus:border-saral-purple focus:ring-2 focus:ring-saral-icon-bg disabled:cursor-not-allowed disabled:opacity-60 ${
          hasValue ? 'text-saral-heading' : 'text-[#a8a3ad]'
        }`}
      >
        <span className="truncate pr-2">{displayText}</span>
        <svg
          className={`h-4 w-4 shrink-0 text-[#a8a3ad] transition-transform ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* dropdown panel — save/cancel footer is always visible (not inside scroll) */}
      <div
        className={`absolute left-0 right-0 z-100 mt-1 flex flex-col overflow-hidden rounded-xl border border-[#ebe6ec] bg-white shadow-[0_8px_30px_rgba(45,10,49,0.15)] transition-all duration-200 ${
          isOpen
            ? 'pointer-events-auto translate-y-0 opacity-100'
            : 'pointer-events-none -translate-y-1 opacity-0'
        } ${hasNestedPanel ? 'max-h-[min(360px,50vh)]' : 'max-h-[min(260px,40vh)]'}`}
      >
        {options.length === 0 ? (
          <p className="px-3 py-4 text-sm text-[#8a8490]">{emptyMessage}</p>
        ) : (
          <>
            <div
              ref={listRef}
              className="min-h-0 overflow-y-auto overscroll-contain p-1"
              style={{ maxHeight: hasNestedPanel ? '200px' : '160px' }}
            >
              {options.map((option) => {
                const isSelected = stagedOption?.id === option.id
                const showInline = isSelected && option.fields?.some((f) => f.inline)

                return (
                  <div key={option.id} className="mb-0.5" data-selected={isSelected}>
                    <button
                      type="button"
                      disabled={option.disabled}
                      onClick={() => onSelectOption(option)}
                      className={`flex w-full items-center justify-between gap-2 rounded-lg px-3 py-2.5 text-left text-sm transition ${
                        isSelected
                          ? 'bg-[#fdf2f8] font-medium text-saral-purple'
                          : option.disabled
                            ? 'cursor-not-allowed text-[#d4ced6]'
                            : 'text-saral-heading hover:bg-[#faf8fa]'
                      }`}
                    >
                      <span>{option.label}</span>
                      {isSelected && <CheckIcon />}
                    </button>

                    {showInline && (
                      <div className="mx-2 mb-1 flex items-center gap-2">
                        {option.fields
                          .filter((f) => f.inline)
                          .map((field) =>
                            renderInlineField(field, stagedFieldValues, onFieldChange)
                          )}
                      </div>
                    )}
                  </div>
                )
              })}
            </div>

            {/* save / cancel — fixed at bottom of dropdown, never scrolled away */}
            <div className="flex shrink-0 justify-end gap-2 border-t border-[#f3eef2] bg-white px-2 py-2.5">
              <button
                type="button"
                onClick={onCancel}
                className="rounded-lg border border-[#e8e4ea] bg-white px-4 py-2 text-sm font-medium text-saral-heading hover:bg-[#faf8fa]"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={onSave}
                disabled={!canSave}
                className={`rounded-lg px-4 py-2 text-sm font-semibold text-white transition ${
                  canSave
                    ? 'bg-saral-purple hover:bg-saral-purple-hover'
                    : 'cursor-not-allowed bg-[#f5c6f5] text-white/90'
                }`}
              >
                Save
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

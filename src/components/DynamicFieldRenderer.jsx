export default function DynamicFieldRenderer({ fields, values, onChange, disabled = false }) {
  if (!fields?.length) return null
// Renders a dynamic set of form fields based on the provided configuration, handling different input types and disabled state
  return (
    <div className="mt-3 space-y-3 border-t border-slate-100 pt-3">
      {fields.map((field) => (
        <div key={field.name}>
          <label className="mb-1 block text-xs font-medium text-slate-600">
            {field.label}
          </label>
          {field.type === 'select' ? (
            <select
              value={values[field.name] ?? ''}
              onChange={(e) => onChange(field.name, e.target.value)}
              disabled={disabled}
              className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm outline-none transition focus:border-brand-500 focus:ring-2 focus:ring-brand-100 disabled:bg-slate-50"
            >
              <option value="">Select…</option>
              {field.options?.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          ) : (
            <input
              type={field.type}
              value={values[field.name] ?? ''}
              onChange={(e) => onChange(field.name, e.target.value)}
              placeholder={field.placeholder}
              min={field.min}
              max={field.max}
              disabled={disabled}
              className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm outline-none transition focus:border-brand-500 focus:ring-2 focus:ring-brand-100 disabled:bg-slate-50"
            />
          )}
        </div>
      ))}
    </div>
  )
}

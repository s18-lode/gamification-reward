export default function TimeBoundReward({
  enabled,
  startDate,
  endDate,
  onToggle,
  onStartChange,
  onEndChange,
}) {
  return (
    <div className="rounded-xl border border-slate-200 bg-slate-50/50 p-4">
      <label className="flex cursor-pointer items-center gap-3">
        <input
          type="checkbox"
          checked={enabled}
          onChange={(e) => onToggle(e.target.checked)}
          className="h-4 w-4 rounded border-slate-300 text-brand-600 focus:ring-brand-500"
        />
        <div>
          <span className="text-sm font-medium text-slate-800">Time-bound reward</span>
          <p className="text-xs text-slate-500">Limit this reward to a specific date range</p>
        </div>
      </label>

      {enabled && (
        <div className="mt-4 grid gap-3 sm:grid-cols-2 transition-all duration-200">
          <div>
            <label className="mb-1 block text-xs font-medium text-slate-600">Start date</label>
            <input
              type="date"
              value={startDate}
              onChange={(e) => onStartChange(e.target.value)}
              className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-100"
            />
          </div>
          <div>
            <label className="mb-1 block text-xs font-medium text-slate-600">End date</label>
            <input
              type="date"
              value={endDate}
              onChange={(e) => onEndChange(e.target.value)}
              min={startDate}
              className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-100"
            />
          </div>
        </div>
      )}
    </div>
  )
}

import { formatDate } from '../utils/formatters'

export default function CampaignCard({ campaign, onDelete }) {
  return (
    <article className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition hover:shadow-md">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="font-semibold text-slate-900">{campaign.name}</h3>
          <p className="mt-1 text-xs text-slate-400">{formatDate(campaign.createdAt)}</p>
        </div>
        <button
          type="button"
          onClick={() => onDelete(campaign.id)}
          className="text-xs font-medium text-slate-400 transition hover:text-red-500"
        >
          Delete
        </button>
      </div>
      <ul className="mt-4 space-y-2">
        {campaign.rewards?.map((reward, i) => (
          <li
            key={i}
            className="rounded-lg border border-slate-100 bg-slate-50 px-3 py-2 text-sm"
          >
            <span className="font-medium text-slate-800">{reward.eventLabel}</span>
            <span className="text-slate-400"> → </span>
            <span className="text-slate-600">{reward.typeLabel}</span>
            {reward.timeBound?.enabled && (
              <span className="ml-2 inline-block rounded bg-brand-50 px-1.5 py-0.5 text-[10px] font-medium text-brand-700">
                Time bound
              </span>
            )}
          </li>
        ))}
      </ul>
    </article>
  )
}

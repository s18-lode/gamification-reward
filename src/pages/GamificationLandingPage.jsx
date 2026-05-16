import { useState } from 'react'
import { useOutletContext } from 'react-router-dom'
import CreateCampaignModal from '../components/CreateCampaignModal'
import { BellIcon, CrownIcon, GiftIcon, TagIcon } from '../components/icons/NavIcons'

const FEATURE_CARDS = [
  {
    title: 'Reward Your Ambassadors',
    description: 'Boost campaign performance by setting up rewards for ambassadors',
    icon: GiftIcon,
  },
  {
    title: 'Set Milestones',
    description: 'Set up custom goals for sales, posts, or time-based achievements',
    icon: CrownIcon,
  },
  {
    title: 'Customise Incentives',
    description:
      'Create custom incentives like flat fees, free products, or special commissions.',
    icon: TagIcon,
  },
]

export default function GamificationLandingPage() {
  const { openSidebar } = useOutletContext() || {}
  const [showModal, setShowModal] = useState(false)

  return (
    <>
      <div className="flex min-h-full max-w-[960px] mx-auto flex-col overflow-hidden bg-white">
        <header className="flex items-center justify-between gap-3 x-4 py-4 sm:px-6 lg:px-8 lg:py-5">
          <div className="flex min-w-0 items-center gap-3">
            {/* hamburger — only on smaller breakpoints */}
            <button
              type="button"
              onClick={() => openSidebar?.()}
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg text-saral-nav hover:bg-saral-pink lg:hidden"
              aria-label="Open menu"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" d="M4 7h16M4 12h16M4 17h16" />
              </svg>
            </button>
            <h1 className="truncate text-lg font-semibold text-saral-heading sm:text-xl">
              Gamification
            </h1>
          </div>

          <div className="flex shrink-0 items-center gap-3 sm:gap-4">
            <div className="relative text-saral-nav">
              <BellIcon />
              <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-semibold text-white">
                5
              </span>
            </div>
            <img
              src="https://i.pravatar.cc/40?img=12"
              alt=""
              className="h-9 w-9 rounded-full object-cover ring-2 ring-white"
            />
          </div>
        </header>

        <section className="relative overflow-hidden rounded-[26px] border-[0.68px] border-[#E3E3E3] bg-[url('/images/gamification-hero.png')] bg-cover bg-center mx-3 flex flex-col items-center justify-center px-4 py-12 text-center sm:mx-6 sm:px-6 sm:py-16">
          <div className="absolute inset-0 bg-white/40" />
          <div className="relative z-10">
            <h2 className="max-w-lg text-2xl font-bold leading-tight text-saral-heading sm:text-3xl md:text-4xl">
            Gamify your Campaign
          </h2>
          <p className="mt-3 max-w-md text-sm text-saral-muted sm:text-base">
            Enable gamification to start crafting your custom reward system.
          </p>
          <button
            type="button"
            onClick={() => setShowModal(true)}
            className="mt-6 rounded-full bg-saral-purple px-6 py-2.5 text-sm font-semibold text-white shadow-md transition hover:bg-saral-purple-hover sm:mt-8 sm:px-8 sm:py-3"
          >
            Enable Gamification
          </button>
          </div>
        </section>

        <section className="relative -mt-10 z-10 grid grid-cols-1 gap-4 px-4 pb-8 pt-4 sm:gap-5 sm:px-6 sm:pb-10 sm:pt-6 md:grid-cols-2 lg:grid-cols-3 lg:px-10">
          {FEATURE_CARDS.map(({ title, description, icon: Icon }) => (
            <article
              key={title}
              className="card-wave-bg relative overflow-hidden rounded-2xl border border-pink-100/80 bg-white p-5 shadow-sm sm:p-6"
            >
              <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-saral-icon-bg text-saral-purple">
                <Icon />
              </div>
              <h3 className="text-base font-semibold text-saral-heading">{title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-saral-muted">{description}</p>
            </article>
          ))}
        </section>
      </div>

      <CreateCampaignModal isOpen={showModal} onClose={() => setShowModal(false)} />
    </>
  )
}

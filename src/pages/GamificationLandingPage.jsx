import { useState } from 'react'
import { useOutletContext } from 'react-router-dom'
import CreateCampaignModal from '../components/CreateCampaignModal'
import { BellIcon, CrownIcon, GiftIcon, TagIcon } from '../components/icons/NavIcons'
import Button from '../components/ui/Button'

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
// Main landing page for the gamification section, featuring a hero section with a call to action and a grid of feature cards, along with a modal for creating campaigns
export default function GamificationLandingPage() {
  const { openSidebar } = useOutletContext() || {}
  const [showModal, setShowModal] = useState(false)

  return (
    <>
      <div className="flex min-h-full max-w-240  mx-auto flex-col overflow-hidden bg-white">
        <header className="flex items-center justify-between gap-3 x-4 py-4 sm:px-6 lg:px-8 lg:py-5">
          <div className="flex min-w-0 items-center gap-3">
            {/* hamburger — only on smaller breakpoints */}
            <Button
              type="button"
              variant="ghost"
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg text-saral-nav hover:bg-saral-pink lg:hidden p-0"
              onClick={() => openSidebar?.()}
              aria-label="Open menu"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" d="M4 7h16M4 12h16M4 17h16" />
              </svg>
            </Button>
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
              src="/images/dummyProfile.jpg"
              alt=""
              className="h-9 w-9 rounded-full object-cover ring-2 ring-white"
            />
          </div>
        </header>

        <section className="relative md:min-h-[80.5] mt-10 overflow-hidden rounded-2xl border-[0.68px] border-[#E3E3E3] bg-[url('/images/gamification-hero.png')] bg-cover bg-center mx-3 flex flex-col items-center justify-center px-4 py-12 text-center sm:mx-6 sm:px-6 sm:py-14">
          <div className="max-w-88.5 mx-auto">
            <h2 className="max-w-lg text-2xl font-bold leading-tight text-saral-purple-title sm:text-3xl md:text-[28px]">
              Gamify your Campaign
            </h2>
            <p className="mt-3 max-w-md text-sm text-saral-muted sm:text-base">
              Enable gamification to start crafting your custom reward system.
            </p>
            <Button
              variant="hero"
              size="lg"
              className='my-9'
              onClick={() => setShowModal(true)}>
              Enable Gamification
            </Button>
          </div>
        </section>

        <section className="relative -mt-14 z-20 grid grid-cols-1 gap-4 px-4 pb-8 pt-4 sm:pt-0 sm:gap-6 sm:px-6 sm:pb-10  md:grid-cols-2 lg:grid-cols-3 lg:px-10">
          {FEATURE_CARDS.map(({ title, description, icon: Icon }) => (
            <article
              key={title}
              className={`bg-[url("/images/wave-bg.png")] bg-cover bg-center relative overflow-hidden rounded-2xl border border-[#FEE7FE] bg-white p-5 text-center sm:p-6 shadow-[0px_7px_10px_0px_#0000000D]`}
            >
              <div className="mx-auto mb-4 flex h-17.5 w-17.5 items-center justify-center rounded-xl bg-saral-icon-bg text-saral-purple">
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

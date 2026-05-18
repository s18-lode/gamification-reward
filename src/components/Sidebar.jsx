import { Home, BarChart3, Sparkles, Layers, CreditCard, Settings2 } from 'lucide-react'
import { SaralLogo } from './icons/NavIcons'
import Button from './ui/Button'

const menuItems = [
  { label: 'Home', icon: Home },
  { label: 'Insights', icon: BarChart3 },
  { label: 'Gamification', icon: Sparkles, active: true },
  { label: 'Applications', icon: Layers },
  { label: 'Payments', icon: CreditCard },
]
// Sidebar component that renders the navigation menu with active state, responsive behavior for mobile, and a settings button at the bottom
export default function Sidebar({ isOpen, onClose }) {
  return (
    <>
      {/* background on phone/tablet when drawer is open */}
      {isOpen && (
        <Button
          type="button"
          variant="ghost"
          aria-label="Close menu"
          className="fixed inset-0 z-40 bg-slate-900/30 lg:hidden p-0 hover:bg-slate-900/30"
          onClick={onClose}
        />
      )}

      <aside
        className={`
          fixed inset-y-0 left-0 z-50 flex w-[210px] max-w-full flex-col bg-[#FDEFFD] px-3 py-5 shadow-lg shadow-slate-900/5
          transition-transform duration-300 ease-out
          lg:static lg:z-auto lg:shadow-none lg:px-4 lg:py-6 lg:translate-x-0
          ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}
      >
        <div className="mb-8 rounded-[10px] bg-saral-pink/70 px-3 py-3 shadow-sm">
          <SaralLogo />
        </div>

        <nav className="flex flex-col gap-2" aria-label="Primary navigation">
          {menuItems.map(({ label, icon: Icon, active }) => (
            <Button
              key={label}
              type="button"
              variant="ghost"
              className={`flex w-full items-center gap-3 rounded-[10px] px-3 py-3 text-[15px] font-medium transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-saral-purple focus-visible:ring-offset-2 focus-visible:ring-offset-white ${
                active
                  ? 'bg-saral-pink text-saral-purple shadow-[0_2px_10px_rgba(166,53,176,0.12)]'
                  : 'text-saral-nav hover:bg-saral-pink/70 hover:text-saral-purple'
              }`}
            >
              <Icon className={`h-5 w-5 ${active ? 'text-saral-purple' : 'text-saral-nav'}`} />
              <span>{label}</span>
            </Button>
          ))}
        </nav>

        <div className="mt-auto rounded-[10px] bg-saral-pink/70 px-3 py-3 shadow-sm">
          <Button
            type="button"
            variant="ghost"
            className="flex w-full items-center gap-3 rounded-[10px] text-sm font-medium text-saral-nav transition hover:bg-saral-pink hover:text-saral-purple"
          >
            <Settings2 className="h-5 w-5" />
            Settings
          </Button>
        </div>
      </aside>
    </>
  )
}

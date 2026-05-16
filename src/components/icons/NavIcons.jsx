import {
  Home as LucideHome,
  BarChart3 as LucideBarChart3,
  Sparkles as LucideSparkles,
  Layers as LucideLayers,
  CreditCard as LucideCreditCard,
  Settings2 as LucideSettings2,
  Gift as LucideGift,
  Crown as LucideCrown,
  Tag as LucideTag,
  Bell as LucideBell,
} from 'lucide-react'

export const HomeIcon = ({ className = 'h-7 w-7' }) => <LucideHome className={className} />
export const InsightsIcon = ({ className = 'h-7 w-7' }) => <LucideBarChart3 className={className} />
export const GamificationIcon = ({ className = 'h-7 w-7' }) => <LucideSparkles className={className} />
export const ApplicationsIcon = ({ className = 'h-7 w-7' }) => <LucideLayers className={className} />
export const PaymentsIcon = ({ className = 'h-7 w-7' }) => <LucideCreditCard className={className} />
export const UserSettingsIcon = ({ className = 'h-5 w-5' }) => <LucideSettings2 className={className} />
export const GiftIcon = ({ className = 'h-6 w-6' }) => <LucideGift className={className} />
export const CrownIcon = ({ className = 'h-6 w-6' }) => <LucideCrown className={className} />
export const TagIcon = ({ className = 'h-6 w-6' }) => <LucideTag className={className} />
export const BellIcon = ({ className = 'h-5 w-5' }) => <LucideBell className={className} />

export function SaralLogo() {
  return (
    <div className="flex text-center justify-center">
      <span className="text-[1.35rem] font-bold tracking-tight text-saral-heading">SARAL</span>
    </div>
  )
}

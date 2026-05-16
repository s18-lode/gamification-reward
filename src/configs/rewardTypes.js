import { rewardEvents } from './rewardEvents'

export const rewardTypes = [
  {
    id: 'bonus',
    label: 'Flat $X bonus',
    fields: [
      {
        name: 'amount',
        type: 'currency',
        placeholder: 'e.g. 50',
        inline: true,
      },
    ],
  },
  
  {
    id: 'upgrade_commission_tier',
    label: 'Upgrade Commission Tier',
    fields: [
      {
        name: 'tier',
        label: 'Target tier',
        type: 'select',
        inline: true,
        placeholder: 'Select tier',
        options: [
          { value: 'silver', label: 'Silver' },
          { value: 'gold', label: 'Gold' },
          { value: 'platinum', label: 'Platinum' },
        ],
      },
    ],
  },

]

export const getRewardTypeById = (id) =>
  rewardTypes.find((type) => type.id === id)

export const getAllowedRewardTypes = (eventId) => {
  const event = rewardEvents.find((e) => e.id === eventId)
  if (!event) return rewardTypes
  return rewardTypes.filter((type) => event.allowedRewards.includes(type.id))
}

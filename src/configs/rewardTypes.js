// Configuration for different reward types that can be assigned to events in the gamification system,
// including their fields and a helper function to get allowed reward types based on the selected event


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
          { value: 'Tier Name Here1', label: 'Tier Name Here1' },
          { value: 'Tier Name Here2', label: 'Tier Name Here2' },
          { value: 'Tier Name Here3', label: 'Tier Name Here3' },
          { value: 'Tier Name Here4', label: 'Tier Name Here4' },
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

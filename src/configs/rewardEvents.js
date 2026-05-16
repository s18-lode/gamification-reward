export const rewardEvents = [
  {
    id: 'sales',
    label: 'Cross $X in sales',
    allowedRewards: ['bonus', 'upgrade_commission_tier'],
    fields: [
      {
        name: 'amount',
        type: 'currency',
        placeholder: 'e.g. 100',
        inline: true,
      },
    ],
  },
  {
    id: 'posts',
    label: 'Posts X times every Y period',
    allowedRewards: ['bonus', 'upgrade_commission_tier'],
    fields: [
      {
        name: 'postCount',
        type: 'number',
        placeholder: 'e.g. 5',
        inline: true,
      },
      {
        name: 'period',
        type: 'select',
        placeholder: 'Select duration',
        inline: true,
        options: [
          { value: '14 days', label: '14 days' },
          { value: '1 month', label: '1 month' },
          { value: '2 months', label: '2 months' },
          { value: '3 months', label: '3 months' },
          { value: '1 year', label: '1 year' },
        ],
      },
    ],
  },
  {
    id: 'onboarded',
    label: 'Is Onboarded',
    allowedRewards: ['bonus', 'upgrade_commission_tier'],
    fields: [],
  },
]

export const getRewardEventById = (id) =>
  rewardEvents.find((event) => event.id === id)

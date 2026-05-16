export const isRewardRuleComplete = (rule) => {
  if (!rule.eventId || !rule.typeId) return false
  return true
}

export const isCampaignValid = (campaign) => {
  if (!campaign.name?.trim()) return false
  if (!campaign.rewards?.length) return false
  return campaign.rewards.every(isRewardRuleComplete)
}

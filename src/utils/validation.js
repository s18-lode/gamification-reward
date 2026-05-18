export const isRewardRuleComplete = (rule) => {
  if (!rule.eventId || !rule.typeId) return false
  return true
}
// Helper function to check if a reward rule is complete, meaning it has both an event and a 
// type selected, used for validating campaign configurations before saving


export const isCampaignValid = (campaign) => {
  if (!campaign.name?.trim()) return false
  if (!campaign.rewards?.length) return false
  return campaign.rewards.every(isRewardRuleComplete)
}

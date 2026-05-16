export const formatDate = (isoString) => {
  if (!isoString) return ''
  return new Date(isoString).toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
}

export const formatRewardSummary = (reward) => {
  const parts = [reward.typeLabel]
  if (reward.fieldValues) {
    Object.entries(reward.fieldValues).forEach(([key, value]) => {
      if (value !== '' && value != null) {
        parts.push(`${key}: ${value}`)
      }
    })
  }
  return parts.join(' · ')
}

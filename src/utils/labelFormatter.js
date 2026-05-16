export const formatEventLiveLabel = (event, fieldValues = {}) => {
  if (!event) return null

  if (event.id === 'sales') {
    const amount = fieldValues.amount
    const display = amount ? Number(amount).toLocaleString() : 'X'
    return `Cross $${display} in sales`
  }

  if (event.id === 'posts') {
    const count = fieldValues.postCount || 'X'
    const period = fieldValues.period || 'Y period'
    return `Posts ${count} times every ${period}`
  }

  if (event.id === 'onboarded') {
    return 'Is Onboarded'
  }

  return event.label
}

export const formatTypeLiveLabel = (type, fieldValues = {}) => {
  if (!type) return null

  if (type.id === 'bonus') {
    const amount = fieldValues.amount
    const display = amount || 'X'
    return `Flat $${display} bonus`
  }

  if (type.id === 'commission') {
    const rate = fieldValues.rate || 'Y'
    return `Upgrade to ${rate}% commission`
  }

  if (type.id === 'upgrade_commission_tier') {
    const tier = fieldValues.tier
      ? fieldValues.tier.charAt(0).toUpperCase() + fieldValues.tier.slice(1)
      : ''
    return tier ? `Upgrade to ${tier} tier` : type.label
  }

  if (type.id === 'badge') {
    return fieldValues.badgeName ? `Badge: ${fieldValues.badgeName}` : type.label
  }

  return type.label
}

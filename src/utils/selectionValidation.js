// checks whether the user filled in everything needed before hitting save in a dropdown

export const canSaveEventSelection = (option, fieldValues = {}) => {
  if (!option) return false

  if (option.id === 'sales') {
    const amount = fieldValues.amount
    return amount !== '' && amount != null && Number(amount) > 0
  }

  if (option.id === 'posts') {
    return (
      Boolean(fieldValues.postCount && Number(fieldValues.postCount) > 0) &&
      Boolean(fieldValues.period)
    )
  }

  return true
}

export const canSaveTypeSelection = (option, fieldValues = {}) => {
  if (!option) return false

  if (option.id === 'bonus') {
    return Boolean(fieldValues.amount && Number(fieldValues.amount) > 0)
  }

  if (option.id === 'commission') {
    return Boolean(fieldValues.rate && Number(fieldValues.rate) > 0)
  }

  if (option.id === 'upgrade_commission_tier') {
    return Boolean(fieldValues.tier)
  }

  return true
}

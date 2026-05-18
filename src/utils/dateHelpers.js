// end date must be after today — used on the time-bound calendar in the modal
export const getMinFutureDate = () => {
  const tomorrow = new Date()
  tomorrow.setDate(tomorrow.getDate() + 1)
  return tomorrow.toISOString().split('T')[0]
}

// helper to check if a date string is in the future, used for validating the time-bound reward dates

export const isFutureDate = (dateStr) => {
  if (!dateStr) return false
  return dateStr >= getMinFutureDate()
}

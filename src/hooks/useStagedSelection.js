import { useCallback, useState } from 'react'

export const useStagedSelection = (initialValue = null) => {
  const [confirmed, setConfirmed] = useState(initialValue)
  const [staged, setStaged] = useState(initialValue)
  const [isOpen, setIsOpen] = useState(false)
// Custom hook to manage a staged selection process, allowing '
// for opening a selection interface, staging changes, 
// and confirming or canceling those changes with proper state management
  const open = useCallback(() => {
    setStaged(confirmed)
    setIsOpen(true)
  }, [confirmed])

  // used when we want to open fresh (e.g. auto-open reward with after event save)
  const openFresh = useCallback(() => {
    setStaged(null)
    setIsOpen(true)
  }, [])

  const cancel = useCallback(() => {
    setStaged(confirmed)
    setIsOpen(false)
  }, [confirmed])

  const save = useCallback((value) => {
    const next = value !== undefined ? value : staged
    setConfirmed(next)
    setStaged(next)
    setIsOpen(false)
    return next
  }, [staged])

  const updateStaged = useCallback((value) => {
    setStaged(value)
  }, [])

  return {
    confirmed,
    staged,
    isOpen,
    open,
    openFresh,
    cancel,
    save,
    updateStaged,
    setConfirmed,
  }
}

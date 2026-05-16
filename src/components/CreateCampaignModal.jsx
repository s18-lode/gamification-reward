import { useMemo, useState } from 'react'
import { useDispatch } from 'react-redux'
import { getRewardEventById, rewardEvents } from '../configs/rewardEvents'
import { getAllowedRewardTypes } from '../configs/rewardTypes'
import { addCampaign } from '../features/campaigns/campaignSlice'
import { useStagedSelection } from '../hooks/useStagedSelection'
import { getMinFutureDate } from '../utils/dateHelpers'
import { formatEventLiveLabel, formatTypeLiveLabel } from '../utils/labelFormatter'
import {
  canSaveEventSelection,
  canSaveTypeSelection,
} from '../utils/selectionValidation'
import NestedStagedDropdown from './NestedStagedDropdown'

const buildFieldDefaults = (fields = []) =>
  fields.reduce((acc, field) => ({ ...acc, [field.name]: '' }), {})

const initialForm = () => ({
  eventId: null,
  eventLabel: null,
  eventFieldValues: {},
  typeId: null,
  typeLabel: null,
  typeFieldValues: {},
  timeBound: { enabled: false, endDate: '' },
})

function ToggleSwitch({ checked, onChange }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      className={`relative h-6 w-11 shrink-0 rounded-full transition-colors ${
        checked ? 'bg-saral-purple' : 'bg-[#e4e0e6]'
      }`}
    >
      <span
        className={`absolute top-0.5 left-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform ${
          checked ? 'translate-x-5' : 'translate-x-0'
        }`}
      />
    </button>
  )
}

export default function CreateCampaignModal({ isOpen, onClose }) {
  const dispatch = useDispatch()
  const [form, setForm] = useState(initialForm)

  const eventSelection = useStagedSelection()
  const typeSelection = useStagedSelection()
  const [stagedEventFields, setStagedEventFields] = useState({})
  const [stagedTypeFields, setStagedTypeFields] = useState({})

  const confirmedEvent = useMemo(
    () => getRewardEventById(form.eventId),
    [form.eventId]
  )
  const confirmedType = useMemo(() => {
    if (!form.eventId || !form.typeId) return null
    return getAllowedRewardTypes(form.eventId).find((t) => t.id === form.typeId)
  }, [form.eventId, form.typeId])

  const typeOptions = useMemo(() => {
    if (!form.eventId) return []
    return getAllowedRewardTypes(form.eventId).map((type) => {
      const shouldDisableUpgradeTier =
        (form.eventId === 'onboarded' || form.eventId === 'posts') &&
        type.id === 'upgrade_commission_tier'

      return {
        ...type,
        disabled: shouldDisableUpgradeTier,
        disabledReason: shouldDisableUpgradeTier
          ? 'Not available for this event'
          : undefined,
      }
    })
  }, [form.eventId])

  const reset = () => {
    setForm(initialForm())
    eventSelection.setConfirmed(null)
    typeSelection.setConfirmed(null)
    setStagedEventFields({})
    setStagedTypeFields({})
  }

  const handleClose = () => {
    reset()
    onClose()
  }

  const handleEventOpen = () => {
    const current = confirmedEvent ?? null
    eventSelection.open()
    eventSelection.updateStaged(current)
    setStagedEventFields(form.eventFieldValues ?? buildFieldDefaults(current?.fields))
  }

  // selecting an option opens the nested input right under it (figma)
  const handleEventSelect = (option) => {
    eventSelection.updateStaged(option)
    setStagedEventFields(buildFieldDefaults(option.fields))
  }

  // typing in nested $ box updates the trigger live — Cross $100 in sales
  const handleEventFieldChange = (name, value) => {
    setStagedEventFields((prev) => {
      const next = { ...prev, [name]: value }
      return next
    })
  }

  const handleEventSave = () => {
    const saved = eventSelection.save()
    if (!saved || !canSaveEventSelection(saved, stagedEventFields)) return

    setForm((prev) => ({
      ...prev,
      eventId: saved.id,
      eventLabel: formatEventLiveLabel(saved, stagedEventFields),
      eventFieldValues: { ...stagedEventFields },
      typeId: null,
      typeLabel: null,
      typeFieldValues: {},
    }))
    typeSelection.setConfirmed(null)
    setStagedTypeFields({})

    // figma: after event is saved, reward with dropdown opens automatically
    queueMicrotask(() => {
      typeSelection.openFresh()
    })
  }

  const handleTypeOpen = () => {
    if (!form.eventId) return
    const current = confirmedType ?? null
    typeSelection.open()
    typeSelection.updateStaged(current)
    setStagedTypeFields(form.typeFieldValues ?? buildFieldDefaults(current?.fields))
  }

  const handleTypeSelect = (option) => {
    if (option.disabled) return
    typeSelection.updateStaged(option)
    setStagedTypeFields(buildFieldDefaults(option.fields))
  }

  const handleTypeFieldChange = (name, value) => {
    setStagedTypeFields((prev) => ({ ...prev, [name]: value }))
  }

  const handleTypeSave = () => {
    const saved = typeSelection.save()
    if (!saved || saved.disabled || !canSaveTypeSelection(saved, stagedTypeFields)) return

    setForm((prev) => ({
      ...prev,
      typeId: saved.id,
      typeLabel: formatTypeLiveLabel(saved, stagedTypeFields),
      typeFieldValues: { ...stagedTypeFields },
    }))
  }

  const handleCreate = () => {
    if (!form.eventId || !form.typeId) return
    if (form.timeBound.enabled && !form.timeBound.endDate) return

    dispatch(
      addCampaign({
        name: form.eventLabel || 'Reward campaign',
        rewards: [
          {
            eventId: form.eventId,
            eventLabel: form.eventLabel,
            eventFieldValues: form.eventFieldValues,
            typeId: form.typeId,
            typeLabel: form.typeLabel,
            typeFieldValues: form.typeFieldValues,
            timeBound: form.timeBound,
          },
        ],
      })
    )
    handleClose()
  }

  const minEndDate = getMinFutureDate()
  const canCreate =
    form.eventId &&
    form.typeId &&
    (!form.timeBound.enabled || (form.timeBound.endDate && form.timeBound.endDate >= minEndDate))

  const dropdownOpen = eventSelection.isOpen || typeSelection.isOpen

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-60 flex items-center justify-center p-4 sm:p-6">
      <button
        type="button"
        aria-label="Close overlay"
        className="absolute inset-0 bg-[#2d0a31]/25 backdrop-blur-[3px]"
        onClick={handleClose}
      />

      <div
        className="relative z-10 flex h-[min(580px,88vh)] w-full max-w-[480px] flex-col overflow-visible rounded-2xl bg-white shadow-[0_20px_50px_rgba(45,10,49,0.15)]"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        <div className="shrink-0 px-6 pb-0 pt-6 sm:px-8 sm:pt-8">
          <div className="mb-6 flex items-start justify-between gap-4">
            <h2
              id="modal-title"
              className="text-lg font-semibold leading-snug text-saral-heading sm:text-xl"
            >
              Create your reward system
            </h2>
            <button
              type="button"
              onClick={handleClose}
              className="mt-0.5 flex h-8 w-8 items-center justify-center rounded-lg text-saral-nav transition hover:bg-[#fdf2f8]"
              aria-label="Close"
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        <div
          className={`min-h-0 flex-1 px-6 sm:px-8 ${
            dropdownOpen
              ? 'relative z-20 overflow-hidden'
              : 'overflow-y-auto overflow-x-hidden'
          }`}
        >
          <div className="space-y-5 pb-4">
            <NestedStagedDropdown
              variant="modal"
              label="Reward event"
              placeholder="Select an event"
              required
              options={rewardEvents}
              selectedOption={confirmedEvent}
              confirmedFieldValues={form.eventFieldValues}
              stagedOption={eventSelection.staged}
              stagedFieldValues={stagedEventFields}
              getLiveLabel={formatEventLiveLabel}
              validateSave={canSaveEventSelection}
              onSelectOption={handleEventSelect}
              onFieldChange={handleEventFieldChange}
              isOpen={eventSelection.isOpen}
              onOpen={handleEventOpen}
              onCancel={eventSelection.cancel}
              onSave={handleEventSave}
            />

            <NestedStagedDropdown
              variant="modal"
              label="Reward with"
              placeholder="Select a reward"
              required
              disabled={!form.eventId}
              options={typeOptions}
              selectedOption={confirmedType}
              confirmedFieldValues={form.typeFieldValues}
              stagedOption={typeSelection.staged}
              stagedFieldValues={stagedTypeFields}
              getLiveLabel={formatTypeLiveLabel}
              validateSave={canSaveTypeSelection}
              onSelectOption={handleTypeSelect}
              onFieldChange={handleTypeFieldChange}
              isOpen={typeSelection.isOpen}
              onOpen={handleTypeOpen}
              onCancel={typeSelection.cancel}
              onSave={handleTypeSave}
            />

            <div className="pt-1">
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0">
                  <p className="text-sm font-medium text-saral-heading">Make the reward time bound</p>
                  <p className="mt-1 text-sm leading-relaxed text-[#8a8490]">
                    Choose an end date to stop this reward automatically.
                  </p>
                </div>
                <ToggleSwitch
                  checked={form.timeBound.enabled}
                  onChange={(enabled) =>
                    setForm({ ...form, timeBound: { ...form.timeBound, enabled } })
                  }
                />
              </div>

              {form.timeBound.enabled && (
                <div className="mt-4">
                  <label className="mb-2 block text-sm text-saral-nav">End date</label>
                  <input
                    type="date"
                    value={form.timeBound.endDate}
                    min={minEndDate}
                    onChange={(e) => {
                      const value = e.target.value
                      if (value && value < minEndDate) return
                      setForm({
                        ...form,
                        timeBound: { ...form.timeBound, endDate: value },
                      })
                    }}
                    className="w-full rounded-lg border border-[#e8e4ea] px-4 py-3 text-sm text-saral-heading outline-none focus:border-saral-purple focus:ring-2 focus:ring-saral-icon-bg"
                  />
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="relative z-10 shrink-0 rounded-b-2xl border-t border-[#f3eef2] bg-white px-6 py-5 sm:px-8">
          <div className="flex gap-3">
              <button
                type="button"
                onClick={handleClose}
                className="flex-1 rounded-lg border border-[#e8e4ea] bg-white py-3 text-sm font-medium text-saral-heading hover:bg-[#faf8fa]"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleCreate}
                disabled={!canCreate}
                className="flex-1 rounded-lg bg-saral-purple py-3 text-sm font-semibold text-white transition hover:bg-saral-purple-hover disabled:cursor-not-allowed disabled:opacity-50"
              >
                Create Reward
              </button>
          </div>
        </div>
      </div>
    </div>
  )
}

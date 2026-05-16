import { createSlice, nanoid } from '@reduxjs/toolkit'

const initialState = {
  campaigns: [],
}

const campaignSlice = createSlice({
  name: 'campaigns',
  initialState,
  reducers: {
    addCampaign: {
      reducer(state, action) {
        state.campaigns.unshift(action.payload)
      },
      prepare(campaign) {
        return {
          payload: {
            id: nanoid(),
            createdAt: new Date().toISOString(),
            ...campaign,
          },
        }
      },
    },
    removeCampaign(state, action) {
      state.campaigns = state.campaigns.filter((c) => c.id !== action.payload)
    },
  },
})

export const { addCampaign, removeCampaign } = campaignSlice.actions
export default campaignSlice.reducer

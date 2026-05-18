import { configureStore } from '@reduxjs/toolkit'
import campaignReducer from '../features/campaigns/campaignSlice'

// Main Redux store and combine reducers

export const store = configureStore({
  reducer: {
    campaigns: campaignReducer,
  },
})

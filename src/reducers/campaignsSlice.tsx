import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { type ICampaignsData, CampaignsData } from '../../mocks/Campaigns.data'

const initialState: ICampaignsData[] = CampaignsData

export const campaignsSlice = createSlice({
  name: 'campaigns',
  initialState,
  reducers: {
    created: (state, action: PayloadAction<ICampaignsData>) => {
      state.push(action.payload);
    },
    edited: (state, action: PayloadAction<ICampaignsData>) => {
      const {id} = action.payload
      state = state.map((item: any) => {
        if (item.id === id) {
          return action.payload
        }
        return item
      })
    },
    deleted: (state, action: PayloadAction<{ id: string }>) => {
      const foundCampaign = state.find((data) => data.id === Number(action.payload.id));
      if (foundCampaign) {
        state.splice(state.indexOf(foundCampaign), 1);
      }
    },
  },
})

// Action creators are generated for each case reducer function
export const { created, deleted, edited } = campaignsSlice.actions

export default campaignsSlice.reducer
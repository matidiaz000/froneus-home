import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { type IContactsData, ContactsData } from '../../mocks/Contacts.data'

const initialState: IContactsData[] = ContactsData

export const contactslice = createSlice({
  name: 'contacts',
  initialState,
  reducers: {
    created: (state, action: PayloadAction<IContactsData>) => {
      state.push(action.payload);
    },
    edited: (state, action: PayloadAction<IContactsData>) => {
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
export const { created, deleted, edited } = contactslice.actions

export default contactslice.reducer
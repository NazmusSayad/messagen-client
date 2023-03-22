import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  manageGroupId: '',
}

const Utils = createSlice({
  name: 'Utils',
  initialState,
  reducers: {
    setManageGroupId(state, { payload }: { payload: string }) {
      state.manageGroupId = payload
    },
  },
})

export const utilsReducers = Utils.reducer
export default Utils.actions

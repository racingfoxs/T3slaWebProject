import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  statusFilter: "",
  typeFilter: "",
  dateFilter: "",
}

export const filterSlice = createSlice({
  name: 'filterQuery',
  initialState,
  reducers: {
    setStatusFilter: (state, action) => {
        state.statusFilter = action.payload
      },
      setTypeFilter: (state, action) => {
        state.typeFilter = action.payload
      },
      setDateFilter: (state, action) => {
        state.dateFilter = action.payload
      },
  },
})

// Action creators are generated for each case reducer function
export const { setStatusFilter, setTypeFilter, setDateFilter } = filterSlice.actions

export default filterSlice
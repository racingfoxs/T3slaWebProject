import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  statusQuery: "",
  typeQuery: "",
  dateQuery: "",
}

export const filterSlice = createSlice({
  name: 'squery',
  initialState,
  reducers: {
    setStatusQuery: (state, action) => {
        state.statusQuery = action.payload
      },
      setTypeQuery: (state, action) => {
        state.typeQuery = action.payload
      },
      setDateQuery: (state, action) => {
        state.dateQuery = action.payload
      },
  },
})

// Action creators are generated for each case reducer function
export const { setStatusQuery, setTypeQuery, setDateQuery } = filterSlice.actions

export default filterSlice
import { createSlice } from "@reduxjs/toolkit"
import { RootState } from "lib/store"

// Define a type for the slice state
interface PagesState {
  pages: []
  pageEdit: null
}

// Define the initial state using that type
const initialState: PagesState = {
  pages: [],
  pageEdit: null,
}

const { actions, reducer } = createSlice({
  name: "pages",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    receivePages: (state, { payload }) => {
      state.pages = payload
    },
    receivePage: (state, { payload }) => {
      state.pageEdit = payload
    },
  },
})

export const {} = actions

// Other code such as selectors can use the imported `RootState` type
export const select = (state: RootState) => state

export default reducer

import { createSlice } from "@reduxjs/toolkit"
import { RootState } from "lib/store"

// Define a type for the slice state
interface State {}

// Define the initial state using that type
const initialState: State = {}

const { actions, reducer } = createSlice({
  name: "",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {},
})

export const {} = actions

// Other code such as selectors can use the imported `RootState` type
export const select = (state: RootState) => state

export default reducer

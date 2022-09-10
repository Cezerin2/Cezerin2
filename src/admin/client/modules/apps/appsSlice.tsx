import { createSlice } from "@reduxjs/toolkit"
import { RootState } from "lib/store"

// Define a type for the slice state
interface AppsState {
  account: null
  services: []
  service: null
  serviceSettings: null
  serviceLogs: null
  loadingEnableDisableService: boolean
}

// Define the initial state using that type
const initialState: AppsState = {
  account: null,
  services: [],
  service: null,
  serviceSettings: null,
  serviceLogs: null,
  loadingEnableDisableService: false,
}

const { actions, reducer } = createSlice({
  name: "apps",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {},
})

export const {} = actions

// Other code such as selectors can use the imported `RootState` type
export const select = (state: RootState) => state

export default reducer

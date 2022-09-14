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
  reducers: {
    receiveAccount: (state, { payload }) => {
      state.account = payload
    },
    receiveServices: (state, { payload }) => {
      state.services = payload
    },
    receiveService: (state, { payload }) => {
      state.service = payload
    },
    requestServiceSettings: state => {
      state.serviceSettings = null
    },
    receiveServiceSettings: (state, { payload }) => {
      state.serviceSettings = payload
    },
    receiveServiceLogs: (state, { payload }) => {
      state.serviceLogs = payload
    },
    requestEnableDisableService: state => {
      state.loadingEnableDisableService = true
    },
    receiveEnableDisableService: state => {
      state.loadingEnableDisableService = false
    },
  },
})

export const {
  receiveAccount,
  receiveServices,
  receiveService,
  requestServiceSettings,
  receiveServiceSettings,
  receiveServiceLogs,
  requestEnableDisableService,
  receiveEnableDisableService,
} = actions

// Other code such as selectors can use the imported `RootState` type
export const select = (state: RootState) => state

export default reducer

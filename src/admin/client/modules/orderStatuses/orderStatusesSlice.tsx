import { createSlice } from "@reduxjs/toolkit"
import { RootState } from "lib/store"

// Define a type for the slice state
interface OrderStatusesState {
  items: any[]
  isFetched: boolean
  isFetching: boolean
  isSaving: boolean
  errorFetch: null
  errorUpdate: null
  selectedId: "all"
}

// Define the initial state using that type
const initialState: OrderStatusesState = {
  items: [],
  isFetched: false,
  isFetching: false,
  isSaving: false,
  errorFetch: null,
  errorUpdate: null,
  selectedId: "all",
}

const { actions, reducer } = createSlice({
  name: "orderStatuses",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    requestStatuses: state => {
      state.isFetching = true
    },
    receiveStatuses: (state, { payload }) => {
      state.isFetching = false
      state.isFetched = true
      state.items = payload
    },
    receiveErrorStatuses: (state, { payload }) => {
      state.errorFetch = payload
    },
    selectStatus: (state, { payload }) => {
      state.selectedId = payload
    },
    deselectStatus: state => {
      state.selectedId = null
    },
    requestUpdateStatus: state => {
      state.isSaving = true
    },
    receiveUpdateStatus: state => {
      state.isSaving = false
    },
    errorUpdateStatus: (state, { payload }) => {
      state.isSaving = false
      state.errorUpdate = payload
    },
    successCreateStatus: () => {},
    successDeleteStatus: () => {},
  },
})

export const {} = actions

// Other code such as selectors can use the imported `RootState` type
export const select = (state: RootState) => state

export default reducer

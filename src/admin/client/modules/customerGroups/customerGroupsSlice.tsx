import { createSlice } from "@reduxjs/toolkit"
import { RootState } from "lib/store"

// Define a type for the slice state
interface CustomerGroupsState {
  items: []
  isFetched: boolean
  isFetching: boolean
  isSaving: boolean
  errorFetch: null
  errorUpdate: null
  selectedId: "all"
}

// Define the initial state using that type
const initialState: CustomerGroupsState = {
  items: [],
  isFetched: false,
  isFetching: false,
  isSaving: false,
  errorFetch: null,
  errorUpdate: null,
  selectedId: "all",
}

const { actions, reducer } = createSlice({
  name: "customerGroups",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    requestGroups: state => {
      state.isFetching = true
    },
    receiveGroups: (state, { payload }) => {
      state.isFetching = false
      state.isFetched = true
      state.items = payload
    },
    receiveErrorGroups: (state, { payload }) => {
      state.errorFetch = payload
    },
    selectGroup: (state, { payload }) => {
      state.selectedId = payload
    },
    deselectGroup: state => {
      state.selectedId = null
    },
    requestUpdateGroup: state => {
      state.isSaving = true
    },
    receiveUpdateGroup: state => {
      state.isSaving = false
    },
    errorUpdateGroup: (state, { payload }) => {
      state.isSaving = false
      state.errorUpdate = payload
    },
    successCreateGroup: () => {},
    successDeleteGroup: () => {},
  },
})

export const {} = actions

// Other code such as selectors can use the imported `RootState` type
export const select = (state: RootState) => state

export default reducer

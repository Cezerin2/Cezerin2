import { createSlice } from "@reduxjs/toolkit"
import { RootState } from "lib/store"

// Define a type for the slice state
interface CustomersState {
  editCustomer: null
  items: any[]
  selected: any[]
  hasMore: boolean
  totalCount: 0
  loadingItems: boolean
  errorLoadingItems: null
  search: ""
}

// Define the initial state using that type
const initialState: CustomersState = {
  editCustomer: null,
  items: [],
  selected: [],
  hasMore: false,
  totalCount: 0,
  loadingItems: false,
  errorLoadingItems: null,
  search: "",
}

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

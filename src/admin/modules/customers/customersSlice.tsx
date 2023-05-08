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
  name: "customers",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    requestCustomer: () => {},
    receiveCustomer: (state, { payload }) => {
      state.editCustomer = payload
    },
    requestCustomers: state => {
      state.loadingItems = true
    },
    receiveCustomers: (state, { payload: { has_more, total_count, data } }) => {
      state.loadingItems = false
      state.hasMore = has_more
      state.totalCount = total_count
      state.items = data
    },
    receiveCustomersError: (state, { payload }) => {
      state.loadingItems = false
      state.errorLoadingItems = payload
    },
    selectCustomer: (state, { payload }) => {
      state.selected = [...state.selected, payload]
    },
    deselectCustomer: (state, { payload }) => {
      state.selected = state.selected.filter(id => id !== payload)
    },
    deselectAllCustomer: state => {
      state.selected = []
    },
    selectAllCustomer: state => {
      let selected = state.items.map(item => item.id)
      state.selected = selected
    },
    setFilterSearch: (state, { payload }) => {
      state.search = payload
    },
    requestMoreCustomers: state => {
      state.loadingItems = true
    },
    receiveCustomersMore: (
      state,
      { payload: { has_more, total_count, data } }
    ) => {
      state.loadingItems = false
      state.hasMore = has_more
      state.totalCount = total_count
      state.items = [...state.items, ...data]
    },
    deleteCustomersSuccess: () => {},
    setGroupSuccess: () => {},
  },
})

export const {
  requestCustomer,
  receiveCustomer,
  requestCustomers,
  receiveCustomers,
  receiveCustomersError,
  selectCustomer,
  deselectCustomer,
  deselectAllCustomer,
  selectAllCustomer,
  setFilterSearch,
  requestMoreCustomers,
  receiveCustomersMore,
  deleteCustomersSuccess,
  setGroupSuccess,
} = actions

// Other code such as selectors can use the imported `RootState` type
export const selectCustomers = (state: RootState) => state.customers

export default reducer

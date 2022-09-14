import { createSlice } from "@reduxjs/toolkit"
import { RootState } from "lib/store"

// Define a type for the slice state
interface OrdersState {
  editOrder: null
  items: any[]
  selected: any[]
  hasMore: boolean
  totalCount: 0
  loadingItems: boolean
  processingCheckout: boolean
  errorLoadingItems: null

  filter: {
    search: ""
    closed: null
    cancelled: null
    delivered: null
    paid: null
    hold: null
    draft: boolean
    // status_id: null,
    // customer_id: null,
    // payment_method_id: null,
    // shipping_method_id: null,
    // grand_total_min: null,
    // grand_total_max: null,
    // date_created_min: null,
    // date_created_max: null,
    // date_closed_min: null,
    // date_closed_max: null
  }
}

// Define the initial state using that type
const initialState: OrdersState = {
  editOrder: null,
  items: [],
  selected: [],
  hasMore: false,
  totalCount: 0,
  loadingItems: false,
  processingCheckout: false,
  errorLoadingItems: null,

  filter: {
    search: "",
    closed: null,
    cancelled: null,
    delivered: null,
    paid: null,
    hold: null,
    draft: false,
    // status_id: null,
    // customer_id: null,
    // payment_method_id: null,
    // shipping_method_id: null,
    // grand_total_min: null,
    // grand_total_max: null,
    // date_created_min: null,
    // date_created_max: null,
    // date_closed_min: null,
    // date_closed_max: null
  },
}

const { actions, reducer } = createSlice({
  name: "orders",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    requestOrders: state => {
      state.loadingItems = true
    },
    receiveOrders: (state, { payload: { has_more, total_count, data } }) => {
      state.loadingItems = false
      state.hasMore = has_more
      state.totalCount = total_count
      state.items = data
    },
    receiveOrdersError: (state, { payload }) => {
      state.loadingItems = false
      state.errorLoadingItems = payload
    },
    selectOrder: (state, { payload }) => {
      state.selected = [...state.selected, payload]
    },
    deselectOrder: (state, { payload }) => {
      state.selected = state.selected.filter(id => id !== payload)
    },
    deselectAllOrder: state => {
      state.selected = []
    },
    selectAllOrder: state => {
      let selected = state.items.map(item => item.id)

      state.selected = selected
    },
    setFilter: (state, { payload }) => {
      const newFilter = { ...state.filter, ...payload }

      state.filter = newFilter
    },
    requestMoreOrders: state => {
      state.loadingItems = true
    },
    receiveOrdersMore: (
      state,
      { payload: { has_more, total_count, data } }
    ) => {
      state.loadingItems = false
      state.hasMore = has_more
      state.totalCount = total_count
      state.items = [...state.items, ...data]
    },
    requestOrder: () => {},
    receiveOrder: (state, { payload }) => {
      state.editOrder = payload
    },
    requestOrderCheckout: state => {
      state.processingCheckout = true
    },
    receiveOrderCheckout: state => {
      state.processingCheckout = false
    },
    failOrderCheckout: state => {
      state.processingCheckout = false
    },
    requestOrderUpdate: () => {},
    receiveOrderUpdate: () => {},
    failOrderUpdate: () => {},
    requestBulkUpdate: () => {},
    receiveBulkUpdate: () => {},
    errorBilkUpdate: () => {
      // TODO: Spelling mistake
    },
    deleteOrdersSuccess: () => {},
    createOrdersSuccess: () => {},
  },
})

export const {
  requestOrders,
  receiveOrders,
  receiveOrdersError,
  selectOrder,
  deselectOrder,
  deselectAllOrder,
  selectAllOrder,
  setFilter,
  requestMoreOrders,
  receiveOrdersMore,
  requestOrder,
  receiveOrder,
  requestOrderCheckout,
  receiveOrderCheckout,
  failOrderCheckout,
  requestOrderUpdate,
  receiveOrderUpdate,
  failOrderUpdate,
  requestBulkUpdate,
  receiveBulkUpdate,
  errorBilkUpdate,
  deleteOrdersSuccess,
  createOrdersSuccess,
} = actions

// Other code such as selectors can use the imported `RootState` type
export const select = (state: RootState) => state

export default reducer

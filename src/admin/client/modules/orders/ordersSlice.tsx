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
  reducers: {},
})

export const {} = actions

// Other code such as selectors can use the imported `RootState` type
export const select = (state: RootState) => state

export default reducer

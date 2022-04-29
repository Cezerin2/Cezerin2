import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import api from "lib/api"
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

export const ordersSlice = createSlice({
  name: "orders",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    requestOrder: state => {},
    receiveOrder: (state, { payload }: PayloadAction<any>) => {
      state.editOrder = payload
    },
    clearOrderDetails: state => {
      return receiveOrder(null)
    },
    requestOrders: state => {
      state.loadingItems = true
    },
    requestMoreOrders: state => {
      state.loadingItems = true
    },
    receiveOrdersMore: (
      state,
      {
        payload: { has_more, total_count, data },
      }: PayloadAction<{ has_more; total_count; data }>
    ) => {
      state.loadingItems = false
      state.hasMore = has_more
      state.totalCount = total_count
      state.items = [...state.items, ...data]
    },
    receiveOrders: (
      state,
      {
        payload: { has_more, total_count, data },
      }: PayloadAction<{ has_more; total_count; data }>
    ) => {
      state.loadingItems = false
      state.hasMore = has_more
      state.totalCount = total_count
      state.items = data
    },
    receiveOrdersError: (state, { payload }: PayloadAction<any>) => {
      state.loadingItems = false
      state.errorLoadingItems = payload
    },
    requestOrderCheckout: state => {
      state.processingCheckout = true
    },
    receiveOrderCheckout: state => {
      state.processingCheckout = false
    },
    failOrderCheckout: (state, { payload }: PayloadAction<any>) => {
      state.processingCheckout = false
    },
    selectOrder: (state, { payload }: PayloadAction<string>) => {
      state.selected = [...state.selected, payload]
    },
    deselectOrder: (state, { payload }: PayloadAction<string>) => {
      state.selected = state.selected.filter(id => id !== payload)
    },
    deselectAllOrder: state => {
      state.selected = []
    },
    selectAllOrder: state => {
      let selected = state.items.map(item => item.id)

      state.selected = selected
    },
    setFilter: (state, { payload }: PayloadAction<any>) => {
      const newFilter = { ...state.filter, ...payload }

      state.filter = newFilter
    },
    requestBulkUpdate: () => {},
    receiveBulkUpdate: () => {},
    errorBilkUpdate: () => {
      // TODO: Spelling mistake
    },
    deleteOrdersSuccess: () => {},
    createOrdersSuccess: () => {},
    requestOrderUpdate: () => {},
    receiveOrderUpdate: () => {},
    failOrderUpdate: (state, { payload }: PayloadAction<any>) => {},
  },
})

export const {
  requestOrder,
  receiveOrder,
  clearOrderDetails,
  requestOrders,
  requestMoreOrders,
  receiveOrdersMore,
  receiveOrders,
  receiveOrdersError,
  requestOrderCheckout,
  receiveOrderCheckout,
  failOrderCheckout,
  selectOrder,
  deselectOrder,
  deselectAllOrder,
  selectAllOrder,
  setFilter,
  requestBulkUpdate,
  receiveBulkUpdate,
  errorBilkUpdate,
  deleteOrdersSuccess,
  createOrdersSuccess,
  requestOrderUpdate,
  receiveOrderUpdate,
  failOrderUpdate,
} = ordersSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectOrders = (state: RootState) => state.orders

export default ordersSlice.reducer

const getFilter = (state, offset = 0) => {
  const filterState = state.orders.filter
  let filter = {
    limit: 50,
    offset: offset,
  }

  if (filterState.search !== null && filterState.search !== "") {
    filter.search = filterState.search
  }

  if (filterState.closed !== null) {
    filter.closed = filterState.closed
  }

  if (filterState.cancelled !== null) {
    filter.cancelled = filterState.cancelled
  }

  if (filterState.delivered !== null) {
    filter.delivered = filterState.delivered
  }

  if (filterState.paid !== null) {
    filter.paid = filterState.paid
  }

  if (filterState.hold !== null) {
    filter.hold = filterState.hold
  }

  if (filterState.draft !== null) {
    filter.draft = filterState.draft
  }

  if (state.orderStatuses.selectedId) {
    filter.status_id = state.orderStatuses.selectedId
  }

  return filter
}

export function fetchOrders() {
  return (dispatch, getState) => {
    const state = getState()
    if (!state.orders.loadingItems) {
      dispatch(requestOrders())
      dispatch(deselectAllOrder())

      let filter = getFilter(state)

      return api.orders
        .list(filter)
        .then(({ status, json }) => {
          dispatch(receiveOrders(json))
        })
        .catch(error => {
          dispatch(receiveOrdersError(error))
        })
    }
  }
}

export function fetchMoreOrders() {
  return (dispatch, getState) => {
    const state = getState()
    if (!state.orders.loadingItems) {
      dispatch(requestMoreOrders())

      let filter = getFilter(state, state.orders.items.length)

      return api.orders
        .list(filter)
        .then(({ status, json }) => {
          dispatch(receiveOrdersMore(json))
        })
        .catch(error => {
          dispatch(receiveOrdersError(error))
        })
    }
  }
}

export function bulkUpdate(dataToSet) {
  return (dispatch, getState) => {
    dispatch(requestBulkUpdate())
    const state = getState()
    let promises = state.orders.selected.map(orderId =>
      api.orders.update(orderId, dataToSet)
    )

    return Promise.all(promises)
      .then(values => {
        dispatch(receiveBulkUpdate())
        dispatch(fetchOrders())
      })
      .catch(error => {
        dispatch(errorBilkUpdate())
        console.log(error)
      })
  }
}

export function deleteOrders() {
  return (dispatch, getState) => {
    const state = getState()
    let promises = state.orders.selected.map(orderId =>
      api.orders.delete(orderId)
    )

    return Promise.all(promises)
      .then(values => {
        dispatch(deleteOrdersSuccess())
        dispatch(deselectAllOrder())
        dispatch(fetchOrders())
      })
      .catch(error => {
        console.log(error)
      })
  }
}

export function deleteCurrentOrder() {
  return (dispatch, getState) => {
    const state = getState()
    let order = state.orders.editOrder

    if (order && order.id) {
      return api.orders.delete(order.id).catch(error => {
        console.log(error)
      })
    }
  }
}

const fetchOrderAdditionalData = order => {
  const hasCustomer = order.customer_id && order.customer_id.length > 0
  const hasShippingMethod =
    order.shipping_method_id && order.shipping_method_id.length > 0
  const productIds =
    order && order.items && order.items.length > 0
      ? order.items.filter(item => item.product_id).map(item => item.product_id)
      : []
  const productFilter = {
    ids: productIds,
    fields: "images,enabled,stock_quantity,variants,options",
  }

  return Promise.all([
    productIds.length > 0 ? api.products.list(productFilter) : null,
    hasCustomer ? api.customers.retrieve(order.customer_id) : null,
    hasShippingMethod
      ? api.shippingMethods.retrieve(order.shipping_method_id)
      : null,
  ])
    .then(([productsResponse, customerResponse, methodResponse]) => {
      if (productsResponse) {
        const products = productsResponse.json.data
        const newItems = order.items.map(item => {
          item.product = products.find(p => p.id === item.product_id)
          return item
        })
        order.items = newItems
      }
      order.customer = customerResponse ? customerResponse.json : null
      order.shipping_method_details = methodResponse
        ? methodResponse.json
        : null

      return order
    })
    .catch(error => error)
}

export function fetchOrder(orderId) {
  return (dispatch, getState) => {
    dispatch(requestOrder())

    return api.orders
      .retrieve(orderId)
      .then(orderResponse => orderResponse.json)
      .then(fetchOrderAdditionalData)
      .then(order => {
        dispatch(receiveOrder(order))
      })
      .catch(error => {})
  }
}

export function deleteOrderItem(orderId, orderItemId) {
  return (dispatch, getState) => {
    const state = getState()

    api.orders.items
      .delete(orderId, orderItemId)
      .then(orderResponse => orderResponse.json)
      .then(fetchOrderAdditionalData)
      .then(order => {
        dispatch(receiveOrder(order))
      })
      .catch(error => {})
  }
}

export function addOrderItem(orderId, productId) {
  return (dispatch, getState) => {
    const state = getState()

    api.orders.items
      .create(orderId, {
        product_id: productId,
        variant_id: null,
        quantity: 1,
      })
      .then(orderResponse => orderResponse.json)
      .then(fetchOrderAdditionalData)
      .then(order => {
        dispatch(receiveOrder(order))
      })
      .catch(error => {})
  }
}

export function updateOrderItem(orderId, orderItemId, quantity, variantId) {
  return (dispatch, getState) => {
    const state = getState()

    api.orders.items
      .update(orderId, orderItemId, {
        quantity: quantity,
        variant_id: variantId,
      })
      .then(orderResponse => orderResponse.json)
      .then(fetchOrderAdditionalData)
      .then(order => {
        dispatch(receiveOrder(order))
      })
      .catch(error => {})
  }
}

export function updateOrder(data) {
  return (dispatch, getState) => {
    dispatch(requestOrderUpdate())

    return api.orders
      .update(data.id, data)
      .then(orderResponse => orderResponse.json)
      .then(fetchOrderAdditionalData)
      .then(order => {
        dispatch(receiveOrderUpdate())
        dispatch(receiveOrder(order))
      })
      .catch(error => {
        dispatch(failOrderUpdate(error))
      })
  }
}

export function closeOrder(orderId) {
  return (dispatch, getState) => {
    return api.orders
      .close(orderId)
      .then(orderResponse => orderResponse.json)
      .then(fetchOrderAdditionalData)
      .then(order => {
        dispatch(receiveOrder(order))
      })
      .catch(error => {})
  }
}

export function cancelOrder(orderId) {
  return (dispatch, getState) => {
    return api.orders
      .cancel(orderId)
      .then(orderResponse => orderResponse.json)
      .then(fetchOrderAdditionalData)
      .then(order => {
        dispatch(receiveOrder(order))
      })
      .catch(error => {})
  }
}

export function updateShippingAddress(orderId, address) {
  return (dispatch, getState) => {
    return api.orders
      .updateShippingAddress(orderId, address)
      .then(orderResponse => orderResponse.json)
      .then(fetchOrderAdditionalData)
      .then(order => {
        dispatch(receiveOrder(order))
      })
      .catch(error => {})
  }
}

export function createOrder(history) {
  return (dispatch, getState) => {
    const state = getState()
    return api.orders
      .create({ draft: true, referrer_url: "admin" })
      .then(orderResponse => {
        const orderId = orderResponse.json.id
        dispatch(createOrdersSuccess())
        history.push(`/admin/order/${orderId}`)
      })
      .catch(error => {})
  }
}

export function checkoutOrder(orderId) {
  return (dispatch, getState) => {
    dispatch(requestOrderCheckout())
    return api.orders
      .checkout(orderId)
      .then(orderResponse => orderResponse.json)
      .then(fetchOrderAdditionalData)
      .then(order => {
        dispatch(receiveOrderCheckout())
        dispatch(receiveOrder(order))
      })
      .catch(error => {
        dispatch(failOrderCheckout(error))
      })
  }
}

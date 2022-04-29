import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import api from "lib/api"
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

export const customersSlice = createSlice({
  name: "customers",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    requestCustomer: () => {},
    receiveCustomer: (state, { payload }: PayloadAction<any>) => {
      state.editCustomer = payload
    },
    clearCustomerDetails: state => {
      return receiveCustomer(null)
    },
    requestCustomers: state => {
      state.loadingItems = true
    },
    requestMoreCustomers: state => {
      state.loadingItems = true
    },
    receiveCustomersMore: (
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
    receiveCustomers: (
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
    receiveCustomersError: (state, { payload }: PayloadAction<any>) => {
      state.loadingItems = false
      state.errorLoadingItems = payload
    },
    selectCustomer: (state, { payload }: PayloadAction<string>) => {
      state.selected = [...state.selected, payload]
    },
    deselectCustomer: (state, { payload }: PayloadAction<string>) => {
      state.selected = state.selected.filter(id => id !== payload)
    },
    deselectAllCustomer: state => {
      state.selected = []
    },
    selectAllCustomer: state => {
      let selected = state.items.map(item => item.id)
      state.selected = selected
    },
    setFilterSearch: (state, { payload }: PayloadAction<any>) => {
      state.search = payload
    },
    deleteCustomersSuccess: () => {},
    setGroupSuccess: () => {},
  },
})

export const {
  requestCustomer,
  receiveCustomer,
  clearCustomerDetails,
  requestCustomers,
  requestMoreCustomers,
  receiveCustomersMore,
  receiveCustomers,
  receiveCustomersError,
  selectCustomer,
  deselectCustomer,
  deselectAllCustomer,
  selectAllCustomer,
  setFilterSearch,
  deleteCustomersSuccess,
  setGroupSuccess,
} = customersSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectCustomers = (state: RootState) => state.customers

export default customersSlice.reducer

const push = () => {}

const getFilter = (state, offset = 0) => {
  let filter = {
    limit: 50,
    offset: offset,
  }

  if (state.customers.search && state.customers.search !== "") {
    filter.search = state.customers.search
  }

  if (state.customerGroups.selectedId) {
    filter.group_id = state.customerGroups.selectedId
  }

  return filter
}

export function fetchCustomers() {
  return (dispatch, getState) => {
    const state = getState()
    if (!state.customers.loadingItems) {
      dispatch(requestCustomers())
      dispatch(deselectAllCustomer())

      let filter = getFilter(state)

      return api.customers
        .list(filter)
        .then(({ status, json }) => {
          dispatch(receiveCustomers(json))
        })
        .catch(error => {
          dispatch(receiveCustomersError(error))
        })
    }
  }
}

export function fetchMoreCustomers() {
  return (dispatch, getState) => {
    const state = getState()
    if (!state.customers.loadingItems) {
      dispatch(requestMoreCustomers())

      let filter = getFilter(state, state.customers.items.length)

      return api.customers
        .list(filter)
        .then(({ status, json }) => {
          dispatch(receiveCustomersMore(json))
        })
        .catch(error => {
          dispatch(receiveCustomersError(error))
        })
    }
  }
}

export function deleteCustomers() {
  return (dispatch, getState) => {
    const state = getState()
    let promises = state.customers.selected.map(customerId =>
      api.customers.delete(customerId)
    )

    return Promise.all(promises)
      .then(values => {
        dispatch(deleteCustomersSuccess())
        dispatch(deselectAllCustomer())
        dispatch(fetchCustomers())
      })
      .catch(error => {})
  }
}

export function deleteCurrentCustomer() {
  return (dispatch, getState) => {
    const state = getState()
    let customer = state.customers.editCustomer

    if (customer && customer.id) {
      return api.customers.delete(customer.id).catch(error => {
        console.log(error)
      })
    }
  }
}

export function setGroup(group_id) {
  return (dispatch, getState) => {
    const state = getState()
    let promises = state.customers.selected.map(customerId =>
      api.customers.update(customerId, { group_id: group_id })
    )

    return Promise.all(promises)
      .then(values => {
        dispatch(setGroupSuccess())
        dispatch(deselectAllCustomer())
        dispatch(fetchCustomers())
      })
      .catch(error => {})
  }
}

export function updateCustomer(data) {
  return (dispatch, getState) => {
    return api.customers
      .update(data.id, data)
      .then(customerResponse => {
        dispatch(receiveCustomer(customerResponse.json))
      })
      .catch(error => {})
  }
}

export function fetchCustomer(customerId) {
  return (dispatch, getState) => {
    dispatch(requestCustomer())

    return api.customers
      .retrieve(customerId)
      .then(customerResponse => {
        dispatch(receiveCustomer(customerResponse.json))
      })
      .catch(error => {})
  }
}

export function updateAddress(customerId, addressId, data) {
  return (dispatch, getState) => {
    return api.customers
      .updateAddress(customerId, addressId, data)
      .then(customerResponse => {
        dispatch(fetchCustomer(customerId))
      })
      .catch(error => {})
  }
}

export function deleteAddress(customerId, addressId) {
  return (dispatch, getState) => {
    return api.customers
      .deleteAddress(customerId, addressId)
      .then(customerResponse => {
        dispatch(fetchCustomer(customerId))
      })
      .catch(error => {})
  }
}

export function setDefaultBillingAddress(customerId, addressId) {
  return (dispatch, getState) => {
    return api.customers
      .setDefaultBillingAddress(customerId, addressId)
      .then(customerResponse => {
        dispatch(fetchCustomer(customerId))
      })
      .catch(error => {})
  }
}

export function setDefaultShippingAddress(customerId, addressId) {
  return (dispatch, getState) => {
    return api.customers
      .setDefaultShippingAddress(customerId, addressId)
      .then(customerResponse => {
        dispatch(fetchCustomer(customerId))
      })
      .catch(error => {})
  }
}

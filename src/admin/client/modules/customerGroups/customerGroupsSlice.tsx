import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import api from "lib/api"
import { RootState } from "lib/store"
import messages from "lib/text"

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

export const customerGroupsSlice = createSlice({
  name: "customerGroups",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    requestGroups: state => {
      state.isFetching = true
    },
    receiveGroups: (state, { payload }: PayloadAction<any>) => {
      state.isFetching = false
      state.isFetched = true
      state.items = payload
    },
    receiveErrorGroups: (state, { payload }: PayloadAction<any>) => {
      state.errorFetch = payload
    },
    selectGroup: (state, { payload }: PayloadAction<any>) => {
      state.selectedId = payload
    },
    deselectGroup: state => {
      state.selectedId = null
    },
    requestUpdateGroup: (state, { payload }: PayloadAction<any>) => {
      state.isSaving = true
    },
    receiveUpdateGroup: state => {
      state.isSaving = false
    },
    errorUpdateGroup: (state, { payload }: PayloadAction<any>) => {
      state.isSaving = false
      state.errorUpdate = payload
    },
    successCreateGroup: (state, { payload }: PayloadAction<string>) => {},
    successDeleteGroup: (state, { payload }: PayloadAction<string>) => {},
  },
})

export const {
  requestGroups,
  receiveGroups,
  receiveErrorGroups,
  selectGroup,
  deselectGroup,
  requestUpdateGroup,
  receiveUpdateGroup,
  errorUpdateGroup,
  successCreateGroup,
  successDeleteGroup,
} = customerGroupsSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectCustomerGroups = (state: RootState) => state.customerGroups

export default customerGroupsSlice.reducer

function fetchGroups() {
  return dispatch => {
    dispatch(requestGroups())
    return api.customerGroups
      .list()
      .then(({ status, json }) => {
        json = json.sort((a, b) => a.position - b.position)

        json.forEach((element, index, theArray) => {
          if (theArray[index].name === "") {
            theArray[index].name = `<${messages.draft}>`
          }
        })

        dispatch(receiveGroups(json))
      })
      .catch(error => {
        dispatch(receiveErrorGroups(error))
      })
  }
}

function shouldFetchGroups(state) {
  const groups = state.customerGroups
  if (groups.isFetched || groups.isFetching) {
    return false
  } else {
    return true
  }
}

export function fetchGroupsIfNeeded() {
  return (dispatch, getState) => {
    if (shouldFetchGroups(getState())) {
      return dispatch(fetchGroups())
    }
  }
}

export function updateGroup(data) {
  return (dispatch, getState) => {
    dispatch(requestUpdateGroup(data.id))
    return api.customerGroups
      .update(data.id, data)
      .then(({ status, json }) => {
        dispatch(receiveUpdateGroup())
        dispatch(fetchGroups())
      })
      .catch(error => {
        dispatch(errorUpdateGroup(error))
      })
  }
}

export function createGroup(data) {
  return (dispatch, getState) => {
    return api.customerGroups
      .create(data)
      .then(({ status, json }) => {
        dispatch(successCreateGroup(json.id))
        dispatch(fetchGroups())
        dispatch(selectGroup(json.id))
      })
      .catch(error => {
        //dispatch error
        console.log(error)
      })
  }
}

export function deleteGroup(id) {
  return (dispatch, getState) => {
    return api.customerGroups
      .delete(id)
      .then(({ status, json }) => {
        if (status === 200) {
          dispatch(successDeleteGroup(id))
          dispatch(deselectGroup())
          dispatch(fetchGroups())
        } else {
          throw status
        }
      })
      .catch(error => {
        //dispatch error
        console.log(error)
      })
  }
}

import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import api from "lib/api"
import { RootState } from "lib/store"
import messages from "lib/text"
import * as t from "./actionTypes"

// Define a type for the slice state
interface CustomerGroupsState {
  items: []
  isFetched: false
  isFetching: false
  isSaving: false
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
    // Use the PayloadAction type to declare the contents of `action.payload`
    incrementByAmount: (state, action: PayloadAction<number>) => {
      state.value += action.payload
    },
  },
})

export const {} = customerGroupsSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectCustomerGroups = (state: RootState) => state.apps

export default customerGroupsSlice.reducer

function requestGroups() {
  return {
    type: t.GROUPS_REQUEST,
  }
}

function receiveGroups(items) {
  return {
    type: t.GROUPS_RECEIVE,
    items,
  }
}

function receiveErrorGroups(error) {
  return {
    type: t.GROUPS_FAILURE,
    error,
  }
}

export function selectGroup(id) {
  return {
    type: t.GROUPS_SELECT,
    selectedId: id,
  }
}

export function deselectGroup() {
  return {
    type: t.GROUPS_DESELECT,
  }
}

function requestUpdateGroup(id) {
  return {
    type: t.GROUP_UPDATE_REQUEST,
  }
}

function receiveUpdateGroup() {
  return {
    type: t.GROUP_UPDATE_SUCCESS,
  }
}

function errorUpdateGroup(error) {
  return {
    type: t.GROUP_UPDATE_FAILURE,
    error,
  }
}

function successCreateGroup(id) {
  return {
    type: t.GROUP_CREATE_SUCCESS,
  }
}

function successDeleteGroup(id) {
  return {
    type: t.GROUP_DELETE_SUCCESS,
  }
}

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

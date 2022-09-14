import { createSlice } from "@reduxjs/toolkit"
import { RootState } from "lib/store"

// Define a type for the slice state
interface ProductCategoriesState {
  items: any[]
  isFetched: boolean
  isFetching: boolean
  isSaving: boolean
  uploadingImage: boolean
  errorFetch: null
  errorUpdate: null
  selectedId: "all"
}

// Define the initial state using that type
const initialState: ProductCategoriesState = {
  items: [],
  isFetched: false,
  isFetching: false,
  isSaving: false,
  uploadingImage: false,
  errorFetch: null,
  errorUpdate: null,
  selectedId: "all",
}

const { actions, reducer } = createSlice({
  name: "productCategories",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    requestCategories: state => {
      state.isFetching = true
    },
    receiveCategories: (state, { payload }) => {
      state.isFetching = false
      state.isFetched = true
      state.items = payload
    },
    receiveErrorCategories: (state, { payload }) => {
      state.errorFetch = payload
    },
    selectCategory: (state, { payload }) => {
      state.selectedId = payload
    },
    deselectCategory: state => {
      state.selectedId = null
    },
    requestUpdateCategory: state => {
      state.isSaving = true
    },
    receiveUpdateCategory: state => {
      state.isSaving = false
    },
    errorUpdateCategory: (state, { payload }) => {
      state.isSaving = false
      state.errorUpdate = payload
    },
    imageUploadStart: state => {
      state.uploadingImage = true
    },
    imageUploadEnd: state => {
      state.uploadingImage = false
    },
    successCreateCategory: () => {},
    successDeleteCategory: () => {},
    successMoveUpDownCategory: () => {},
    // successReplaceCategory: () => {},
  },
})

export const {
  requestCategories,
  receiveCategories,
  receiveErrorCategories,
  selectCategory,
  deselectCategory,
  requestUpdateCategory,
  receiveUpdateCategory,
  errorUpdateCategory,
  imageUploadStart,
  imageUploadEnd,
  successCreateCategory,
  successDeleteCategory,
  successMoveUpDownCategory,
} = actions

// Other code such as selectors can use the imported `RootState` type
export const select = (state: RootState) => state

export default reducer

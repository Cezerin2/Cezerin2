import { createSlice } from "@reduxjs/toolkit"
import { RootState } from "lib/store"

// Define a type for the slice state
interface ProductsState {
  editProductImages: null
  editProductOptions: null
  editProductVariants: null
  editProduct: null
  items: any[]
  selected: any[]
  hasMore: boolean
  totalCount: 0

  isUpdating: boolean
  loadingItems: boolean
  uploadingImages: boolean

  errorFetchEdit: null
  errorLoadingItems: null
  errorUpdate: null

  filter: {
    search: ""
    enabled: null
    discontinued: false
    onSale: null
    stockStatus: null
  }
}

// Define the initial state using that type
const initialState: ProductsState = {
  editProductImages: null,
  editProductOptions: null,
  editProductVariants: null,
  editProduct: null,
  items: [],
  selected: [],
  hasMore: false,
  totalCount: 0,

  isUpdating: false,
  loadingItems: false,
  uploadingImages: false,

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

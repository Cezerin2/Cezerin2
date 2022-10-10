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

  errorFetchEdit: null,
  errorLoadingItems: null,
  errorUpdate: null,

  filter: {
    search: "",
    enabled: null,
    discontinued: false,
    onSale: null,
    stockStatus: null,
  },
}

const { actions, reducer } = createSlice({
  name: "products",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    requestProduct: () => {},
    receiveProduct: (state, { payload }) => {
      state.editProduct = payload
    },
    receiveProductError: (state, { payload }) => {
      state.errorFetchEdit = payload
    },
    receiveImages: (state, { payload }) => {
      state.editProductImages = payload
    },
    receiveVariants: (state, { payload }) => {
      state.editProductVariants = payload
    },
    receiveOptions: (state, { payload }) => {
      state.editProductOptions = payload
    },
    cancelProductEdit: state => {
      state.isUpdating = false
      state.editProduct = null
      state.editProductImages = null
      state.editProductOptions = null
      state.editProductVariants = null
    },
    requestProducts: state => {
      state.loadingItems = true
    },
    requestMoreProducts: state => {
      state.loadingItems = true
    },
    receiveProductsMore: (
      state,
      { payload: { has_more, total_count, data } }
    ) => {
      state.loadingItems = false
      state.hasMore = has_more
      state.totalCount = total_count
      state.items = [...state.items, ...data]
    },
    receiveProducts: (state, { payload: { has_more, total_count, data } }) => {
      state.loadingItems = false
      state.hasMore = has_more
      state.totalCount = total_count
      state.items = data
    },
    receiveProductsError: (state, { payload }) => {
      state.errorLoadingItems = payload
    },
    selectProduct: (state, { payload }) => {
      state.selected = [...state.selected, payload]
    },
    deselectProduct: (state, { payload }) => {
      state.selected = state.selected.filter(id => id !== payload)
    },
    deselectAllProduct: state => {
      state.selected = []
    },
    selectAllProduct: state => {
      let selected = state.items.map(item => item.id)

      state.selected = selected
    },
    setFilter: (state, { payload }) => {
      const newFilter = { ...state.filter, ...payload }

      state.filter = newFilter
    },
    deleteProductsSuccess: () => {},
    setCategorySuccess: () => {},
    requestUpdateProduct: state => {
      state.isUpdating = true
    },
    receiveUpdateProduct: (state, { payload }) => {
      state.isUpdating = false
      state.editProduct = payload
    },
    errorUpdateProduct: () => {},
    successCreateProduct: () => {},
    imagesUploadStart: state => {
      state.uploadingImages = true
    },
    imagesUploadEnd: state => {
      state.uploadingImages = false
    },
  },
})

export const {
  requestProduct,
  receiveProduct,
  receiveProductError,
  receiveImages,
  receiveVariants,
  receiveOptions,
  cancelProductEdit,
  requestProducts,
  requestMoreProducts,
  receiveProductsMore,
  receiveProducts,
  receiveProductsError,
  selectProduct,
  deselectProduct,
  deselectAllProduct,
  selectAllProduct,
  setFilter,
  deleteProductsSuccess,
  setCategorySuccess,
  requestUpdateProduct,
  receiveUpdateProduct,
  errorUpdateProduct,
  successCreateProduct,
  imagesUploadStart,
  imagesUploadEnd,
} = actions

// Other code such as selectors can use the imported `RootState` type
export const selectProducts = (state: RootState) => state.products

export default reducer

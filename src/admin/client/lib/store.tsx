import { configureStore } from "@reduxjs/toolkit"
import apps from "modules/apps/appsSlice"
import customerGroups from "modules/customerGroups/customerGroupsSlice"
import customers from "modules/customers/customersSlice"
import files from "modules/files/filesSlice"
import orders from "modules/orders/ordersSlice"
import orderStatuses from "modules/orderStatuses/orderStatusesSlice"
import pages from "modules/pages/pagesSlice"
import productCategories from "modules/productCategories/productCategoriesSlice"
import products from "modules/products/productsSlice"
import settings from "modules/settings/settingsSlice"
import { combineReducers } from "redux"
import { reducer as formReducer } from "redux-form"

const reducer = combineReducers({
  form: formReducer,
  productCategories,
  products,
  settings,
  customerGroups,
  customers,
  orders,
  orderStatuses,
  pages,
  apps,
  files,
})

export const store = configureStore({
  reducer,
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

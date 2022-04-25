import { configureStore } from "@reduxjs/toolkit"
import apps from "modules/apps/reducer"
import customerGroups from "modules/customerGroups/reducer"
import customers from "modules/customers/reducer"
import files from "modules/files/reducer"
import orders from "modules/orders/reducer"
import orderStatuses from "modules/orderStatuses/reducer"
import pages from "modules/pages/reducer"
import productCategories from "modules/productCategories/reducer"
import products from "modules/products/reducer"
import settings from "modules/settings/reducer"
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

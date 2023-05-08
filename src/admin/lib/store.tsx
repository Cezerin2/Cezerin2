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

export const store = configureStore({
  reducer: {
    apps,
    customerGroups,
    customers,
    files,
    orders,
    orderStatuses,
    pages,
    productCategories,
    products,
    settings,
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {apps: AppsState}
export type AppDispatch = typeof store.dispatch

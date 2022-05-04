import { combineReducers, configureStore } from "@reduxjs/toolkit"

const reducer = combineReducers({})

export const store = configureStore({
  reducer,
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {apps: AppsState}
export type AppDispatch = typeof store.dispatch

import { createSlice } from "@reduxjs/toolkit"
import { RootState } from "lib/store"

// Define a type for the slice state
interface SettingsState {
  exportInProcess: boolean
  installInProcess: boolean
  settings: {
    language: "en"
    currency_code: "USD"
    currency_symbol: "$"
    currency_format: "${amount}"
    thousand_separator: ""
    decimal_separator: "."
    decimal_number: 2
    timezone: "Asia/Singapore"
    date_format: "MMMM D, YYYY"
    time_format: "h:mm a"
    weight_unit: "kg"
    length_unit: "cm"
  }
  emailSettings: null
  importSettings: null
  emailTemplate: null
  checkoutField: null
  checkoutFields: []
  commerceSettings: null
  shippingMethods: []
  paymentMethods: []
  shippingMethodEdit: {}
  paymentMethodEdit: {}
  paymentGatewayEdit: {}
  tokens: []
  tokenEdit: {}
  newToken: null
  redirects: []
  redirectEdit: {}
  webhooks: []
  webhookEdit: {}
  themeSettings: null
  themeSettingsSchema: null
}

// Define the initial state using that type
const initialState: SettingsState = {
  exportInProcess: false,
  installInProcess: false,
  settings: {
    language: "en",
    currency_code: "USD",
    currency_symbol: "$",
    currency_format: "${amount}",
    thousand_separator: "",
    decimal_separator: ".",
    decimal_number: 2,
    timezone: "Asia/Singapore",
    date_format: "MMMM D, YYYY",
    time_format: "h:mm a",
    weight_unit: "kg",
    length_unit: "cm",
  },
  emailSettings: null,
  importSettings: null,
  emailTemplate: null,
  checkoutField: null,
  checkoutFields: [],
  commerceSettings: null,
  shippingMethods: [],
  paymentMethods: [],
  shippingMethodEdit: {},
  paymentMethodEdit: {},
  paymentGatewayEdit: {},
  tokens: [],
  tokenEdit: {},
  newToken: null,
  redirects: [],
  redirectEdit: {},
  webhooks: [],
  webhookEdit: {},
  themeSettings: null,
  themeSettingsSchema: null,
}

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

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
  name: "settings",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    exportRequest: state => {
      state.exportInProcess = true
    },
    exportReceive: state => {
      state.exportInProcess = false
    },
    installRequest: state => {
      state.installInProcess = true
    },
    installReceive: state => {
      state.installInProcess = false
    },
    receiveSettings: (state, { payload }) => {
      state.settings = payload
    },
    receiveEmailSettings: (state, { payload }) => {
      state.emailSettings = payload
    },
    receiveImportSettings: (state, { payload }) => {
      state.importSettings = payload
    },
    requestEmailTemplate: state => {
      state.emailTemplate = null
    },
    receiveEmailTemplate: (state, { payload }) => {
      state.emailTemplate = payload
    },
    receiveShippingMethods: (state, { payload }) => {
      state.shippingMethods = payload
    },
    receivePaymentMethods: (state, { payload }) => {
      state.paymentMethods = payload
    },
    receiveShippingMethod: (state, { payload }) => {
      state.shippingMethodEdit = payload
    },
    receivePaymentMethod: (state, { payload }) => {
      state.paymentMethodEdit = payload
    },
    receivePaymentGateway: (state, { payload }) => {
      state.paymentGatewayEdit = payload
    },
    requestCheckoutField: state => {
      state.checkoutField = null
    },
    receiveCheckoutField: (state, { payload }) => {
      state.checkoutField = payload
    },
    requestCommerceSettings: state => {
      state.commerceSettings = null
    },
    receiveCommerceSettings: (state, { payload }) => {
      state.commerceSettings = payload
    },
    receiveCheckoutFields: (state, { payload }) => {
      state.checkoutFields = payload
    },
    receiveTokens: (state, { payload }) => {
      state.tokens = payload
    },
    receiveToken: (state, { payload }) => {
      state.tokenEdit = payload
      state.newToken = null
    },
    receiveNewToken: (state, { payload }) => {
      state.newToken = payload
    },
    receiveThemeSettings: (state, { payload }) => {
      state.themeSettings = payload
    },
    receiveThemeSettingsSchema: (state, { payload }) => {
      state.themeSettingsSchema = payload
    },
    receiveRedirects: (state, { payload }) => {
      state.redirects = payload
    },
    receiveRedirect: (state, { payload }) => {
      state.redirectEdit = payload
    },
    receiveWebhooks: (state, { payload }) => {
      state.webhooks = payload
    },
    receiveWebhook: (state, { payload }) => {
      state.webhookEdit = payload
    },
  },
})

export const {
  exportRequest,
  exportReceive,
  installRequest,
  installReceive,
  receiveSettings,
  receiveEmailSettings,
  receiveImportSettings,
  requestEmailTemplate,
  receiveEmailTemplate,
  receiveShippingMethods,
  receivePaymentMethods,
  receiveShippingMethod,
  receivePaymentMethod,
  receivePaymentGateway,
  requestCheckoutField,
  receiveCheckoutField,
  requestCommerceSettings,
  receiveCommerceSettings,
  receiveCheckoutFields,
  receiveTokens,
  receiveToken,
  receiveNewToken,
  receiveThemeSettings,
  receiveThemeSettingsSchema,
  receiveRedirects,
  receiveRedirect,
  receiveWebhooks,
  receiveWebhook,
} = actions

// Other code such as selectors can use the imported `RootState` type
export const select = (state: RootState) => state

export default reducer

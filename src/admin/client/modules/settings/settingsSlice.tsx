import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import api from "lib/api"
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

export const settingsSlice = createSlice({
  name: "settings",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    // Use the PayloadAction type to declare the contents of `action.payload`
    incrementByAmount: (state, action: PayloadAction<number>) => {
      state.value += action.payload
    },
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
    receiveSettings: (state, { payload }: PayloadAction<any>) => {
      state.settings = payload
    },
    receiveEmailSettings: (state, { payload }: PayloadAction<any>) => {
      state.emailSettings = payload
    },
    receiveImportSettings: (state, { payload }: PayloadAction<any>) => {
      state.importSettings = payload
    },
    receiveEmailTemplate: (state, { payload }: PayloadAction<any>) => {
      state.emailTemplate = payload
    },
    requestEmailTemplate: state => {
      state.emailTemplate = null
    },
    receiveCheckoutFields: (state, { payload }: PayloadAction<any>) => {
      state.checkoutFields = payload
    },
    receiveCheckoutField: (state, { payload }: PayloadAction<any>) => {
      state.checkoutField = payload
    },
    requestCheckoutField: state => {
      state.checkoutField = null
    },
    receiveCommerceSettings: (state, { payload }: PayloadAction<any>) => {
      state.commerceSettings = payload
    },
    requestCommerceSettings: state => {
      state.commerceSettings = null
    },
    receiveShippingMethods: (state, { payload }: PayloadAction<any>) => {
      state.shippingMethods = payload
    },
    receivePaymentMethods: (state, { payload }: PayloadAction<any>) => {
      state.paymentMethods = payload
    },
    receivePaymentGateway: (state, { payload }: PayloadAction<any>) => {
      state.paymentGatewayEdit = payload
    },
    receiveShippingMethod: (state, { payload }: PayloadAction<any>) => {
      state.shippingMethodEdit = payload
    },
    receivePaymentMethod: (state, { payload }: PayloadAction<any>) => {
      state.paymentMethodEdit = payload
    },
    receiveTokens: (state, { payload }: PayloadAction<any>) => {
      state.tokens = payload
    },
    receiveToken: (state, { payload }: PayloadAction<any>) => {
      state.tokenEdit = payload
      state.newToken = null
    },
    receiveNewToken: (state, { payload }: PayloadAction<any>) => {
      state.newToken = payload
    },
    receiveThemeSettings: (state, { payload }: PayloadAction<any>) => {
      state.themeSettings = payload
    },
    receiveThemeSettingsSchema: (state, { payload }: PayloadAction<any>) => {
      state.themeSettingsSchema = payload
    },
    receiveRedirects: (state, { payload }: PayloadAction<any>) => {
      state.redirects = payload
    },
    receiveRedirect: (state, { payload }: PayloadAction<any>) => {
      state.redirectEdit = payload
    },
    receiveWebhooks: (state, { payload }: PayloadAction<any>) => {
      state.webhooks = payload
    },
    receiveWebhook: (state, { payload }: PayloadAction<any>) => {
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
  receiveEmailTemplate,
  requestEmailTemplate,
  receiveCheckoutFields,
  receiveCheckoutField,
  requestCheckoutField,
  receiveCommerceSettings,
  requestCommerceSettings,
  receiveShippingMethods,
  receivePaymentMethods,
  receivePaymentGateway,
  receiveShippingMethod,
  receivePaymentMethod,
  receiveTokens,
  receiveToken,
  receiveNewToken,
  receiveThemeSettings,
  receiveThemeSettingsSchema,
  receiveRedirects,
  receiveRedirect,
  receiveWebhooks,
  receiveWebhook,
} = settingsSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectSettings = (state: RootState) => state.settings

export default settingsSlice.reducer

export function fetchSettings() {
  return (dispatch, getState) => {
    // API can be not init on app start
    if (api) {
      return api.settings
        .retrieve()
        .then(({ status, json }) => {
          dispatch(receiveSettings(json))
        })
        .catch(error => {})
    }
  }
}

export function fetchEmailSettings() {
  return (dispatch, getState) => {
    return api.settings
      .retrieveEmailSettings()
      .then(({ status, json }) => {
        dispatch(receiveEmailSettings(json))
      })
      .catch(error => {})
  }
}

export function fetchImportSettings() {
  return (dispatch, getState) => {
    return api.settings
      .retrieveImportSettings()
      .then(({ status, json }) => {
        dispatch(receiveImportSettings(json))
      })
      .catch(error => {})
  }
}

export function deleteLogo() {
  return (dispatch, getState) => {
    return api.settings
      .deleteLogo()
      .then(({ status, json }) => {
        if (status === 200) {
          dispatch(fetchSettings())
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

export function updateSettings(settings) {
  return (dispatch, getState) => {
    delete settings.logo_file
    return api.settings
      .update(settings)
      .then(({ status, json }) => {
        dispatch(receiveSettings(json))
      })
      .catch(error => {})
  }
}

export function updateEmailSettings(emailSettings) {
  return (dispatch, getState) => {
    return api.settings
      .updateEmailSettings(emailSettings)
      .then(({ status, json }) => {
        dispatch(receiveEmailSettings(json))
      })
      .catch(error => {})
  }
}

export function updateImportSettings(importSettings) {
  return (dispatch, getState) => {
    return api.settings
      .updateImportSettings(importSettings)
      .then(({ status, json }) => {
        dispatch(receiveImportSettings(json))
      })
      .catch(error => {})
  }
}

export function fetchEmailTemplate(templateName) {
  return (dispatch, getState) => {
    dispatch(requestEmailTemplate())
    return api.settings
      .retrieveEmailTemplate(templateName)
      .then(({ status, json }) => {
        json.templateName = templateName
        dispatch(receiveEmailTemplate(json))
      })
      .catch(error => {})
  }
}

export function updateEmailTemplate(emailTemplate) {
  return (dispatch, getState) => {
    return api.settings
      .updateEmailTemplate(emailTemplate.templateName, emailTemplate)
      .then(({ status, json }) => {
        json.templateName = templateName
        dispatch(receiveEmailTemplate(json))
      })
      .catch(error => {})
  }
}

export function fetchCheckoutFields() {
  return (dispatch, getState) => {
    return api.checkoutFields
      .list()
      .then(({ status, json }) => {
        dispatch(receiveCheckoutFields(json))
      })
      .catch(error => {})
  }
}

export function fetchCheckoutField(fieldName) {
  return (dispatch, getState) => {
    dispatch(requestCheckoutField())
    return api.checkoutFields
      .retrieve(fieldName)
      .then(({ status, json }) => {
        json.fieldName = fieldName
        dispatch(receiveCheckoutField(json))
      })
      .catch(error => {})
  }
}

export function updateCheckoutField(checkoutField) {
  return (dispatch, getState) => {
    return api.checkoutFields
      .update(checkoutField.fieldName, checkoutField)
      .then(({ status, json }) => {
        json.fieldName = fieldName
        dispatch(receiveCheckoutField(json))
      })
      .catch(error => {})
  }
}

export function fetchCommerceSettings() {
  return (dispatch, getState) => {
    return api.settings
      .retrieveCommerceSettings()
      .then(({ status, json }) => {
        dispatch(receiveCommerceSettings(json))
      })
      .catch(error => {})
  }
}

export function updateCommerceSettings(commerceSettings) {
  return (dispatch, getState) => {
    return api.settings
      .updateCommerceSettings(commerceSettings)
      .then(({ status, json }) => {
        dispatch(receiveCommerceSettings(json))
      })
      .catch(error => {})
  }
}

export function fetchShippingMethods() {
  return (dispatch, getState) => {
    return api.shippingMethods
      .list()
      .then(({ status, json }) => {
        dispatch(receiveShippingMethods(json))
      })
      .catch(error => {})
  }
}

export function fetchPaymentMethods() {
  return (dispatch, getState) => {
    return api.paymentMethods
      .list()
      .then(({ status, json }) => {
        dispatch(receivePaymentMethods(json))
      })
      .catch(error => {})
  }
}

export function updateShippingMethod(method) {
  return (dispatch, getState) => {
    return api.shippingMethods
      .update(method.id, method)
      .then(({ status, json }) => {
        dispatch(fetchShippingMethods())
      })
      .catch(error => {})
  }
}

export function updatePaymentMethod(method) {
  return (dispatch, getState) => {
    return api.paymentMethods
      .update(method.id, method)
      .then(({ status, json }) => {
        dispatch(fetchPaymentMethods())
      })
      .catch(error => {})
  }
}

export function fetchShippingMethod(id) {
  return (dispatch, getState) => {
    return api.shippingMethods
      .retrieve(id)
      .then(({ status, json }) => {
        dispatch(receiveShippingMethod(json))
      })
      .catch(error => {})
  }
}

export function fetchPaymentMethod(id) {
  return (dispatch, getState) => {
    return api.paymentMethods
      .retrieve(id)
      .then(({ status, json }) => {
        dispatch(receivePaymentMethod(json))
      })
      .catch(error => {})
  }
}

export function deleteShippingMethod(methodId) {
  return (dispatch, getState) => {
    return api.shippingMethods
      .delete(methodId)
      .then(({ status, json }) => {
        dispatch(fetchShippingMethods())
      })
      .catch(error => {})
  }
}

export function deletePaymentMethod(methodId) {
  return (dispatch, getState) => {
    return api.paymentMethods
      .delete(methodId)
      .then(({ status, json }) => {
        dispatch(fetchPaymentMethods())
      })
      .catch(error => {})
  }
}

export function createShippingMethod(method) {
  return (dispatch, getState) => {
    return api.shippingMethods
      .create(method)
      .then(({ status, json }) => {
        dispatch(fetchShippingMethods())
      })
      .catch(error => {})
  }
}

export function createPaymentMethod(method) {
  return (dispatch, getState) => {
    return api.paymentMethods
      .create(method)
      .then(({ status, json }) => {
        dispatch(fetchPaymentMethods())
      })
      .catch(error => {})
  }
}

export function fetchTokens() {
  return (dispatch, getState) => {
    return api.tokens
      .list()
      .then(({ status, json }) => {
        dispatch(receiveTokens(json))
      })
      .catch(error => {})
  }
}

export function fetchToken(id) {
  return (dispatch, getState) => {
    return api.tokens
      .retrieve(id)
      .then(({ status, json }) => {
        dispatch(receiveToken(json))
      })
      .catch(error => {})
  }
}

export function createToken(token) {
  return (dispatch, getState) => {
    return api.tokens
      .create(token)
      .then(({ status, json }) => {
        console.log(json)
        dispatch(fetchTokens())
        dispatch(receiveNewToken(json.token))
      })
      .catch(error => {})
  }
}

export function updateToken(token) {
  return (dispatch, getState) => {
    return api.tokens
      .update(token.id, token)
      .then(({ status, json }) => {
        dispatch(fetchTokens())
      })
      .catch(error => {})
  }
}

export function deleteToken(tokenId) {
  return (dispatch, getState) => {
    return api.tokens
      .delete(tokenId)
      .then(({ status, json }) => {
        dispatch(fetchTokens())
      })
      .catch(error => {})
  }
}

export function fetchPaymentGateway(gatewayName) {
  return (dispatch, getState) => {
    if (gatewayName && gatewayName.length > 0) {
      return api.paymentGateways
        .retrieve(gatewayName)
        .then(({ status, json }) => {
          dispatch(receivePaymentGateway(json))
        })
        .catch(error => {})
    } else {
      dispatch(receivePaymentGateway(null))
    }
  }
}

export function updatePaymentGateway(gatewayName, data) {
  return (dispatch, getState) => {
    return api.paymentGateways
      .update(gatewayName, data)
      .then(({ status, json }) => {
        dispatch(receivePaymentGateway(json))
      })
      .catch(error => {})
  }
}

export function uploadLogo(form) {
  return (dispatch, getState) => {
    return api.settings
      .uploadLogo(form)
      .then(() => {
        dispatch(fetchSettings())
      })
      .catch(error => {})
  }
}

export function fetchThemeSettings() {
  return (dispatch, getState) => {
    return Promise.all([
      api.theme.settings.retrieve(),
      api.theme.settings.retrieveSchema(),
    ])
      .then(([settingsResponse, schemaResponse]) => {
        dispatch(receiveThemeSettings(settingsResponse.json))
        dispatch(receiveThemeSettingsSchema(schemaResponse.json))
      })
      .catch(error => {})
  }
}

export function updateThemeSettings(settings) {
  return (dispatch, getState) => {
    return api.theme.settings
      .update(settings)
      .then(() => {
        dispatch(fetchThemeSettings())
      })
      .catch(error => {})
  }
}

export function fetchRedirects() {
  return (dispatch, getState) => {
    return api.redirects
      .list()
      .then(({ status, json }) => {
        dispatch(receiveRedirects(json))
      })
      .catch(error => {})
  }
}

export function fetchRedirect(id) {
  return (dispatch, getState) => {
    return api.redirects
      .retrieve(id)
      .then(({ status, json }) => {
        dispatch(receiveRedirect(json))
      })
      .catch(error => {})
  }
}

export function createRedirect(redirect) {
  return (dispatch, getState) => {
    return api.redirects
      .create(redirect)
      .then(({ status, json }) => {
        dispatch(fetchRedirects())
      })
      .catch(error => {})
  }
}

export function updateRedirect(redirect) {
  return (dispatch, getState) => {
    return api.redirects
      .update(redirect.id, redirect)
      .then(({ status, json }) => {
        dispatch(fetchRedirects())
      })
      .catch(error => {})
  }
}

export function deleteRedirect(redirectId) {
  return (dispatch, getState) => {
    return api.redirects
      .delete(redirectId)
      .then(({ status, json }) => {
        dispatch(fetchRedirects())
      })
      .catch(error => {})
  }
}

export function fetchWebhooks() {
  return (dispatch, getState) => {
    return api.webhooks
      .list()
      .then(({ status, json }) => {
        dispatch(receiveWebhooks(json))
      })
      .catch(error => {})
  }
}

export function fetchWebhook(id) {
  return (dispatch, getState) => {
    return api.webhooks
      .retrieve(id)
      .then(({ status, json }) => {
        dispatch(receiveWebhook(json))
      })
      .catch(error => {})
  }
}

export function createWebhook(webhook) {
  return (dispatch, getState) => {
    return api.webhooks
      .create(webhook)
      .then(({ status, json }) => {
        dispatch(fetchWebhooks())
      })
      .catch(error => {})
  }
}

export function updateWebhook(webhook) {
  return (dispatch, getState) => {
    return api.webhooks
      .update(webhook.id, webhook)
      .then(({ status, json }) => {
        dispatch(fetchWebhooks())
      })
      .catch(error => {})
  }
}

export function deleteWebhook(webhookId) {
  return (dispatch, getState) => {
    return api.webhooks
      .delete(webhookId)
      .then(({ status, json }) => {
        dispatch(fetchWebhooks())
      })
      .catch(error => {})
  }
}

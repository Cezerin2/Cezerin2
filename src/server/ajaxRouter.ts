import Router, { RouterContext } from "@koa/router"
import CezerinClient from "cezerin2-client"
import handlebars from "handlebars"
import jwt from "jsonwebtoken"
import { ObjectID } from "mongodb"
import { decodeUserLoginAuth, encodeUserLoginAuth } from "./lib/authHeader"
import { send } from "./lib/mailer"
import { db } from "./lib/mongo"
import serverSettings from "./lib/settings"
import { compare, hash } from "./lib/utils"
import OrderItemsService from "./services/orders/orderItems"
import EmailTemplatesService from "./services/settings/emailTemplates"
import SettingsService from "./services/settings/settings"

const ajaxRouter = new Router()
const TOKEN_PAYLOAD = { email: "store", scopes: ["admin"] }
const STORE_ACCESS_TOKEN = jwt.sign(TOKEN_PAYLOAD, serverSettings.jwtSecretKey)

const api = new CezerinClient({
  apiBaseUrl: serverSettings.apiBaseUrl,
  apiToken: STORE_ACCESS_TOKEN,
})

const DEFAULT_CACHE_CONTROL = "public, max-age=60"
const PRODUCTS_CACHE_CONTROL = "public, max-age=60"
const PRODUCT_DETAILS_CACHE_CONTROL = "public, max-age=60"

interface cookieOptions {
  maxAge: number
  httpOnly: true
  signed: true
  secure: boolean
  sameSite: "strict"
}

const getCartCookieOptions = (isHttps: boolean): cookieOptions => ({
  maxAge: 24 * 60 * 60 * 1000, // 24 hours
  httpOnly: true,
  signed: true,
  secure: isHttps,
  sameSite: "strict",
})

const getIP = (ctx: RouterContext) => {
  let { ip } = ctx

  if (ip && ip.includes(", ")) ip = ip.split(", ")[0]

  if (ip && ip.includes("::ffff:")) ip = ip.replace("::ffff:", "")

  return ip
}

const fillCartItemWithProductData = (products, cartItem) => {
  const product = products.find(p => p.id === cartItem.product_id)

  if (product) {
    cartItem.image_url =
      product.images && product.images.length > 0 ? product.images[0].url : null
    cartItem.path = product.path
    cartItem.stock_backorder = product.stock_backorder
    cartItem.stock_preorder = product.stock_preorder
    if (cartItem.variant_id && cartItem.variant_id.length > 0) {
      const variant = OrderItemsService.getVariantFromProduct(
        product,
        cartItem.variant_id
      )
      cartItem.stock_quantity = variant ? variant.stock_quantity : 0
    } else {
      cartItem.stock_quantity = product.stock_quantity
    }
  }

  return cartItem
}

const fillCartItems = async cartResponse => {
  const cart = cartResponse.json

  if (cart && cart.items && cart.items.length > 0) {
    const productIds = cart.items.map(item => item.product_id)
    const { json } = await api.products.list({
      ids: productIds,
      fields:
        "images,enabled,stock_quantity,variants,path,stock_backorder,stock_preorder",
    })

    const newCartItem = cart.items.map(cartItem =>
      fillCartItemWithProductData(json.data, cartItem)
    )

    cartResponse.json.items = newCartItem
    return cartResponse
  }
}

ajaxRouter.get("/products", async ctx => {
  const filter = ctx.query
  filter.enabled = "true"

  const { status, json } = await api.products.list(filter)

  ctx.body = json
  ctx.status = status
  ctx.set("Cache-Control", PRODUCTS_CACHE_CONTROL)
})

ajaxRouter.get("/products/:id", async ctx => {
  const { status, json } = await api.products.retrieve(ctx.params.id)

  ctx.body = json
  ctx.status = status
  ctx.set("Cache-Control", PRODUCT_DETAILS_CACHE_CONTROL)
})

ajaxRouter.get("/cart", async ctx => {
  const orderID = ctx.cookies.get("order_id")
  if (orderID) {
    const cartResponse = await api.orders.retrieve(orderID)

    const { status, json } = await fillCartItems(cartResponse)

    json.browser = undefined
    ctx.body = json
    ctx.status = status
  }
})

ajaxRouter.post("/reset-password", async ctx => {
  const passwordHash = ctx.request.body?.password
    ? await hash(ctx.request.body.password)
    : ""

  const data = {
    status: false,
    id: null,
    verified: false,
  }

  const userID =
    "token" in ctx.request.body
      ? decodeUserLoginAuth(ctx.request.body.token)
      : decodeUserLoginAuth(ctx.request.body.id).userID.userID

  const filter = {
    id: userID,
  }
  const customerDraft = {
    password: passwordHash,
  }

  // update customer password after checking customer id
  if ("id" in ctx.request.body) {
    const { status } = await api.customers.update(userID, customerDraft)

    data.status = true
    data.id = userID
    data.verified = true

    ctx.body = data
    ctx.status = status

    return false
  }

  // TODO: Spelling mistake
  if ("name" in userID && userID.name.indexOf("JsonWebTokenErro") !== -1) {
    ctx.body = data
    return false
  }

  // if customer email exists send status back
  const { status, json } = await api.customers.list(filter)
  if (json.total_count > 0) {
    data.status = true
    data.id = encodeUserLoginAuth(userID)
  }

  ctx.body = data
  ctx.status = status
})

ajaxRouter.post("/forgot-password", async ctx => {
  const filter = {
    email: ctx.request.body.email.toLowerCase(),
  }
  const data = {
    status: true,
  }

  // send forgot password email
  const sendEmail = async userID => {
    const countryCode = undefined
    const emailTemp = await EmailTemplatesService.getEmailTemplate(
      `forgot_password_${serverSettings.language}`
    )

    handlebars.registerHelper("forgot_password_link", obj => {
      const url = `${serverSettings.storeBaseUrl}${
        countryCode !== undefined ? `/${countryCode}/` : "/"
      }reset-password?token=${encodeUserLoginAuth(userID)}`
      let text = emailTemp.link
      if (text === undefined) {
        text = url
      }
      return new handlebars.SafeString(
        `<a style="position: relative;text-transform: uppercase;border: 1px solid #ccc;color: #000;padding: 5px;text-decoration: none;" value="${text}" href="${url}"> ${text} </a>`
      )
    })

    const bodyTemplate = handlebars.compile(emailTemp.body)
    const settings = SettingsService.getSettings()

    await send({
      to: ctx.request.body.email,
      subject: `${emailTemp.subject} ${settings.store_name}`,
      html: bodyTemplate({
        shop_name: settings.store_name,
      }),
    })

    ctx.body = data
  }

  // check if customer exists
  await api.customers.list(filter).then(async ({ status, json }) => {
    if (json.total_count < 1) {
      data.status = false
      ctx.body = data
      ctx.status = status
      return false
    }
    await sendEmail(json.data[0].id)
  })
})

ajaxRouter.post("/customer-account", async ctx => {
  const customerData: any = {
    token: "",
    authenticated: false,
    customer_settings: null,
    order_statuses: null,
  }

  if (ctx.request.body.token) {
    customerData.token = decodeUserLoginAuth(ctx.request.body.token)
    if (customerData.token.userID !== undefined) {
      const userID = JSON.stringify(customerData.token.userID).replace(
        /["']/g,
        ""
      )

      const filter = {
        customer_id: userID,
      }

      // retrieve customer data
      await api.customers.retrieve(userID).then(({ json }) => {
        customerData.customer_settings = json
        customerData.customer_settings.password = "*******"
        customerData.token = encodeUserLoginAuth(userID)
        customerData.authenticated = false
      })

      // retrieve orders data
      await api.orders.list(filter).then(({ status, json }) => {
        customerData.order_statuses = json
        ctx.body = JSON.stringify(customerData)
        ctx.status = status
      })
    }
  }
})

ajaxRouter.post("/login", async ctx => {
  const customerData = {
    token: "",
    authenticated: false,
    loggedin_failed: false,
    customer_settings: null,
    order_statuses: null,
    cartLayer:
      ctx.request.body.cartLayer !== undefined
        ? ctx.request.body.cartLayer
        : false,
  }

  // check if customer exists in database and grant or denie access
  const result = await db
    .collection("customers")
    .find({ email: ctx.request.body.email.toLowerCase() })
    .limit(1)
    .next()

  if (!result) {
    await api.customers.list().then(({ status }) => {
      customerData.loggedin_failed = true
      ctx.body = JSON.stringify(customerData)
      ctx.status = status
    })
    return
  }

  const customerPassword = result.password
  const inputPassword = ctx.request.body.password

  const out = await compare(inputPassword, customerPassword)

  if (out === true) {
    customerData.token = encodeUserLoginAuth(result._id)
    customerData.authenticated = true

    await api.customers.retrieve(result._id).then(async ({ json }) => {
      customerData.customer_settings = json
      customerData.customer_settings.password = "*******"

      const filter = {
        customer_id: json.id,
      }

      await api.orders.list(filter).then(({ status, json }) => {
        customerData.order_statuses = json
        ctx.body = JSON.stringify(customerData)
        ctx.status = status
      })
    })

    return
  }

  customerData.loggedin_failed = true
  ctx.body = JSON.stringify(customerData)
  ctx.status = 200
})

ajaxRouter.post("/register", async ctx => {
  // set data for response
  const data = {
    status: false,
    isRightToken: true,
    isCustomerSaved: false,
  }
  const filter = {
    email: ctx.request.body.email,
  }

  // check if url params contains token
  const requestToken =
    "token" in ctx.request.body ? ctx.request.body.token : false

  if (requestToken && !data.status) {
    const requestTokenArray = requestToken.split("xXx")

    // if requestToken array has no splitable part response token is wrong
    if (requestTokenArray.length < 2) {
      data.isRightToken = false
      ctx.body = data
      ctx.status = 200
      return false
    }

    // decode token parts and check if valid email is the second part of them
    const firstName = await decodeUserLoginAuth(requestTokenArray[0]).userID
    const lastName = await decodeUserLoginAuth(requestTokenArray[1]).userID
    const eMail = await decodeUserLoginAuth(requestTokenArray[2]).userID
    const passWord = requestTokenArray[3]

    if (
      requestTokenArray.length < 1 ||
      !/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
        eMail
      )
    ) {
      data.isRightToken = false
      ctx.body = data
      ctx.status = 200
      return false
    }

    // check once if customer email is existig in database
    filter.email = eMail
    await api.customers.list(filter).then(({ json }) => {
      if (json.total_count > 0) {
        data.isCustomerSaved = true
        return false
      }
    })

    const customerDraft = {
      full_name: `${firstName} ${lastName}`,
      first_name: firstName,
      last_name: lastName,
      email: eMail.toLowerCase(),
      password: await hash(passWord),
    }

    // create new customer in database
    await api.customers.create(customerDraft)

    data.isCustomerSaved = true
    ctx.body = data
    ctx.status = 200
    return true
  }

  // send customer a doi email
  const registerCustomer = async () => {
    if (data.status) {
      const countryCode = undefined
      const emailTemp = await EmailTemplatesService.getEmailTemplate(
        `register_doi_${serverSettings.language}`
      )

      const tokenConcatString = `${encodeUserLoginAuth(
        ctx.request.body.first_name
      )}xXx${encodeUserLoginAuth(
        ctx.request.body.last_name
      )}xXx${encodeUserLoginAuth(ctx.request.body.email)}xXx${
        ctx.request.body.password
      }`

      handlebars.registerHelper("register_doi_link", () => {
        const url = `${serverSettings.storeBaseUrl}${
          countryCode !== undefined ? `/${countryCode}/` : "/"
        }register?token=${tokenConcatString}`
        let text = emailTemp.link

        if (text === undefined) text = url

        return new handlebars.SafeString(
          `<a style="position: relative;text-transform: uppercase;border: 1px solid #ccc;color: #000;padding: 5px;text-decoration: none;" value="${text}" href="${url}"> ${text} </a>`
        )
      })

      const bodyTemplate = handlebars.compile(emailTemp.body)
      const settings = await SettingsService.getSettings()

      await send({
        to: ctx.request.body.email,
        subject: `${emailTemp.subject} ${settings.store_name}`,
        html: bodyTemplate({
          shop_name: settings.store_name,
        }),
      })

      ctx.body = data
      ctx.status = 200
    }

    return false
  }

  // check if customer exist in database
  if (!requestToken) {
    await api.customers.list(filter).then(async ({ status, json }) => {
      if (json.total_count > 0) {
        ctx.body = data
        ctx.status = status
        return false
      }
      data.status = true
      await registerCustomer()
    })
  }
})

ajaxRouter.put("/customer-account", async ctx => {
  const customerData = ctx.request.body
  const token = decodeUserLoginAuth(customerData.token)
  const userID = JSON.stringify(token.userID).replace(/["']/g, "")

  // generate password-hash
  const inputPassword = customerData.password
  const hashPassword = hash(inputPassword)

  // setup objects and filter
  const customerDataObj = {
    token: "",
    authenticated: false,
    customer_settings: null,
    order_statuses: null,
  }

  const customerDraftObj = {
    full_name: `${customerData.first_name} ${customerData.last_name}`,
    first_name: customerData.first_name,
    last_name: customerData.last_name,
    email: customerData.email.toLowerCase(),
    mobile: customerData.mobile,
    password: hashPassword,
    addresses: [customerData.billing_address, customerData.shipping_address],
  }

  const filter = {
    email: customerData.email,
  }

  // update customer profile and addresses
  await api.customers.list(filter).then(({ json }) => {
    // if customer email exists already do not update
    if (json.total_count > 0) {
      delete customerDraftObj.email
    }
  })

  // update customer
  await db.collection("customers").updateMany(
    { _id: ObjectID(userID) },
    {
      $set: customerDraftObj,
    },
    { ordered: false },
    async (error, result) => {
      if (error) {
        // alert
        ctx.body = error
        ctx.status = 200
      }
      customerDataObj.customer_settings = result
      customerDataObj.customer_settings.password = "*******"
      customerDataObj.token = encodeUserLoginAuth(userID)
      customerData.authenticated = false

      if (customerData.saved_addresses === 0) {
        let objJsonB64 = JSON.stringify(customerDataObj)
        objJsonB64 = Buffer.from(objJsonB64).toString("base64")
        ctx.body = JSON.stringify(objJsonB64)
        ctx.status = 200
        return false
      }

      // update orders
      await db.collection("orders").updateMany(
        { customer_id: ObjectID(userID) },
        {
          $set: {
            shipping_address: customerData.shipping_address,
            billing_address: customerData.billing_address,
          },
        },
        (error, result) => {
          if (error) {
            // alert
            ctx.body = error
            ctx.status = 200
          }
          customerDataObj.order_statuses = result
          let objJsonB64 = JSON.stringify(customerDataObj)
          objJsonB64 = Buffer.from(objJsonB64).toString("base64")

          ctx.body = JSON.stringify(objJsonB64)
          ctx.status = 200
        }
      )
    }
  )
})

ajaxRouter.post("/cart/items", async ctx => {
  const isHttps = ctx.protocol === "https"
  const cartCookieOptions = getCartCookieOptions(isHttps)

  const orderID = ctx.cookies.get("order_id")
  const item = ctx.request.body
  if (orderID) {
    await api.orders.items
      .create(orderID, item)
      .then(cartResponse => fillCartItems(cartResponse))
      .then(({ status, json }) => {
        ctx.body = json
        ctx.status = status
      })
  } else {
    const orderDraft: any = {
      draft: true,
      referrer_url: ctx.cookies.get("referrer_url"),
      landing_url: ctx.cookies.get("landing_url"),
      browser: {
        ip: getIP(ctx),
        user_agent: ctx.get("user-agent"),
      },
      shipping_address: {},
    }

    const settingsResponse = await api.settings.retrieve()

    const storeSettings = settingsResponse.json

    orderDraft.shipping_address.address1 =
      storeSettings.default_shipping_address1
    orderDraft.shipping_address.address2 =
      storeSettings.default_shipping_address2
    orderDraft.shipping_address.country = storeSettings.default_shipping_country
    orderDraft.shipping_address.state = storeSettings.default_shipping_state
    orderDraft.shipping_address.city = storeSettings.default_shipping_city
    orderDraft.item_tax_included = storeSettings.tax_included
    orderDraft.tax_rate = storeSettings.tax_rate

    const orderResponse = await api.orders.create(orderDraft)
    const orderId = orderResponse.json?.id
    ctx.cookies.set("order_id", orderId, cartCookieOptions)

    await api.orders.items
      .create(orderId, item)
      .then(cartResponse => fillCartItems(cartResponse))
      .then(({ status, json }) => {
        ctx.body = json
        ctx.status = status
      })
  }
})

ajaxRouter.delete("/cart/items/:item_id", async ctx => {
  const orderID = ctx.cookies.get("order_id")
  const { item_id: itemID } = ctx.params

  if (orderID && itemID) {
    const cartResponse = await api.orders.items.delete(orderID, itemID)

    const { status, json } = await fillCartItems(cartResponse)

    ctx.body = json
    ctx.status = status
  }
})

ajaxRouter.put("/cart/items/:item_id", async ctx => {
  const orderID = ctx.cookies.get("order_id")
  const { item_id: itemID } = ctx.params
  const item = ctx.request.body

  if (orderID && itemID) {
    const cartResponse = await api.orders.items.update(orderID, itemID, item)

    const { status, json } = await fillCartItems(cartResponse)

    ctx.body = json
    ctx.status = status
  }
})

ajaxRouter.put("/cart/checkout", async ctx => {
  const orderID = ctx.cookies.get("order_id")

  if (orderID) {
    const cartResponse = await api.orders.checkout(orderID)

    const { status, json } = await fillCartItems(cartResponse)

    let paths = ""
    // generate pdp landing url for the ordered product. More than 1 product in ordered will return comma separated url.
    ;[].slice.call(json.items).forEach(items => {
      paths +=
        json.items.length < 2
          ? `${serverSettings.storeBaseUrl}${items.path}`
          : `${serverSettings.storeBaseUrl}${items.path},`
    })
    const data = {
      landing_url: paths,
    }
    api.orders.update(orderID, data)

    ctx.cookies.set("order_id")
    ctx.body = json
    ctx.status = status
  }
})

ajaxRouter.put("/cart", async ctx => {
  const cartData = ctx.request.body
  const { shipping_address: shippingAddress, billing_address: billingAddress } =
    cartData
  const orderID = ctx.cookies.get("order_id")
  if (orderID) {
    if (shippingAddress) {
      await api.orders.updateShippingAddress(orderID, shippingAddress)
    }
    if (billingAddress) {
      await api.orders.updateBillingAddress(orderID, billingAddress)
    }

    const cartResponse = await api.orders.update(orderID, cartData)

    const { status, json } = await fillCartItems(cartResponse)

    ctx.body = json
    ctx.status = status
  }
})

ajaxRouter.put("/cart/shipping_address", async ctx => {
  const orderID = ctx.cookies.get("order_id")

  if (orderID) {
    const cartResponse = await api.orders.updateShippingAddress(
      orderID,
      ctx.request.body
    )

    const { status, json } = await fillCartItems(cartResponse)

    ctx.body = json
    ctx.status = status
  }
})

ajaxRouter.put("/cart/billing_address", async ctx => {
  const orderID = ctx.cookies.get("order_id")

  if (orderID) {
    const cartResponse = await api.orders.updateBillingAddress(
      orderID,
      ctx.request.body
    )
    const { status, json } = await fillCartItems(cartResponse)

    ctx.body = json
    ctx.status = status
  }
})

ajaxRouter.post("/cart/charge", async ctx => {
  const orderID = ctx.cookies.get("order_id")

  if (orderID) {
    const { client } = api.orders
    const chargeResponse = await client.post(`/orders/${orderID}/charge`)

    ctx.body = chargeResponse.json
    ctx.status = chargeResponse.status
  }
})

ajaxRouter.get("/pages", async ctx => {
  const { status, json } = await api.pages.list(ctx.query)

  ctx.body = json
  ctx.status = status
  ctx.set("Cache-Control", DEFAULT_CACHE_CONTROL)
})

ajaxRouter.get("/pages/:id", async ctx => {
  const { status, json } = await api.pages.retrieve(ctx.params.id)

  ctx.body = json
  ctx.status = status
  ctx.set("Cache-Control", DEFAULT_CACHE_CONTROL)
})

ajaxRouter.get("/sitemap", async ctx => {
  let result = null
  const filter = ctx.query
  filter.enabled = "true"

  const sitemapResponse = await api.sitemap.retrieve(filter)
  if (sitemapResponse.status !== 404 || sitemapResponse.json) {
    result = sitemapResponse.json

    if (result.type === "product") {
      const productResponse = await api.products.retrieve(result.resource)
      result.data = productResponse.json
    } else if (result.type === "page") {
      const pageResponse = await api.pages.retrieve(result.resource)
      result.data = pageResponse.json
    }
  }

  ctx.body = result
  ctx.status = sitemapResponse.status
  ctx.set("Cache-Control", DEFAULT_CACHE_CONTROL)
})

ajaxRouter.get("/payment_methods", async ctx => {
  const filter = {
    enabled: true,
    order_id: ctx.cookies.get("order_id"),
  }
  const { status, json } = await api.paymentMethods.list(filter)

  const methods = json.map(item => {
    delete item.conditions
    return item
  })

  ctx.body = methods
  ctx.status = status
})

ajaxRouter.get("/shipping_methods", async ctx => {
  const filter = {
    enabled: true,
    order_id: ctx.cookies.get("order_id"),
  }
  const { status, json } = await api.shippingMethods.list(filter)

  ctx.body = json
  ctx.status = status
})

ajaxRouter.get("/payment_form_settings", async ctx => {
  const orderID = ctx.cookies.get("order_id")
  if (orderID) {
    const { status, json } = await api.orders.getPaymentFormSettings(orderID)

    ctx.body = json
    ctx.status = status
  }
})

export default ajaxRouter

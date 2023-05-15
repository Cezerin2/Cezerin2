# Cezerin2 API client library

Allows asynchronous requests to Cezerin2 REST API and get results with native Promise or async/await. Work on browser and server.
This is based from Cezerin-client

Client include:

- Cezerin2 API
- Cezerin2 AJAX API
- Cezerin2 Web Store API

Install with:

```
npm i cezerin2-client
```

## Initialize

```javascript
import CezerinClient from "cezerin2-client"

const api = new CezerinClient({
  apiBaseUrl: "https://website.com/api/v1",
  apiToken: "<token>",
})
```

## Usage

```javascript
// fetch all categories with await
const categoriesResponse = await api.productCategories.list()
const categories = categoriesResponse.json
for (const category of categories) {
  console.log(category.name)
}

// fetch all categories with Promise
api.productCategories.list().then(({ status, json }) => {
  const categories = json
  for (const category of categories) {
    console.log(category.name)
  }
})

// create a category
api.productCategories
  .create({ name: "Shoes", active: true })
  .then(({ status, json }) => {
    const categoryId = json.id
  })
```

## Error Handling

```javascript
// with await
try {
  const createResult = await api.productCategories.create({ name: "Shoes" })
  const newCategory = createResult.json
} catch (e) {
  console.log(e)
}

// with Promise
api.productCategories
  .create({ name: "Shoes" })
  .then(({ status, json }) => {
    if (status === 200) {
      // success
      const newCategory = json
    } else {
      // 404 or bad request
    }
  })
  .catch(err => {
    console.log(err)
  })
```

## Methods

- `api.authorize(baseUrl, user, pass)`
- `api.sitemap.list()`
- `api.sitemap.retrieve(path)`
- `api.productCategories.list()`
- `api.productCategories.retrieve(id)`
- `api.productCategories.create(data)`
- `api.productCategories.update(id, data)`
- `api.productCategories.delete(id)`
- `api.productCategories.uploadImage(categoryId, formData)`
- `api.productCategories.deleteImage(id)`
- `api.products.list({`
  - `offset: 0,`
  - `limit: 10,`
  - `fields: 'id, name, price',`
  - `category_id: '<id>',`
  - `active: true,`
  - `discontinued: false,`
  - `search: '',`
  - `on_sale: true,`
  - `stock_status: 'available',`
  - `price_from: 0,`
  - `price_to: 100,`
  - `sku: '',`
  - `ids: '<id>,<id>,<id>',`
  - `sort: 'regular_price,-stock_quantity'})`
- `api.products.retrieve(id)`
- `api.products.create(data)`
- `api.products.update(id, data)`
- `api.products.delete(id)`
- `api.products.skuExists(productId, sku)`
- `api.products.slugExists(productId, slug)`
- `api.products.options.list(productId)`
- `api.products.options.retrieve(productId, optionId)`
- `api.products.options.create(productId, data)`
- `api.products.options.update(productId, optionId, data)`
- `api.products.options.delete(productId, optionId)`
- `api.products.options.values.list(productId, optionId)`
- `api.products.options.values.retrieve(productId, optionId, valueId)`
- `api.products.options.values.create(productId, optionId, data)`
- `api.products.options.values.update(productId, optionId, valueId, data)`
- `api.products.options.values.delete(productId, optionId, valueId)`
- `api.products.variants.list(productId)`
- `api.products.variants.create(productId, data)`
- `api.products.variants.update(productId, variantId, data)`
- `api.products.variants.delete(productId, variantId)`
- `api.products.variants.setOption(productId, variantId, data)`
- `api.products.images.list(productId)`
- `api.products.images.update(productId, imageId, data)`
- `api.products.images.upload(productId, formData)`
- `api.products.images.delete(productId, imageId)`
- `api.theme.export()`
- `api.theme.install(formData)`
- `api.theme.settings.retrieve()`
- `api.theme.settings.update(settings)`
- `api.theme.settings.retrieveSchema()`
- `api.theme.assets.uploadFile(formData)`
- `api.theme.assets.deleteFile(fileName)`
- `api.customers.list`
- `api.customers.retrieve`
- `api.customers.create`
- `api.customers.update`
- `api.customers.delete`
- `api.customers.createAddress`
- `api.customers.updateAddress`
- `api.customers.deleteAddress`
- `api.customers.setDefaultBillingAddress`
- `api.customers.setDefaultShippingAddress`
- `api.customerGroups.list`
- `api.customerGroups.retrieve`
- `api.customerGroups.create`
- `api.customerGroups.update`
- `api.customerGroups.delete`
- `api.orders.list`
- `api.orders.retrieve`
- `api.orders.create`
- `api.orders.update`
- `api.orders.delete`
- `api.orders.checkout`
- `api.orders.recalculate`
- `api.orders.cancel`
- `api.orders.close`
- `api.orders.updateBillingAddress`
- `api.orders.updateShippingAddress`
- `api.orders.discounts.create(order_id, data)`
- `api.orders.discounts.update(order_id, discount_id, data)`
- `api.orders.discounts.delete(order_id, discount_id)`
- `api.orders.transactions.create(order_id, data)`
- `api.orders.transactions.update(customer_id, transaction_id, data)`
- `api.orders.transactions.delete(order_id, transaction_id)`
- `api.orders.items.create(order_id, data)`
- `api.orders.items.update(order_id, item_id, data)`
- `api.orders.items.delete(order_id, item_id)`
- `api.orderStatuses.list`
- `api.orderStatuses.retrieve`
- `api.orderStatuses.create`
- `api.orderStatuses.update`
- `api.orderStatuses.delete`
- `api.shippingMethods.list`
- `api.shippingMethods.retrieve`
- `api.shippingMethods.create`
- `api.shippingMethods.update`
- `api.shippingMethods.delete`
- `api.paymentMethods.list`
- `api.paymentMethods.retrieve`
- `api.paymentMethods.create`
- `api.paymentMethods.update`
- `api.paymentMethods.delete`
- `api.paymentGateways.retrieve`
- `api.paymentGateways.update`
- `api.settings.retrieve`
- `api.settings.update`
- `api.settings.retrieveEmailSettings`
- `api.settings.updateEmailSettings`
- `api.settings.retrieveEmailTemplate`
- `api.settings.updateEmailTemplate`
- `api.checkoutFields.list`
- `api.checkoutFields.retrieve`
- `api.checkoutFields.update`
- `api.pages.list`
- `api.pages.retrieve`
- `api.pages.create`
- `api.pages.update`
- `api.pages.delete`
- `api.tokens.list`
- `api.tokens.retrieve`
- `api.tokens.create`
- `api.tokens.update`
- `api.tokens.delete`
- `api.redirects.list`
- `api.redirects.retrieve`
- `api.redirects.create`
- `api.redirects.update`
- `api.redirects.delete`
- `api.files.list(filter)`
- `api.files.upload(formData)`
- `api.files.delete(fileName)`
- `api.webhooks.list`
- `api.webhooks.retrieve`
- `api.webhooks.create`
- `api.webhooks.update`
- `api.webhooks.delete`
- `api.apps.settings.retrieve(appKey)`
- `api.apps.settings.update(appKey, data)`
- `api.theme.placeholders.list()`
- `api.theme.placeholders.retrieve(placeholderKey)`
- `api.theme.placeholders.create(data)`
- `api.theme.placeholders.update(placeholderKey, data)`
- `api.theme.placeholders.delete(placeholderKey)`

## Web Store Methods

- `api.webstore.init(token)`
- `api.webstore.authorize(email, admin_url)`
- `api.webstore.account.retrieve()`
- `api.webstore.account.update(data)`
- `api.webstore.account.updateDeveloper(data)`
- `api.webstore.services.list()`
- `api.webstore.services.retrieve(serviceId)`
- `api.webstore.services.settings.retrieve(serviceId)`
- `api.webstore.services.settings.update(serviceId, settings)`
- `api.webstore.services.actions.call(serviceId, actionId)`
- `api.webstore.services.logs.list(serviceId)`

## Contributing

If you can, please contribute by reporting issues, discussing ideas, or submitting pull requests with patches and new features. We do our best to respond to all issues and pull requests within a day or two, and make patch releases to npm regularly.

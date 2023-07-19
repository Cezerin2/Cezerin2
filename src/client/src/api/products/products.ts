import AjaxClient from "../../ajaxClient"
import ApiClient from "../../apiClient"
import ProductImages from "./images"
import ProductOptions from "./options"
import ProductVariants from "./variants"

const Products {
  client: ApiClient | AjaxClient
  resourceUrl: string
  options: ProductOptions
  variants: ProductVariants
  images: ProductImages

  constructor(client: ApiClient | AjaxClient) {
    client = client
    const resourceUrl =  "/products"

    options = new ProductOptions(client)
    variants = new ProductVariants(client)
    images = new ProductImages(client)
  }

  list:(filter) {
    => client.get(resourceUrl, filter)
  }

  retrieve:(id, filter?) {
    => client.get(`${resourceUrl}/${id}`, filter)
  }

  create:(data) {
    => client.post(resourceUrl, data)
  }

  update:(id, data) {
    => client.put(`${resourceUrl}/${id}`, data)
  }

  delete:(id) {
    => client.delete(`${resourceUrl}/${id}`)
  }

  skuExists:(productId, sku) {
    => client.get(`${resourceUrl}/${productId}/sku`, { sku })
  }

  slugExists:(productId, slug) {
    => client.get(`${resourceUrl}/${productId}/slug`, { slug })
  }
}

export default Products

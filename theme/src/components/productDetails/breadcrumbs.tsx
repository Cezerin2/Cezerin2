import React from "react"
import { NavLink } from "react-router-dom"
import * as helper from "../../lib/helper"
import { text } from "../../lib/settings"

const ProductBreadcrumbs = ({ product, categories }) => {
  const items = helper.getProductBreadcrumbs(product, categories)
  return (
    <nav
      className="breadcrumb is-small product-breadcrumb"
      aria-label="breadcrumbs"
    >
      <ul>
        <li>
          <NavLink to="/">{text.home}</NavLink>
        </li>
        {items}
      </ul>
    </nav>
  )
}

export default ProductBreadcrumbs

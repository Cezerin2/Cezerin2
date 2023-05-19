import React from "react"
import { NavLink } from "react-router-dom"
import { themeSettings, text } from "../lib/settings"
import * as helper from "../lib/helper"

const PageBreadcrumbs = ({ page, path }) => (
  <nav
    className="breadcrumb is-small product-breadcrumb"
    aria-label="breadcrumbs"
  >
    <ul>
      <li>
        <NavLink to="/">{text.home}</NavLink>
      </li>

      <li className="is-active">
        {" "}
        <NavLink to={`${path}`}>{page}</NavLink>
      </li>
    </ul>
  </nav>
)

export default PageBreadcrumbs

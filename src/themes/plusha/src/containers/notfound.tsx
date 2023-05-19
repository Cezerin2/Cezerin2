import React, { Fragment } from "react"
import { NavLink } from "react-router-dom"
import { text } from "../lib/settings"
import MetaTags from "../components/metaTags"
import PageBreadcrumbs from "../components/breadcrumbs"

const NotFoundContainer = () => (
  <Fragment>
    <MetaTags title={text.title404} />
    <section className="main__header section-container">
      <PageBreadcrumbs page={text.title404} path="/404" />
      <h1 className="main__title">{text.title404}</h1>
      <NavLink to="/">{text.text404}</NavLink>
    </section>
  </Fragment>
)

export default NotFoundContainer

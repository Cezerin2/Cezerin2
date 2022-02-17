import React, { Fragment } from "react"
import { themeSettings, text } from "../lib/settings"
import MetaTags from "../components/metaTags"
import Register from "../components/register"

const RegisterContainer = props => {
  const {
    state: { pageDetails, settings },
  } = props

  return (
    <Fragment>
      <section className="section">
        <div className="container">
          <div className="content">
            <Register {...props} />
          </div>
        </div>
      </section>
    </Fragment>
  )
}

export default RegisterContainer

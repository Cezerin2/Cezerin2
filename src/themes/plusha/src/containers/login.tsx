import React, { Fragment } from "react"
import { themeSettings, text } from "../lib/settings"
import MetaTags from "../components/metaTags"
import Login from "../components/login/index"

const LoginContainer = props => {
  const {
    state: { pageDetails, loginUser },
  } = props

  return (
    <Fragment>
      <Login {...props} />
    </Fragment>
  )
}

export default LoginContainer

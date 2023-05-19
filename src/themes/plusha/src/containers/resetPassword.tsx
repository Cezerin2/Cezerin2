import React, { Fragment } from "react"
import { themeSettings, text } from "../lib/settings"
import MetaTags from "../components/metaTags"
import ResetPassword from "../components/resetPassword/index"

const ResetPasswordContainer = props => {
  const {
    state: { pageDetails, loginUser },
  } = props

  return (
    <Fragment>
      <ResetPassword {...props} />
    </Fragment>
  )
}

export default ResetPasswordContainer

import React, { Fragment } from "react"
import Login from "../components/login/index"

const LoginContainer = props => {
  const {
    state: { pageDetails, loginUser },
  } = props

  return (
    <Fragment>
      <section className="section">
        <div className="container">
          <div className="content">
            <Login {...props} />
          </div>
        </div>
      </section>
    </Fragment>
  )
}

export default LoginContainer

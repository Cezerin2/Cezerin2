import React, { Fragment } from "react"
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

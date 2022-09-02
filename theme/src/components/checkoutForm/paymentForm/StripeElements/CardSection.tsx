import { CardElement } from "@stripe/react-stripe-js"
import React, { Fragment } from "react"

const CardSection = ({ title }) => (
  <Fragment>
    <p>{title}</p>
    <CardElement />
  </Fragment>
)

export default CardSection

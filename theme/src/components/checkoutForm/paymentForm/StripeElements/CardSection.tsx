import { CardElement } from "@stripe/react-stripe-js"
import React from "react"

const CardSection = ({ title }) => (
  <>
    <p>{title}</p>
    <CardElement />
  </>
)

export default CardSection

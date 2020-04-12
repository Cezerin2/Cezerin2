import React from 'react'
import { CardElement } from 'react-stripe-elements'

const CardSection = ({ title }) => (
	<>
		<p>{title}</p>
		<CardElement />
	</>
)

export default CardSection

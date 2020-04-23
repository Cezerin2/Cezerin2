import React from "react"
import { themeSettings, text } from "../../lib/settings"
import CustomProducts from "../products/custom"

const RelatedProducts = () => {
	const { ids, settings, addCartItem, limit } = this.props
	if (ids && ids.length > 0) {
		let title =
			themeSettings.related_products_title &&
			themeSettings.related_products_title.length > 0
				? themeSettings.related_products_title
				: text.relatedProducts

		return (
			<section className="section section-product-related">
				<div className="container">
					<div className="title is-4 has-text-centered">{title}</div>
					<CustomProducts
						ids={ids}
						sort={null}
						limit={limit}
						isCentered={true}
						settings={settings}
						addCartItem={addCartItem}
					/>
				</div>
			</section>
		)
	} else {
		return null
	}
}

export default RelatedProducts

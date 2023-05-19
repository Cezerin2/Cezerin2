import React, { Fragment } from "react"
import { themeSettings, text } from "../../lib/settings"
import GalleryProducts from "../products/gallery"

export default class RelatedProducts extends React.PureComponent {
  render() {
    const { ids, settings, addCartItem, limit } = this.props
    if (ids && ids.length > 0) {
      let title =
        themeSettings.related_products_title &&
        themeSettings.related_products_title.length > 0
          ? themeSettings.related_products_title
          : text.relatedProducts

      return (
        <section className="viewed_related viewed section-container">
          <div className="viewed__title section__title">{title}</div>
          <GalleryProducts
            ids={ids}
            settings={settings}
            addCartItem={addCartItem}
            limit={limit}
            isCentered
          />
        </section>
      )
    }
    return null
  }
}

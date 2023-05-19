import React, { Fragment, Component } from "react"
import Slider from "react-slick"
import { themeSettings, text } from "../../lib/settings"
import Item from "./item"

export default class ProductGallery extends Component {
  constructor() {
    super()
    this.state = {
      activeSlide: 1,
    }
  }

  render() {
    const {
      products,
      addCartItem,
      settings,

      className = "products-gallery products products_gallery",
    } = this.props

    const items = products
      ? products.map(product => (
          <Item
            key={product.id}
            product={product}
            addCartItem={addCartItem}
            settings={settings}
          />
        ))
      : null

    const settingsSlick = {
      dots: false,
      infinite: false,
      speed: 500,
      slidesToShow: 3,
      slidesToScroll: 3,
      variableWidth: true,
      centerPadding: "25px",
      afterChange: current => this.setState({ activeSlide: current + 1 }),

      responsive: [
        {
          breakpoint: 769,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2,
            centerMode: true,
          },
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
            centerMode: true,
          },
        },
      ],
    }

    return (
      <Fragment>
        <div className="products-gallery products">
          <Slider {...settingsSlick}>{items}</Slider>
        </div>
        <div className="products-gallery__pager pager">
          {this.state.activeSlide}/{products.length}
        </div>
      </Fragment>
    )
  }
}

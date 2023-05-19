import React, { Fragment, Component } from "react"
import { themeSettings, text } from "../../lib/settings"
import Item from "./item"
import Slider from "react-slick"

function NextArrow(props) {
  const { className, onClick } = props
  return (
    <div className="categories__arrow categories__arrow_next">
      <div className={className} onClick={onClick} />
      <div className="categories__shadow"></div>
    </div>
  )
}

function PrevArrow(props) {
  const { className, onClick } = props
  return (
    <div className="categories__arrow categories__arrow_prev">
      <div className={className} onClick={onClick} />
      <div className="categories__shadow"></div>
    </div>
  )
}

export default class CategoriesGallery extends Component {
  constructor() {
    super()
    this.state = {
      activeSlide: 1,
    }
  }

  render() {
    const { categories, className = "categories-gallery categories" } =
      this.props

    const items = categories
      ? categories
          .filter(category => category.parent_id === null)
          .map((category, index) => <Item key={index} category={category} />)
      : null

    const settingsSlick = {
      dots: false,
      infinite: false,
      speed: 500,
      slidesToShow: 4,
      slidesToScroll: 4,
      centerPadding: "25px",
      afterChange: current => this.setState({ activeSlide: current + 1 }),
      dots: true,
      nextArrow: <NextArrow />,
      prevArrow: <PrevArrow />,

      responsive: [
        {
          breakpoint: 769,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
            dots: false,
          },
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
            className: "center",
            centerPadding: "25px",
            centerMode: true,
            dots: false,
          },
        },
      ],
    }

    return (
      <Fragment>
        <div className="categories-gallery">
          <Slider {...settingsSlick}>{items}</Slider>
        </div>
        <div className="categories-gallery__pager pager">
          {this.state.activeSlide}/
          {categories.filter(category => category.parent_id === null).length}
        </div>
      </Fragment>
    )
  }
}

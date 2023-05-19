import React from "react"
import PropTypes from "prop-types"
import { NavLink } from "react-router-dom"
import ImageGallery from "react-image-gallery"
import LazyLoad from "react-lazyload"
import { themeSettings } from "../lib/settings"
import storeSettings from "../../../config/store"

const renderItem = item => (
  <div className="image-gallery-image">
    <LazyLoad>
      <NavLink to={item.path || ""}>
        <div
          className="image-gallery__item"
          style={{
            color: themeSettings.home_slider_color || "#fff",
            backgroundImage: `url(${item.original})`,
          }}
        >
          <div className="image-gallery__title">{item.title}</div>
          <div className="image-gallery__description">
            {item.description}
            {item.description && item.description.length > 0 && (
              <button
                type="button"
                className="image-gallery__button button button_gallery"
              >
                Go
              </button>
            )}
          </div>
        </div>
      </NavLink>
    </LazyLoad>
  </div>
)

const HomeSlider = ({ images }) => {
  if (images && images.length > 0) {
    const items = images.map(item => ({
      original: `/assets/images/${item.image}`,
      title: item.title,
      description: item.description,
      path: item.path || "",
      button: item.button,
    }))

    return (
      <section className="home-slider section-container">
        <ImageGallery
          items={items}
          lazyLoad
          showThumbnails={false}
          slideInterval={2000}
          showNav={themeSettings.home_gallery_shownav === true}
          showBullets={images.length > 1}
          showPlayButton={false}
          showFullscreenButton={false}
          slideOnThumbnailHover={false}
          renderItem={renderItem}
          infinite={false}
        />
      </section>
    )
  }
  return null
}

HomeSlider.propTypes = {
  images: PropTypes.arrayOf(PropTypes.shape({})),
}

HomeSlider.defaultProps = {
  images: null,
}

export default HomeSlider

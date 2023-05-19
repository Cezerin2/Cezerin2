import React, { Fragment } from "react"
import { NavLink } from "react-router-dom"
import ImageGallery from "react-image-gallery"
import Lightbox from "react-image-lightbox"
import * as helper from "../../lib/helper"
import { themeSettings, text } from "../../lib/settings"

export default class Gallery extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      lightboxIsOpen: false,
      lightboxPhotoIndex: 0,
    }
  }

  openLightbox = () => {
    this.setState({ lightboxIsOpen: true })
  }

  closeLightbox = () => {
    this.setState({ lightboxIsOpen: false })
  }

  setPhotoIndex = index => {
    this.setState({ lightboxPhotoIndex: index })
  }

  render() {
    const { images } = this.props
    const { lightboxIsOpen, lightboxPhotoIndex } = this.state

    if (images && images.length > 0) {
      const imagesArray = images.map(image => ({
        original: helper.getThumbnailUrl(
          image.url,
          themeSettings.bigThumbnailWidth
        ),
        thumbnail: helper.getThumbnailUrl(
          image.url,
          themeSettings.previewThumbnailWidth
        ),
        originalAlt: image.alt,
        thumbnailAlt: image.alt,
      }))

      const originalImages = images.map(image => image.url)
      const showThumbnails = images.length > 1

      const renderItem = item => (
        <div
          className="image-gallery-image"
          style={{ backgroundImage: `url(${item.original})` }}
        />
      )

      return (
        <div className="product__image">
          <ImageGallery
            items={imagesArray}
            showThumbnails={false}
            onClick={this.openLightbox}
            lazyLoad
            slideInterval={2000}
            showNav={themeSettings.product_gallery_shownav === true}
            showBullets={showThumbnails}
            showPlayButton={false}
            showFullscreenButton={false}
            renderItem={renderItem}
          />
          {lightboxIsOpen && (
            <Lightbox
              reactModalStyle={{ overlay: { zIndex: 1099 } }}
              mainSrc={originalImages[lightboxPhotoIndex]}
              nextSrc={
                originalImages[(lightboxPhotoIndex + 1) % originalImages.length]
              }
              prevSrc={
                originalImages[
                  (lightboxPhotoIndex + originalImages.length - 1) %
                    originalImages.length
                ]
              }
              onCloseRequest={this.closeLightbox}
              onMovePrevRequest={() =>
                this.setState({
                  lightboxPhotoIndex:
                    (lightboxPhotoIndex + originalImages.length - 1) %
                    originalImages.length,
                })
              }
              onMoveNextRequest={() =>
                this.setState({
                  lightboxPhotoIndex:
                    (lightboxPhotoIndex + 1) % originalImages.length,
                })
              }
            />
          )}
        </div>
      )
    }
    return <div className="large-image-placeholder" />
  }
}

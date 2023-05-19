import React, { Fragment } from "react"
import { NavLink } from "react-router-dom"
import ImageGallery from "react-image-gallery"
import Lightbox from "react-image-lightbox"
import LazyLoad from "react-lazyload"
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

      const renderItem = item => (
        <div
          className="image-gallery-image"
          style={{ backgroundImage: `url(${item.original})` }}
        />
      )

      const originalImages = images.map(image => image.url)

      return (
        <Fragment>
          <LazyLoad>
            <ImageGallery
              items={imagesArray}
              showThumbnails={false}
              lazyLoad
              slideInterval={2000}
              showNav={themeSettings.product_gallery_shownav === false}
              showBullets={images.length > 1}
              showPlayButton={false}
              renderItem={renderItem}
              showFullscreenButton={false}
              slideOnThumbnailHover={false}
            />
          </LazyLoad>
          {lightboxIsOpen && (
            <LazyLoad>
              <Lightbox
                reactModalStyle={{ overlay: { zIndex: 1099 } }}
                mainSrc={originalImages[lightboxPhotoIndex]}
                nextSrc={
                  originalImages[
                    (lightboxPhotoIndex + 1) % originalImages.length
                  ]
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
            </LazyLoad>
          )}
        </Fragment>
      )
    }
    return <div className="large-image-placeholder" />
  }
}

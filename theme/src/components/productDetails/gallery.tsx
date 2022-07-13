import React, { FC, Fragment, useState } from "react"
import ImageGallery from "react-image-gallery"
import Lightbox from "react-image-lightbox"
import * as helper from "../../lib/helper"
import { themeSettings } from "../../lib/settings"

const Gallery: FC<{ images }> = ({ images }) => {
  const [lightboxIsOpen, setLightboxIsOpen] = useState(false)
  const [lightboxPhotoIndex, setLightboxPhotoIndex] = useState(0)

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

    return (
      <Fragment>
        <ImageGallery
          items={imagesArray}
          showThumbnails={showThumbnails}
          onClick={() => setLightboxIsOpen(true)}
          lazyLoad={true}
          slideInterval={2000}
          showNav={themeSettings.product_gallery_shownav === true}
          showBullets={showThumbnails}
          showPlayButton={false}
          showFullscreenButton={false}
          slideOnThumbnailHover={true}
          thumbnailPosition={themeSettings.product_thumbnail_position}
          onSlide={index => setLightboxPhotoIndex(index)}
          startIndex={lightboxPhotoIndex}
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
            onCloseRequest={() => setLightboxIsOpen(false)}
            onMovePrevRequest={() =>
              setLightboxPhotoIndex(
                value =>
                  (value + originalImages.length - 1) % originalImages.length
              )
            }
            onMoveNextRequest={() =>
              setLightboxPhotoIndex(
                value => (value + 1) % originalImages.length
              )
            }
          />
        )}
      </Fragment>
    )
  } else {
    return <div className="large-image-placeholder" />
  }
}

export default Gallery

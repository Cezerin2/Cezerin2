import React, { Fragment } from "react"
import PropTypes from "prop-types"
import { NavLink } from "react-router-dom"
import LazyLoad from "react-lazyload"
import { themeSettings } from "../lib/settings"
import MetaTags from "../components/metaTags"
import GalleryProducts from "../components/products/gallery"
import HomeSlider from "../components/homeSlider"
import ViewedProducts from "../components/products/viewed"
import AdvantagesData  from "../../locales/advantagesData.json"
import CategoriesGallery from "../components/categoriesGallery"
import BigBanner from "../components/bigBanner"
import HomeContacts from "../components/homeContacts"
import MapYand from "../components/mapYand"

const IndexContainer = props => {
  const {
    addCartItem,
    state: { pageDetails, settings, advantages = AdvantagesData, categories },
  } = props

  return (
    <Fragment>
      <MetaTags
        title={pageDetails.meta_title}
        description={pageDetails.meta_description}
        canonicalUrl={pageDetails.url}
        ogTitle={pageDetails.meta_title}
        ogDescription={pageDetails.meta_description}
      />

      <HomeSlider images={themeSettings.home_slider} />

      {pageDetails.content && pageDetails.content.length > 10 && (
        <section className="section">
          <div className="container">
            <div className="content">
              <div
                dangerouslySetInnerHTML={{
                  __html: pageDetails.content,
                }}
              />
            </div>
          </div>
        </section>
      )}
      <section className="advantages section-container">
        <h2 className="advantages__title section__title">Advantages</h2>
        <div className="advantages__items">
          {advantages.map(item => (
            <div className="advantages__item" key={item.id}>
              <img className="advantages__icon" src={item.icon} alt="" />
              <div className="advantages__name">{item.name}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="categories section-container">
        <h2 className="categories__title section__title">Categories</h2>

        <CategoriesGallery categories={categories} />
      </section>

      <section className="popular section-container">
        <h2 className="popular__title section__title">
          {themeSettings.home_products_title}
        </h2>
        <LazyLoad>
          <GalleryProducts
            sku={themeSettings.home_products_sku}
            sort={themeSettings.home_products_sort}
            limit={themeSettings.home_products_limit}
            settings={settings}
            addCartItem={addCartItem}
          />
        </LazyLoad>
      </section>

      <section className="big-banner section-container">
        <LazyLoad>
          <BigBanner />
        </LazyLoad>
      </section>

      {themeSettings.show_viewed_products && (
        <LazyLoad>
          <ViewedProducts
            settings={settings}
            addCartItem={addCartItem}
            limit={themeSettings.limit_viewed_products || 6}
          />
        </LazyLoad>
      )}

      <section className="contacts section-container">
        <h2 className="contacts__title_content section__title">Contacts</h2>
        <div className="contacts__content">
          <LazyLoad>
            <HomeContacts settings={settings} />
          </LazyLoad>
        </div>
        <h2 className="contacts__title_map section__title">Map</h2>
        <div className="contacts__map">
          <LazyLoad>
            <MapYand />
          </LazyLoad>
        </div>
      </section>
    </Fragment>
  )
}

IndexContainer.propTypes = {
  addCartItem: PropTypes.func.isRequired,
  state: PropTypes.shape({
    settings: PropTypes.shape({}),
    pageDetails: PropTypes.shape({}),
  }).isRequired,
}

export default IndexContainer

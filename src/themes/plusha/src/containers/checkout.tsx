import React, { Fragment } from "react"
import PropTypes from "prop-types"
import MetaTags from "../components/metaTags"
import OrderSummary from "../components/orderSummary"
import CheckoutForm from "../components/checkoutForm"
import PageBreadcrumbs from "../components/breadcrumbs"

const CheckoutContainer = props => {
  const {
    state: { pageDetails },
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

      <section className="main__header section-container">
        <PageBreadcrumbs
          page={pageDetails.meta_title}
          path={pageDetails.path}
        />
        <h1 className="main__title checkout__title">Checkout</h1>
      </section>
      <section className="checkout section-container">
        <div className="checkout__form checkout-form">
          <CheckoutForm {...props} />
        </div>
        <div className="checkout__order checkout-order">
          <OrderSummary {...props} />
        </div>
      </section>
    </Fragment>
  )
}

CheckoutContainer.propTypes = {
  state: PropTypes.shape({
    pageDetails: PropTypes.shape({}),
  }).isRequired,
}

export default CheckoutContainer

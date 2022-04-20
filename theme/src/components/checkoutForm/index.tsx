import Lscache from "lscache"
import React, { FC, useEffect, useState } from "react"
import { text, themeSettings } from "../../lib/settings"
import CheckoutStepContacts from "./stepContacts"
import CheckoutStepPayment from "./stepPayment"
import CheckoutStepShipping from "./stepShipping"

interface Props {
  state
  checkout
  updateCart
  customerData
  loadPaymentMethods
  loadShippingMethods
  cartLayerInitialized
}

const CheckoutForm: FC<Props> = props => {
  const [step, setStep] = useState(1)

  const {
    state,
    checkout,
    updateCart,
    customerData,
    loadPaymentMethods,
    loadShippingMethods,
    cartLayerInitialized,
  } = props

  useEffect(() => {
    loadShippingMethods()
    loadPaymentMethods()
    customerData({
      token: Lscache.get("auth_data"),
    })

    cartLayerInitialized({
      cartlayerBtnInitialized: false,
    })
  }, [])

  const handleContactsSubmit = values => {
    const { shipping_address, billing_address } = values
    shipping_address.full_name = `${values.first_name} ${values.last_name}`
    updateCart(
      {
        full_name: `${values.first_name} ${values.last_name}`,
        first_name: values.first_name,
        last_name: values.last_name,
        email: values.email,
        mobile: values.mobile,
        password: values.password,
        shipping_address,
        billing_address,
        payment_method_id: null,
        shipping_method_id: null,
      },
      cart => {
        loadShippingMethods()
        loadPaymentMethods()
      }
    )

    setStep(2)
  }

  const handleShippingMethodSave = shippingMethodId => {
    updateCart(
      {
        payment_method_id: null,
        shipping_method_id: shippingMethodId,
      },
      cart => {
        loadPaymentMethods()
      }
    )
  }

  const isShowPaymentForm = () => {
    const { payment_method_gateway } = state.cart
    const paymentGatewayExists =
      payment_method_gateway && payment_method_gateway !== ""
    return paymentGatewayExists
  }

  const handleShippingSubmit = values => {
    if (isShowPaymentForm()) {
      const { shipping_address, billing_address, comments } = values
      shipping_address.full_name = `${values.first_name} ${values.last_name}`

      updateCart({
        shipping_address,
        billing_address,
        comments,
      })
      setStep(3)
    } else {
      checkout(values)
    }
  }

  const {
    settings,
    cart,
    customerProperties,
    paymentMethods,
    shippingMethods,
    shippingMethod,
    loadingShippingMethods,
    loadingPaymentMethods,
    checkoutFields,
    processingCheckout,
    cartlayerBtnInitialized,
  } = state

  const {
    checkoutInputClass = "checkout-field",
    checkoutButtonClass = "checkout-button",
    checkoutEditButtonClass = "checkout-button-edit",
  } = themeSettings

  if (cart && cart.items.length > 0) {
    const showPaymentForm = isShowPaymentForm()

    let shippingMethod = null
    let paymentMethod = null
    const { shipping_method_id, payment_method_id } = cart
    if (shipping_method_id && shippingMethods && shippingMethods.length > 0) {
      shippingMethod = shippingMethods.find(
        method => method.id === shipping_method_id
      )
    }
    if (payment_method_id && paymentMethods && paymentMethods.length > 0) {
      paymentMethod = paymentMethods.find(
        method => method.id === payment_method_id
      )
    }

    return (
      <div className="checkout-form">
        <CheckoutStepContacts
          isReadOnly={step > 1}
          step={step}
          title={text.customerDetails}
          inputClassName={checkoutInputClass}
          buttonClassName={checkoutButtonClass}
          editButtonClassName={checkoutEditButtonClass}
          initialValues={cart}
          settings={settings}
          customerProperties={customerProperties}
          paymentMethods={paymentMethods}
          shippingMethod={shippingMethod}
          shippingMethods={shippingMethods}
          loadingShippingMethods={loadingShippingMethods}
          loadingPaymentMethods={loadingPaymentMethods}
          checkoutFields={checkoutFields}
          onEdit={() => setStep(1)}
          onSubmit={handleContactsSubmit}
          saveShippingMethod={handleShippingMethodSave}
          savePaymentMethod={paymentMethodID =>
            updateCart({
              payment_method_id: paymentMethodID,
            })
          }
          cartlayerBtnInitialized={cartlayerBtnInitialized}
        />

        <CheckoutStepShipping
          show={step >= 2}
          step={step}
          isReadOnly={step > 2}
          title={text.shipping}
          inputClassName={checkoutInputClass}
          buttonClassName={checkoutButtonClass}
          editButtonClassName={checkoutEditButtonClass}
          initialValues={cart}
          settings={settings}
          processingCheckout={processingCheckout}
          shippingMethod={shippingMethod}
          paymentMethod={paymentMethod}
          checkoutFields={checkoutFields}
          showPaymentForm={showPaymentForm}
          onSave={() => setStep(3)}
          onEdit={() => setStep(2)}
          onSubmit={handleShippingSubmit}
        />

        {showPaymentForm && (
          <CheckoutStepPayment
            show={step === 3}
            step={step}
            title={text.payment}
            inputClassName={checkoutInputClass}
            buttonClassName={checkoutButtonClass}
            cart={cart}
            settings={settings}
            processingCheckout={processingCheckout}
            handleSuccessPayment={() => checkout(null)}
            onCreateToken={(tokenID: string) =>
              updateCart(
                {
                  payment_token: tokenID,
                },
                cart => {
                  checkout(null)
                }
              )
            }
          />
        )}
      </div>
    )
  }

  return <p>{text.emptyCheckout}</p>
}

export default CheckoutForm

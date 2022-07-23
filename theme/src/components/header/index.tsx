import Lscache from "lscache"
import React, { FC, Fragment, useEffect, useState } from "react"
import { NavLink } from "react-router-dom"
import { text } from "../../lib/settings"
import Cart from "./cart"
import CartIndicator from "./cartIndicator"
import HeadMenu from "./headMenu"
import Login from "./login"
import SearchBox from "./searchBox"

const Logo = ({ src, onClick, alt }) => (
  <NavLink className="logo-image" to="/" onClick={onClick}>
    <img src={src} alt={alt} />
  </NavLink>
)

const BurgerButton = ({ onClick, className }) => (
  <span className={className} onClick={onClick}>
    <span />
    <span />
    <span />
  </span>
)

const BackButton = ({ onClick }) => (
  <span
    className="navbar-item is-hidden-tablet is-flex-mobile"
    onClick={onClick}
  >
    <img
      className="icon"
      src="/assets/images/arrow_back.svg"
      style={{ width: 18 }}
    />
  </span>
)

const state = {
  MENU: "menu",
  CART: "cart",
  SITE: "site",
}

interface Props {
  state
  cartLayerInitialized
  loggedinUserTimeUp
  setLocation
  customerData
  setSearch
  goBack
  deleteCartItem
}

const Header: FC<Props> = props => {
  const [siteState, setSiteState] = useState(state.SITE)
  const [mobileSearchIsActive, setMobileSearchIsActive] = useState(false)

  const {
    cartLayerInitialized,
    loggedinUserTimeUp,
    setLocation,
    customerData,
    setSearch,
    goBack,
    deleteCartItem,
  } = props

  useEffect(() => {
    if (props.state.currentPage.path !== "/checkout") {
      updateSiteState(state.CART)
    }
  }, [props.state.cart, props.state.currentPage])

  const mobileMenuIsActive = () => {
    return siteState === state.MENU
  }

  const cartIsActive = () => {
    return siteState === state.CART
  }

  const updateSiteState = state => {
    setSiteState(state)
    handleState(state)
  }

  const handleState = newState => {
    switch (newState) {
      case state.CART:
        document.body.classList.add("noscroll")
        if (mobileSearchIsActive) {
          searchToggle()
        }
        break
      case state.MENU:
        document.body.classList.add("noscroll")
        break
      case state.SITE:
        document.body.classList.remove("noscroll")
        break
    }
  }

  const menuToggle = () => {
    let newState = siteState == state.MENU ? state.SITE : state.MENU
    updateSiteState(newState)
  }

  const searchToggle = () => {
    setMobileSearchIsActive(value => !value)
    document.body.classList.toggle("search-active")
  }

  const cartToggle = () => {
    let newState = siteState == state.CART ? state.SITE : state.CART
    updateSiteState(newState)

    if (
      props.state.cart &&
      props.state.cart.items &&
      props.state.cart.items.length > 0
    ) {
      cartLayerInitialized({
        cartlayerBtnInitialized: true,
      })
    }
  }

  const handleLogin = () => {
    Lscache.flushExpired()
    if (Lscache.get("auth_data") === null) {
      loggedinUserTimeUp({
        authenticated: false,
      })
      setLocation("/login")
    } else {
      customerData({
        token: Lscache.get("auth_data"),
      })
      setLocation("/customer-account")
    }
  }

  const handleSearch = search => {
    if (props.state.currentPage.path === "/search") {
      setSearch(search)
    } else {
      if (search && search !== "") {
        setLocation("/search?search=" + search)
      }
    }
  }

  const handleGoBack = () => {
    updateSiteState(state.SITE)
    goBack()
  }

  const {
    categories,
    cart,
    settings,
    currentPage,
    location,
    productFilter,
    cartlayerBtnInitialized,
  } = props.state

  const classToggle = mobileMenuIsActive()
    ? "navbar-burger is-hidden-tablet is-active"
    : "navbar-burger is-hidden-tablet"
  const showBackButton = currentPage.type === "product" && location.hasHistory

  return (
    <Fragment>
      <header className={mobileSearchIsActive ? "search-active" : ""}>
        <div className="container">
          <div className="columns is-gapless is-mobile header-container">
            <div className="column is-4 column-burger">
              {!showBackButton && (
                <BurgerButton onClick={menuToggle} className={classToggle} />
              )}
              {showBackButton && <BackButton onClick={handleGoBack} />}
            </div>

            <div className="column is-4 has-text-centered column-logo">
              <Logo
                src={settings.logo}
                onClick={() => updateSiteState(state.SITE)}
                alt="logo"
              />
            </div>

            <div className="column is-4 has-text-right header-block-right">
              <span
                className="icon icon-search is-hidden-tablet"
                onClick={searchToggle}
              >
                <img
                  src="/assets/images/search.svg"
                  alt={text.search}
                  title={text.search}
                  style={{ minWidth: 24 }}
                />
              </span>
              <SearchBox
                value={productFilter.search}
                onSearch={handleSearch}
                className={mobileSearchIsActive ? "search-active" : ""}
              />
              <Login onClick={handleLogin} />
              <CartIndicator
                cart={cart}
                onClick={cartToggle}
                cartIsActive={cartIsActive()}
                cartlayerBtnInitialized={cartlayerBtnInitialized}
              />
              <div className={cartIsActive() ? "mini-cart-open" : ""}>
                <Cart
                  cart={cart}
                  deleteCartItem={deleteCartItem}
                  settings={settings}
                  cartToggle={cartToggle}
                  cartlayerBtnInitialized={cartlayerBtnInitialized}
                />
              </div>
            </div>
          </div>

          <div className="primary-nav is-hidden-mobile">
            <HeadMenu
              categories={categories}
              location={location}
              isMobile={false}
            />
          </div>
        </div>
      </header>

      <div
        className={
          mobileMenuIsActive() || cartIsActive() ? "dark-overflow" : ""
        }
        onClick={() => updateSiteState(state.SITE)}
      />
      <div
        className={
          "mobile-nav is-hidden-tablet" +
          (mobileMenuIsActive() ? " mobile-nav-open" : "")
        }
      >
        <HeadMenu
          isMobile={true}
          categories={categories}
          location={location}
          onClick={() => updateSiteState(state.SITE)}
        />
      </div>
    </Fragment>
  )
}

export default Header

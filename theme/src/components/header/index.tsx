import Lscache from "lscache"
import React, { Fragment } from "react"
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

class Header extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      siteState: state.SITE,
      mobileSearchIsActive: false,
    }
  }

  componentWillReceiveProps(nextProps) {
    if (
      this.props.state.cart !== nextProps.state.cart &&
      this.props.state.currentPage.path !== "/checkout"
    ) {
      this.setSiteState(state.CART)
    }
  }

  mobileMenuIsActive = () => {
    return this.state.siteState === state.MENU
  }

  cartIsActive = () => {
    return this.state.siteState === state.CART
  }

  setSiteState(state) {
    this.setState({ siteState: state })
    this.handleState(state)
  }

  handleState(newState) {
    switch (newState) {
      case state.CART:
        document.body.classList.add("noscroll")
        if (this.state.mobileSearchIsActive) {
          this.searchToggle()
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

  menuToggle = () => {
    let newState = this.state.siteState == state.MENU ? state.SITE : state.MENU
    this.setSiteState(newState)
  }

  searchToggle = () => {
    this.setState({
      mobileSearchIsActive: !this.state.mobileSearchIsActive,
    })
    document.body.classList.toggle("search-active")
  }

  cartToggle = () => {
    let newState = this.state.siteState == state.CART ? state.SITE : state.CART
    this.setSiteState(newState)

    if (
      this.props.state.cart &&
      this.props.state.cart.items &&
      this.props.state.cart.items.length > 0
    ) {
      this.props.cartLayerInitialized({
        cartlayerBtnInitialized: true,
      })
    }
  }

  handleLogin = () => {
    Lscache.flushExpired()
    if (Lscache.get("auth_data") === null) {
      this.props.loggedinUserTimeUp({
        authenticated: false,
      })
      this.props.setLocation("/login")
    } else {
      this.props.customerData({
        token: Lscache.get("auth_data"),
      })
      this.props.setLocation("/customer-account")
    }
  }

  handleSearch = search => {
    if (this.props.state.currentPage.path === "/search") {
      this.props.setSearch(search)
    } else {
      if (search && search !== "") {
        this.props.setLocation("/search?search=" + search)
      }
    }
  }

  handleGoBack = () => {
    this.setSiteState(state.SITE)
    this.props.goBack()
  }

  render() {
    const {
      categories,
      cart,
      settings,
      currentPage,
      location,
      productFilter,
      cartlayerBtnInitialized,
    } = this.props.state

    const classToggle = this.mobileMenuIsActive()
      ? "navbar-burger is-hidden-tablet is-active"
      : "navbar-burger is-hidden-tablet"
    const showBackButton = currentPage.type === "product" && location.hasHistory

    return (
      <Fragment>
        <header
          className={this.state.mobileSearchIsActive ? "search-active" : ""}
        >
          <div className="container">
            <div className="columns is-gapless is-mobile header-container">
              <div className="column is-4 column-burger">
                {!showBackButton && (
                  <BurgerButton
                    onClick={this.menuToggle}
                    className={classToggle}
                  />
                )}
                {showBackButton && <BackButton onClick={this.handleGoBack} />}
              </div>

              <div className="column is-4 has-text-centered column-logo">
                <Logo
                  src={settings.logo}
                  onClick={() => this.setSiteState(state.SITE)}
                  alt="logo"
                />
              </div>

              <div className="column is-4 has-text-right header-block-right">
                <span
                  className="icon icon-search is-hidden-tablet"
                  onClick={this.searchToggle}
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
                  onSearch={this.handleSearch}
                  className={
                    this.state.mobileSearchIsActive ? "search-active" : ""
                  }
                />
                <Login onClick={this.handleLogin} />
                <CartIndicator
                  cart={cart}
                  onClick={this.cartToggle}
                  cartIsActive={this.cartIsActive()}
                  cartlayerBtnInitialized={cartlayerBtnInitialized}
                />
                <div className={this.cartIsActive() ? "mini-cart-open" : ""}>
                  <Cart
                    cart={cart}
                    deleteCartItem={this.props.deleteCartItem}
                    settings={settings}
                    cartToggle={this.cartToggle}
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
            this.mobileMenuIsActive() || this.cartIsActive()
              ? "dark-overflow"
              : ""
          }
          onClick={() => this.setSiteState(state.SITE)}
        />
        <div
          className={
            "mobile-nav is-hidden-tablet" +
            (this.mobileMenuIsActive() ? " mobile-nav-open" : "")
          }
        >
          <HeadMenu
            isMobile={true}
            categories={categories}
            location={location}
            onClick={() => this.setSiteState(state.SITE)}
          />
        </div>
      </Fragment>
    )
  }
}

export default Header

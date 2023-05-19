import React, { Fragment } from "react"
import { NavLink } from "react-router-dom"
import Lscache from "lscache"
import { themeSettings, text } from "../../lib/settings"
import Cart from "./cart"
import CartIndicator from "./cartIndicator"
import SearchBox from "./searchBox"
import HeadMenu from "./headMenu"

class HeaderBottomMenu extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isActive: false,
    }
  }

  isActiveToggle = () => {
    this.setState({
      isActive: !this.state.isActive,
    })
  }

  render() {
    const { title, items } = this.props
    let ulItems = null

    if (items && items.length > 0) {
      ulItems = items.map((item, index) => (
        <li className="navigation-menu__item" key={index}>
          <NavLink to={item.url || ""}>{item.text}</NavLink>
        </li>
      ))
    }

    return <ul className="navigation-menu__list">{ulItems}</ul>
  }
}

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
    <img className="icon" src="/assets/images/arrow_back.svg" />
  </span>
)

export default class Header extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      mobileMenuIsActive: false,
      mobileSearchIsActive: false,
      mobileCatalogIsActive: false,
      cartIsActive: false,
      isScrolled: false,
    }
  }

  componentDidMount() {
    window.addEventListener("scroll", this.handleScroll)
  }

  componentWillReceiveProps(nextProps) {
    if (
      this.props.state.cart !== nextProps.state.cart &&
      this.props.state.currentPage.path !== "/checkout"
    ) {
      this.showCart()
    }
  }

  componentWillUnmountn() {
    window.removeEventListener("scroll", this.handleScroll)
  }

  handleScroll = event => {
    const scrollTop = window.scrollY
    const isScrolled = scrollTop > 0

    this.setState({
      isScrolled,
    })
  }

  menuToggle = () => {
    this.setState({
      mobileMenuIsActive: !this.state.mobileMenuIsActive,
      cartIsActive: false,
      mobileCatalogIsActive: false,
    })
    document.body.classList.toggle("noscroll")
  }

  catalogToggle = () => {
    this.setState({
      mobileCatalogIsActive: !this.state.mobileCatalogIsActive,
      cartIsActive: false,
      mobileMenuIsActive: false,
    })
    document.body.classList.toggle("noscroll")
  }

  searchToggle = () => {
    this.setState({
      mobileSearchIsActive: !this.state.mobileSearchIsActive,
    })
    document.body.classList.toggle("search-active")
  }

  menuClose = () => {
    this.setState({ mobileMenuIsActive: false })
    document.body.classList.remove("noscroll")
  }

  catalogClose = () => {
    this.setState({ mobileCatalogIsActive: false })
    document.body.classList.remove("noscroll")
  }

  closeAll = () => {
    this.setState({
      cartIsActive: false,
      mobileMenuIsActive: false,
    })
    document.body.classList.remove("noscroll")
  }

  cartToggle = () => {
    this.setState({
      cartIsActive: !this.state.cartIsActive,
      mobileMenuIsActive: false,
    })

    if (
      this.props.state.cart &&
      this.props.state.cart.items &&
      this.props.state.cart.items.length > 0
    ) {
      this.props.cartLayerInitialized({
        cartlayerBtnInitialized: true,
      })
    }
    document.body.classList.remove("noscroll")
  }

  showCart = () => {
    this.setState({
      cartIsActive: true,
      mobileMenuIsActive: false,
    })
    document.body.classList.add("noscroll")
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
        authenticated: true,
      })
      this.props.setLocation("/customer-account")
    }
    this.closeAll()
  }

  handleSearch = search => {
    if (this.props.state.currentPage.path === "/search") {
      this.props.setSearch(search)
    } else if (search && search !== "") {
      this.props.setLocation(`/search?search=${search}`)
    }
  }

  handleGoBack = () => {
    this.closeAll()
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

    const classToggle = this.state.mobileMenuIsActive
      ? "navbar-burger is-hidden-tablet is-active"
      : "navbar-burger is-hidden-tablet"
    const showBackButton = currentPage.type === "product" && location.hasHistory

    return (
      <Fragment>
        <div style={{ display: "none" }}>
          <svg
            id="close"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 371.23 371.23"
          >
            <path d="M371.23 21.213L350.018 0 185.615 164.402 21.213 0 0 21.213l164.402 164.402L0 350.018l21.213 21.212 164.402-164.402L350.018 371.23l21.212-21.212-164.402-164.403z" />
          </svg>
        </div>
        <header
          className={
            this.state.isScrolled ? "header header_scrolled" : "header"
          }
        >
          <div className="header__top">
            <div className="header__logo logo">
              <Logo src={settings.logo} onClick={this.closeAll} alt="logo" />
            </div>

            <div className="header__contacts header-contacts is-hidden-mobile">
              <div className="header-contacts__item">
                <span className="header-contacts__icon header-contacts__icon_address">
                  <img src="/assets/images/icons/pin.svg" alt="" title="" />
                </span>
                {themeSettings.footer_contacts[0].text},{" "}
                {themeSettings.footer_contacts[1].text}
              </div>
              <div className="header-contacts__item">
                <span className="header-contacts__icon header-contacts__icon_time">
                  <img src="/assets/images/icons/clocks.svg" alt="" title="" />
                </span>
                10:00 – 22:00
              </div>
              <a
                href="tel:+10000000000"
                className="header-contacts__phone header-contacts__item"
              >
                <span className="header-contacts__icon header-contacts__icon_phone">
                  <img
                    src="/assets/images/icons/phone_small.svg"
                    alt=""
                    title=""
                  />
                </span>
                +1 (000) 000-00-00
              </a>
              <a
                href="https://wa.me/10000000000"
                target="_blank"
                rel="noopener noreferrer"
                className="header-contacts__item"
              >
                <span className="header-contacts__icon header-contacts__icon_whatsapp">
                  <img
                    src="/assets/images/icons/whatsapp.svg"
                    alt=""
                    title=""
                  />
                </span>
              </a>
            </div>

            <CartIndicator
              cart={cart}
              onClick={this.cartToggle}
              cartIsActive={this.state.cartIsActive}
              cartlayerBtnInitialized={cartlayerBtnInitialized}
              settings={settings}
            />

            <div className="header__burger">
              {!showBackButton && (
                <BurgerButton
                  onClick={this.menuToggle}
                  className="navbar-burger is-hidden-tablet"
                />
              )}
              {showBackButton && <BackButton onClick={this.handleGoBack} />}
            </div>

            <div className={this.state.cartIsActive ? "mini-cart-open" : ""}>
              <div className="mini-cart">
                <button
                  type="button"
                  className="modal-close"
                  onClick={this.cartToggle}
                >
                  <svg className="icon" width="28">
                    <use xlinkHref="#close" />
                  </svg>
                </button>
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

          <div className="header__bottom ">
            <div className="header__navigation">
              <button
                type="button"
                onClick={this.catalogToggle}
                className="navigation__catalog-button button button_catalog"
              >
                <BurgerButton className="navbar-burger navbar-burger_catalog is-hidden-mobile" />
                <img
                  src="/assets/images/icons/icon_catalog.svg"
                  className="catalog__icon is-hidden-tablet"
                  alt=""
                  title=""
                />
                Catalog
              </button>
              <nav className="navigation__menu">
                <HeaderBottomMenu items={themeSettings.footer_menu_2_items} />
              </nav>
            </div>

            <SearchBox
              value={productFilter.search}
              onSearch={this.handleSearch}
              className={this.state.mobileSearchIsActive ? "search-active" : ""}
            />
          </div>
        </header>

        <div
          className={
            this.state.mobileMenuIsActive ||
            this.state.cartIsActive ||
            this.state.mobileCatalogIsActive
              ? "dark-overflow"
              : ""
          }
          onClick={this.closeAll}
        />
        <div
          className={`mobile-menu is-hidden-tablet${
            this.state.mobileMenuIsActive ? " mobile-menu-open" : ""
          }`}
        >
          <button
            type="button"
            className="modal-close"
            onClick={this.menuToggle}
          >
            <svg className="icon" width="28">
              <use xlinkHref="#close" />
            </svg>
          </button>

          <div className="mobile-menu__contacts header-contacts">
            <div className="header-contacts__item">
              <span className="header-contacts__icon">
                <img src="/assets/images/icons/pin.svg" alt="" title="" />
              </span>
              {themeSettings.footer_contacts[0].text},{" "}
              {themeSettings.footer_contacts[1].text}
            </div>
            <div className="header-contacts__item">
              <span className="header-contacts__icon">
                <img src="/assets/images/icons/clocks.svg" alt="" title="" />
              </span>
              10:00 – 22:00
            </div>
            <a
              href="tel:+10000000000"
              className="header-contacts__phone header-contacts__item"
            >
              <span className="header-contacts__icon">
                <img
                  src="/assets/images/icons/phone_small.svg"
                  alt=""
                  title=""
                />
              </span>
              +1 (000) 000-00-00
            </a>
            <a
              href="https://wa.me/10000000000"
              target="_blank"
              className=" header-contacts__item"
            >
              <span className="header-contacts__icon">
                <img src="/assets/images/icons/whatsapp.svg" alt="" title="" />
              </span>
            </a>
          </div>
        </div>

        <div
          className={`catalog-nav ${
            this.state.mobileCatalogIsActive ? " catalog-nav-open" : ""
          }`}
        >
          <button
            type="button"
            className="modal-close is-hidden-tablet"
            onClick={this.catalogToggle}
          >
            <svg className="icon" width="28">
              <use xlinkHref="#close" />
            </svg>
          </button>
          <button
            type="button"
            onClick={this.catalogToggle}
            className="navigation__catalog-button button button_catalog is-hidden-mobile"
          >
            <BurgerButton className="navbar-burger navbar-burger_catalog is-active" />
            Catalog
          </button>
          <div className="catalog-nav__title is-hidden-tablet">Catalog</div>
          <HeadMenu
            isMobile
            categories={categories}
            location={location}
            onClick={this.catalogClose}
          />
        </div>
      </Fragment>
    )
  }
}

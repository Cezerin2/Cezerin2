import React, { FC, useEffect, useState } from "react"
import { connect } from "react-redux"
import { Route, useLocation } from "react-router-dom"
import { animateScroll } from "react-scroll"
import { setCurrentPage } from "./actions"
import AccountContainer from "./containers/account"
import CategoryContainer from "./containers/category"
import CheckoutContainer from "./containers/checkout"
import CheckoutSuccessContainer from "./containers/checkoutSuccess"
import ForgotPasswordContainer from "./containers/forgotPassword"
import IndexContainer from "./containers/index"
import LoginContainer from "./containers/login"
import NotFoundContainer from "./containers/notfound"
import PageContainer from "./containers/page"
import ProductContainer from "./containers/product"
import RegisterContainer from "./containers/register"
import ResetPasswordContainer from "./containers/resetPassword"
import SearchContainer from "./containers/search"
import SharedContainer from "./containers/shared"
import { PAGE, PRODUCT, PRODUCT_CATEGORY, SEARCH } from "./pageTypes"

interface Props {
  currentPage
  setCurrentPageDispatch
}

const SwitchContainers: FC<Props> = props => {
  const location = useLocation()
  const [prevLocation, setPrevLocation] = useState(location)

  const { currentPage, setCurrentPageDispatch } = props

  const routes = [
    { path: "/", component: <IndexContainer /> },
    { path: "/login", component: <LoginContainer /> },
    { path: "/register", component: <RegisterContainer /> },
    { path: "/customer-account", component: <AccountContainer /> },
    {
      path: "/forgot-password",
      component: <ForgotPasswordContainer />,
    },
    { path: "/reset-password", component: <ResetPasswordContainer /> },
    { path: "/checkout", component: <CheckoutContainer /> },
    {
      path: "/checkout-success",
      component: <CheckoutSuccessContainer />,
    },
  ]

  useEffect(() => {
    setCurrentPageDispatch(location)

    if (location && prevLocation) {
      const pathnameChanged = location.pathname !== prevLocation.pathname
      const queryChanged = location.search !== prevLocation.search
      const isSearchPage = location.pathname === "/search"

      if (pathnameChanged || (queryChanged && isSearchPage))
        animateScroll.scrollToTop({
          duration: 500,
          delay: 100,
          smooth: true,
        })
    }

    setPrevLocation(location)
  }, [location])

  switch (currentPage.type) {
    case PRODUCT:
      return <ProductContainer />
    case PRODUCT_CATEGORY:
      return <CategoryContainer />
    case SEARCH:
      return <SearchContainer />
    case PAGE:
      return (
        routes.find(({ path }) => path === location.pathname)?.component || (
          <PageContainer />
        )
      )
    default:
      return <NotFoundContainer />
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    currentPage: state.app.currentPage,
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    setCurrentPageDispatch: location => {
      dispatch(setCurrentPage(location))
    },
  }
}

const SwitchContainersConnected = connect(
  mapStateToProps,
  mapDispatchToProps
)(SwitchContainers)

const App = () => (
  <SharedContainer>
    <Route component={SwitchContainersConnected} />
  </SharedContainer>
)

export default App

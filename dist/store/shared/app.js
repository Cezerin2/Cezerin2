import React from 'react';
import { Route } from 'react-router';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { animateScroll } from 'react-scroll';

import IndexContainer from './containers/index';
import SharedContainer from './containers/shared';
import CategoryContainer from './containers/category';
import ProductContainer from './containers/product';
import PageContainer from './containers/page';
import CheckoutContainer from './containers/checkout';
import CheckoutSuccessContainer from './containers/checkoutSuccess';
import NotFoundContainer from './containers/notfound';
import SearchContainer from './containers/search';
import LoginContainer from './containers/login';
import RegisterContainer from './containers/register';
import AccountContainer from './containers/account';
import ForgotPasswordContainer from './containers/forgotPassword';
import ResetPasswordContainer from './containers/resetPassword';

import { setCurrentPage } from './actions';
import { PAGE, PRODUCT_CATEGORY, PRODUCT, RESERVED, SEARCH } from './pageTypes';

class SwitchContainers extends React.Component {
	constructor(props) {
		super(props);
	}

	componentWillReceiveProps(nextProps) {
		this.props.setCurrentPage(nextProps.location);

		if (nextProps.location && this.props.location) {
			const pathnameChanged = nextProps.location.pathname !== this.props.location.pathname;
			const queryChanged = nextProps.location.search !== this.props.location.search;
			const isSearchPage = nextProps.location.pathname === '/search';

			if (pathnameChanged || queryChanged && isSearchPage) {
				animateScroll.scrollToTop({
					duration: 500,
					delay: 100,
					smooth: true
				});
			}
		}
	}

	render() {
		const { history, location, currentPage } = this.props;
		const locationPathname = location && location.pathname ? location.pathname : '/';
		switch (currentPage.type) {
			case PRODUCT:
				return React.createElement(ProductContainer, null);
			case PRODUCT_CATEGORY:
				return React.createElement(CategoryContainer, null);
			case SEARCH:
				return React.createElement(SearchContainer, null);
			case PAGE:
				if (locationPathname === '/login') {
					return React.createElement(LoginContainer, null);
				}
				if (locationPathname === '/register') {
					return React.createElement(RegisterContainer, null);
				}
				if (locationPathname === '/customer-account') {
					return React.createElement(AccountContainer, null);
				}
				if (locationPathname === '/forgot-password') {
					return React.createElement(ForgotPasswordContainer, null);
				}
				if (locationPathname === '/reset-password') {
					return React.createElement(ResetPasswordContainer, null);
				}
				if (locationPathname === '/') {
					return React.createElement(IndexContainer, null);
				} else if (locationPathname === '/checkout') {
					return React.createElement(CheckoutContainer, null);
				}
				if (locationPathname === '/checkout-success') {
					return React.createElement(CheckoutSuccessContainer, null);
				} else {
					return React.createElement(PageContainer, null);
				}
			default:
				return React.createElement(NotFoundContainer, null);
		}
	}
}

const mapStateToProps = (state, ownProps) => {
	return {
		currentPage: state.app.currentPage
	};
};

const mapDispatchToProps = (dispatch, ownProps) => {
	return {
		setCurrentPage: location => {
			dispatch(setCurrentPage(location));
		}
	};
};

const SwitchContainersConnected = connect(mapStateToProps, mapDispatchToProps)(SwitchContainers);

const App = () => React.createElement(
	SharedContainer,
	null,
	React.createElement(Route, { component: SwitchContainersConnected })
);

export default App;
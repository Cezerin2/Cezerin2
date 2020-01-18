import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { updateProduct } from '../../actions';
import ProductPricingForm from './components/form';

const mapStateToProps = (state, ownProps) => {
	return {
		settings: state.settings.settings,
		initialValues: state.products.editProduct
	};
};

const mapDispatchToProps = (dispatch, ownProps) => {
	return {
		onSubmit: values => {
			dispatch(
				updateProduct({
					id: values.id,
					regular_price: values.regular_price,
					sale_price: values.sale_price,
					date_sale_from: values.date_sale_from,
					date_sale_to: values.date_sale_to
				})
			);
		}
	};
};

export default withRouter(
	connect(mapStateToProps, mapDispatchToProps)(ProductPricingForm)
);

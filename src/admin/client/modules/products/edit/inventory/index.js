import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { updateProduct } from '../../actions';
import ProductInventoryForm from './components/form';

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
					sku: values.sku,
					stock_quantity: values.stock_quantity,
					weight: values.weight,
					date_stock_expected: values.date_stock_expected,
					stock_tracking: values.stock_tracking,
					stock_preorder: values.stock_preorder,
					stock_backorder: values.stock_backorder,
					discontinued: values.discontinued,
					enabled: values.enabled
				})
			);
		}
	};
};

export default withRouter(
	connect(mapStateToProps, mapDispatchToProps)(ProductInventoryForm)
);

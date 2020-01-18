import React from 'react';
import { Link } from 'react-router-dom';
import { Field, reduxForm } from 'redux-form';
import { TextField, SelectField, DatePicker } from 'redux-form-material-ui';
import { CustomToggle } from 'modules/shared/form';

import messages from 'lib/text';
import style from './style.css';
import api from 'lib/api';

import Paper from 'material-ui/Paper';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import Divider from 'material-ui/Divider';

const validate = values => {
	const errors = {};
	const requiredFields = ['name'];
	const numberFields = ['regular_price', 'sale_price'];

	requiredFields.map(field => {
		if (values && !values[field]) {
			errors[field] = messages.errors_required;
		}
	});

	numberFields.map(field => {
		if (values && values[field] && isNaN(parseFloat(values[field]))) {
			errors[field] = messages.errors_number;
		}
	});

	return errors;
};

const slugExists = values => {
	if (values.slug && values.slug.length > 0) {
		return api.products
			.slugExists(values.id, values.slug)
			.then(response => response.status === 200);
	} else {
		return Promise.resolve(false);
	}
};

const skuExists = values => {
	if (values.sku && values.sku.length > 0) {
		return api.products
			.skuExists(values.id, values.sku)
			.then(response => response.status === 200);
	} else {
		return Promise.resolve(false);
	}
};

const asyncValidate = values => {
	return Promise.all([slugExists(values), skuExists(values)]).then(
		([isSlugExists, isSkuExists]) => {
			let errors = {};

			if (isSlugExists) {
				errors.slug = messages.errors_urlTaken;
			}

			if (isSkuExists) {
				errors.sku = messages.skuTaken;
			}

			if (Object.keys(errors).length > 0) {
				return Promise.reject(errors);
			} else {
				return Promise.resolve();
			}
		}
	);
};

const ProductPricingForm = ({
	handleSubmit,
	pristine,
	reset,
	submitting,
	initialValues,
	settings
}) => {
	return (
		<form onSubmit={handleSubmit}>
			<Paper className="paper-box" zDepth={1}>
				<div className={style.innerBox}>
					<div className="row" style={{ marginBottom: 50 }}>
						<div className="col-xs-12">
							<div className="row">
								<div className="col-xs-6">
									<Field
										name="regular_price"
										component={TextField}
										floatingLabelText={
											messages.products_regularPrice +
											` (${settings.currency_symbol})`
										}
										fullWidth={true}
									/>
								</div>
								<div className="col-xs-6">
									<Field
										name="sale_price"
										component={TextField}
										floatingLabelText={
											messages.products_salePrice +
											` (${settings.currency_symbol})`
										}
										fullWidth={true}
									/>
								</div>
								<div className="col-xs-6">
									<Field
										name="date_sale_from"
										component={DatePicker}
										textFieldStyle={{ width: '100%' }}
										format={(value, name) => (value === '' ? null : value)}
										floatingLabelText={messages.products_dateSaleFrom}
									/>
								</div>
								<div className="col-xs-6">
									<Field
										name="date_sale_to"
										component={DatePicker}
										textFieldStyle={{ width: '100%' }}
										format={(value, name) => (value === '' ? null : value)}
										floatingLabelText={messages.products_dateSaleTo}
									/>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div
					className={
						'buttons-box ' +
						(pristine ? 'buttons-box-pristine' : 'buttons-box-show')
					}
				>
					<FlatButton
						label={messages.cancel}
						className={style.button}
						onClick={reset}
						disabled={pristine || submitting}
					/>
					<RaisedButton
						type="submit"
						label={messages.save}
						primary={true}
						className={style.button}
						disabled={pristine || submitting}
					/>
				</div>
			</Paper>
		</form>
	);
};

export default reduxForm({
	form: 'ProductPricingForm',
	validate,
	asyncValidate,
	asyncBlurFields: ['sku'],
	enableReinitialize: true
})(ProductPricingForm);

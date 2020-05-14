import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { TextField } from 'redux-form-material-ui';

import messages from 'lib/text';
import { CustomToggle, MultiSelect } from 'modules/shared/form';

import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import style from './style.css';

const validate = values => {
	const errors = {};
	const requiredFields = ['from', 'to'];

	requiredFields.map(field => {
		if (!values.is_system && values && !values[field]) {
			errors[field] = messages.errors_required;
		}
	});

	return errors;
};

class EditRedirectForm extends React.Component {
	componentDidMount() {
		this.props.onLoad();
	}

	render() {
		const { handleSubmit, pristine, submitting, redirectId } = this.props;
		const isAdd = redirectId === null || redirectId === undefined;

		return (
			<div>
				<form onSubmit={handleSubmit}>
					<Paper className="paper-box" zDepth={1}>
						<div className={style.innerBox}>
							<Field
								name="from"
								component={TextField}
								floatingLabelText="From (e.g. /old-path)"
								fullWidth
							/>
							<Field
								name="to"
								component={TextField}
								floatingLabelText="To (e.g. /new-path)"
								fullWidth
							/>
						</div>
						<div
							className={`buttons-box ${
								pristine && !isAdd ? 'buttons-box-pristine' : 'buttons-box-show'
							}`}
						>
							<RaisedButton
								type="submit"
								label={isAdd ? messages.add : messages.save}
								primary
								className={style.button}
								disabled={pristine || submitting}
							/>
						</div>
					</Paper>
				</form>
			</div>
		);
	}
}

export default reduxForm({
	form: 'EditRedirectForm',
	validate,
	enableReinitialize: true
})(EditRedirectForm);

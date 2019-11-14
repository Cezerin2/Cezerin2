import React, { Fragment } from 'react';
import { themeSettings, text } from '../lib/settings';
import MetaTags from '../components/metaTags';
import ResetPassword from '../components/resetPassword/index';

const ResetPasswordContainer = props => {
	const {
		state: { pageDetails, loginUser }
	} = props;

	return React.createElement(
		Fragment,
		null,
		React.createElement(
			'section',
			{ className: 'section' },
			React.createElement(
				'div',
				{ className: 'container' },
				React.createElement(
					'div',
					{ className: 'content' },
					React.createElement(ResetPassword, props)
				)
			)
		)
	);
};

export default ResetPasswordContainer;
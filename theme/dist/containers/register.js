import React, { Fragment } from 'react';
import { themeSettings, text } from '../lib/settings';
import MetaTags from '../components/metaTags';
import Register from '../components/register';

const RegisterContainer = props => {
	const {
		state: { pageDetails, settings }
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
					React.createElement(Register, props)
				)
			)
		)
	);
};

export default RegisterContainer;
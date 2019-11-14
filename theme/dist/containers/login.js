import React, { Fragment } from 'react';
import { themeSettings, text } from '../lib/settings';
import MetaTags from '../components/metaTags';
import Login from '../components/login/index';

const LoginContainer = props => {
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
					React.createElement(Login, props)
				)
			)
		)
	);
};

export default LoginContainer;
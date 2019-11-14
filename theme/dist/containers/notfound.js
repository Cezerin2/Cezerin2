import React, { Fragment } from 'react';
import { text } from '../lib/settings';
import MetaTags from '../components/metaTags';

const NotFoundContainer = () => React.createElement(
	Fragment,
	null,
	React.createElement(MetaTags, { title: text.title404 }),
	React.createElement(
		'section',
		{ className: 'section' },
		React.createElement(
			'div',
			{ className: 'container' },
			React.createElement(
				'div',
				{ className: 'content' },
				React.createElement(
					'h1',
					null,
					text.title404
				),
				text.text404
			)
		)
	)
);

export default NotFoundContainer;
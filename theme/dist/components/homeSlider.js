import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import ImageGallery from 'react-image-gallery';
import { themeSettings } from '../lib/settings';

const renderItem = item => React.createElement(
	'div',
	{ className: 'image-gallery-image' },
	React.createElement(
		NavLink,
		{ to: item.path || '' },
		React.createElement('img', { src: item.original, alt: item.title }),
		React.createElement(
			'div',
			{
				className: 'caption',
				style: { color: themeSettings.home_slider_color || '#fff' }
			},
			React.createElement(
				'div',
				{ className: 'caption-title' },
				item.title
			),
			React.createElement(
				'div',
				{ className: 'caption-description' },
				item.description
			)
		)
	)
);

const HomeSlider = ({ images }) => {
	if (images && images.length > 0) {
		const items = images.map(item => ({
			original: `/assets/images/${item.image}`,
			title: item.title,
			description: item.description,
			path: item.path || '',
			button: item.button
		}));

		return React.createElement(
			'section',
			{ className: 'section', style: { padding: 0 } },
			React.createElement(
				'div',
				null,
				React.createElement(
					'div',
					{ className: 'home-slider' },
					React.createElement(ImageGallery, {
						items: items,
						lazyLoad: true,
						showThumbnails: false,
						slideInterval: 2000,
						showNav: themeSettings.home_gallery_shownav === true,
						showBullets: images.length > 1,
						showPlayButton: false,
						showFullscreenButton: false,
						slideOnThumbnailHover: false,
						renderItem: renderItem
					})
				)
			)
		);
	}
	return null;
};

HomeSlider.propTypes = {
	images: PropTypes.arrayOf(PropTypes.shape({}))
};

HomeSlider.defaultProps = {
	images: null
};

export default HomeSlider;
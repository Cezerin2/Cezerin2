import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import { themeSettings, text } from '../lib/settings';

class FooterMenu extends React.Component {
	constructor(props) {
		super(props);

		this.isActiveToggle = () => {
			this.setState({
				isActive: !this.state.isActive
			});
		};

		this.state = {
			isActive: false
		};
	}

	render() {
		const { title, items } = this.props;
		let ulItems = null;

		if (items && items.length > 0) {
			ulItems = items.map((item, index) => React.createElement(
				'li',
				{ key: index },
				React.createElement(
					NavLink,
					{ to: item.url || '' },
					item.text
				)
			));
		}

		return React.createElement(
			'div',
			{ className: 'column is-3' },
			React.createElement(
				'div',
				{
					className: 'footer-title mobile-padding' + (this.state.isActive ? ' footer-menu-open' : ''),
					onClick: this.isActiveToggle
				},
				title,
				React.createElement('span', null)
			),
			React.createElement(
				'ul',
				{ className: 'footer-menu' },
				ulItems
			)
		);
	}
}

const SocialIcons = ({ icons }) => {
	if (icons && icons.length > 0) {
		const items = icons.map((icon, index) => React.createElement('a', {
			key: index,
			href: icon.url || '',
			target: '_blank',
			rel: 'noopener',
			title: icon.type,
			className: icon.type
		}));
		return React.createElement(
			'p',
			{ className: 'social-icons' },
			items
		);
	} else {
		return null;
	}
};

const Contacts = ({ contacts }) => {
	if (contacts && contacts.length > 0) {
		const items = contacts.map((item, index) => {
			const contact = item ? item.text : null;
			if (contact && contact.indexOf('@') > 0) {
				return React.createElement(
					'li',
					{ key: index },
					React.createElement(
						'a',
						{ href: 'mailto:' + contact },
						contact
					)
				);
			} else {
				return React.createElement(
					'li',
					{ key: index },
					contact
				);
			}
		});
		return React.createElement(
			'ul',
			{ className: 'footer-contacts' },
			items
		);
	} else {
		return null;
	}
};

export default class Footer extends React.PureComponent {

	render() {
		const { settings } = this.props;
		const footerLogoUrl = themeSettings.footer_logo_url && themeSettings.footer_logo_url.length > 0 ? '/assets/images/' + themeSettings.footer_logo_url : settings.logo;

		return React.createElement(
			'section',
			{ className: 'section section-footer' },
			React.createElement('hr', null),
			React.createElement(
				'footer',
				null,
				React.createElement(
					'div',
					{ className: 'container' },
					React.createElement(
						'div',
						{ className: 'content' },
						React.createElement(
							'div',
							{ className: 'columns is-gapless' },
							React.createElement(
								'div',
								{ className: 'column is-5' },
								React.createElement(
									'div',
									{ className: 'mobile-padding' },
									React.createElement(
										'div',
										{ className: 'footer-logo' },
										React.createElement('img', { src: footerLogoUrl, alt: 'logo' })
									),
									React.createElement(
										'p',
										null,
										React.createElement(
											'small',
											null,
											themeSettings.footer_about
										)
									),
									React.createElement(Contacts, { contacts: themeSettings.footer_contacts }),
									React.createElement(SocialIcons, { icons: themeSettings.footer_social })
								)
							),
							React.createElement('div', { className: 'column is-1 is-hidden-mobile' }),
							React.createElement(FooterMenu, {
								title: themeSettings.footer_menu_1_title,
								items: themeSettings.footer_menu_1_items
							}),
							React.createElement(FooterMenu, {
								title: themeSettings.footer_menu_2_title,
								items: themeSettings.footer_menu_2_items
							})
						)
					)
				)
			)
		);
	}
}
Footer.propTypes = {
	settings: PropTypes.shape({}).isRequired
};
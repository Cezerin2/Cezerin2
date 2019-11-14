import React from 'react';
import { NavLink } from 'react-router-dom';
import { themeSettings, text } from '../../lib/settings';

export default class SearchBox extends React.Component {
	constructor(props) {
		super(props);

		this.handleChange = event => {
			this.setState({ value: event.target.value });
		};

		this.handleKeyPress = e => {
			if (e.keyCode === 13 || e.which === 13) {
				this.handleSearch();
			}
		};

		this.handleKeyDown = e => {
			if (e.keyCode === 27) {
				this.handleClear();
			}
		};

		this.handleSearch = () => {
			this.props.onSearch(this.state.value);
		};

		this.handleClear = () => {
			this.setState({ value: '' });
			this.props.onSearch('');
		};

		this.handleFocus = () => {
			this.setState({ hasFocus: true });
		};

		this.handleBlur = () => {
			this.setState({ hasFocus: false });
		};

		this.state = {
			value: props.value,
			hasFocus: false
		};
	}

	render() {
		const { hasFocus } = this.state;
		const placeholderText = themeSettings.search_placeholder && themeSettings.search_placeholder.length > 0 ? themeSettings.search_placeholder : text.searchPlaceholder;

		return React.createElement(
			'div',
			{
				className: 'search-box ' + this.props.className + (hasFocus ? ' has-focus' : '')
			},
			React.createElement('input', {
				className: 'search-input',
				type: 'text',
				placeholder: placeholderText,
				value: this.state.value,
				onChange: this.handleChange,
				onKeyPress: this.handleKeyPress,
				onKeyDown: this.handleKeyDown,
				onFocus: this.handleFocus,
				onBlur: this.handleBlur
			}),
			React.createElement('img', {
				className: 'search-icon-search',
				src: '/assets/images/search.svg',
				alt: text.search,
				title: text.search,
				onClick: this.handleSearch
			}),
			this.state.value && this.state.value !== '' && React.createElement('img', {
				className: 'search-icon-clear',
				src: '/assets/images/close.svg',
				onClick: this.handleClear
			})
		);
	}
}
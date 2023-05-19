import React from 'react';
import { NavLink } from 'react-router-dom';
import { themeSettings, text } from '../../lib/settings';

const LoginIcon = () => {
	return (
		<img
			src="/assets/images/login.svg"
			className="login-icon"
			alt={text.login}
			title={text.login}
		/>
	);
};

export default class Login extends React.PureComponent {
	render() {
		const { login, onClick } = this.props;
		return (
			<span className="login-button" onClick={onClick}>
				<LoginIcon />
			</span>
		);
	}
}

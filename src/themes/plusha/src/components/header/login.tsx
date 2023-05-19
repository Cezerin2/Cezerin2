import React from "react"
import { NavLink } from "react-router-dom"
import { themeSettings, text } from "../../lib/settings"

const LoginIcon = () => {
  return (
    <span className="login-icon">
      <img src="/assets/images/login.svg" alt={text.login} title={text.login} />
    </span>
  )
}

export default class Login extends React.PureComponent {
  render() {
    const { login, onClick, className } = this.props

    return (
      <span className={className} onClick={onClick}>
        <LoginIcon /> {text.login}
      </span>
    )
  }
}

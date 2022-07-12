import React, { FC } from "react"
import { text } from "../../lib/settings"

const LoginIcon = () => {
  return (
    <img
      src="/assets/images/login.svg"
      className="login-icon"
      alt={text.login}
      title={text.login}
      style={{
        marginTop: 12 + "px",
        minWidth: 32 + "px",
        minHeight: 29 + "px",
        maxWidth: 44 + "px",
        maxHeight: 28 + "px",
      }}
    />
  )
}

interface Props {
  login
  onClick
}

const Login: FC<Props> = props => {
  const { login, onClick } = props

  return (
    <span className="login-button" onClick={onClick}>
      <LoginIcon />
    </span>
  )
}

export default Login

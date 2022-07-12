import CezerinClient from "cezerin2-client"
import messages from "lib/text"
import * as auth from "lib/webstoreAuth"
import Paper from "material-ui/Paper"
import RaisedButton from "material-ui/RaisedButton"
import TextField from "material-ui/TextField"
import React, { FC, useEffect, useState } from "react"

const LoginForm: FC = () => {
  const [email, setEmail] = useState(
    localStorage.getItem("webstore_email") || ""
  )
  const [isFetching, setIsFetching] = useState(false)
  const [emailIsSent, setEmailIsSent] = useState(false)
  const [error, setError] = useState(null)

  const handleKeyPress = e => {
    if (e.keyCode === 13 || e.which === 13) {
      handleSubmit()
    }
  }

  const handleSubmit = () => {
    setIsFetching(true)
    setEmailIsSent(false)
    setError(null)

    CezerinClient.authorizeInWebStore(email, location.origin + "/admin").then(
      ({ status, json }) => {
        setIsFetching(false)
        setEmailIsSent(status === 200)
        setError(status !== 200 && json ? json.message : null)
      }
    )
  }

  useEffect(() => {
    auth.checkTokenFromUrl()
  }, [])

  let response = null
  if (isFetching) {
    response = (
      <div className="loginSuccessResponse">{messages.messages_loading}</div>
    )
  } else if (emailIsSent) {
    response = (
      <div className="loginSuccessResponse">{messages.loginLinkSent}</div>
    )
  } else if (emailIsSent === false && error) {
    response = <div className="loginErrorResponse">{error}</div>
  }

  return (
    <div className="row col-full-height center-xs middle-xs">
      <div className="col-xs-12 col-sm-8 col-md-6 col-lg-4">
        <Paper className="loginBox" zDepth={1}>
          <div className="loginTitle">{messages.webstoreLoginTitle}</div>
          <div className="loginDescription">{messages.loginDescription}</div>
          <div className="loginInput">
            <TextField
              type="email"
              value={email}
              onChange={({ target }) => setEmail(target.value)}
              onKeyPress={handleKeyPress}
              label={messages.email}
              fullWidth
              hintStyle={{ width: "100%" }}
              hintText={messages.email}
            />
          </div>
          <RaisedButton
            label={messages.loginButton}
            primary
            disabled={isFetching || emailIsSent}
            onClick={handleSubmit}
          />
          {response}
        </Paper>
      </div>
    </div>
  )
}

export default LoginForm

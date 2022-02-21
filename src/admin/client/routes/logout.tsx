import * as auth from "lib/auth"
import React from "react"

export default class Logout extends React.Component {
  componentWillMount() {
    auth.removeToken()
  }

  render() {
    return null
  }
}

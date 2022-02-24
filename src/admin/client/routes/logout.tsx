import * as auth from "lib/auth"
import React from "react"

class Logout extends React.Component {
  componentWillMount() {
    auth.removeToken()
  }

  render() {
    return null
  }
}

export default Logout

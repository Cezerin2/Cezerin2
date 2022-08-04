import React from "react"
import { connect } from "react-redux"
import { withRouter } from "react-router-dom"
import { AccountContainer } from "theme"
import { mapStateToProps, mapDispatchToProps } from "../containerProps"

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(AccountContainer)
)

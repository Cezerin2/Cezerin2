import React from "react"
import { connect } from "react-redux"
import { withRouter } from "react-router"
import { SharedContainer } from "cezerin2-theme"
import { mapStateToProps, mapDispatchToProps } from "../containerProps"

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(SharedContainer)
)

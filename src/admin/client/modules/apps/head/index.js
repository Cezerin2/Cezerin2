import React from "react"
import { connect } from "react-redux"
import { withRouter } from "react-router"
import Buttons from "./components/buttons"

const mapStateToProps = (state, ownProps) => ({})

const mapDispatchToProps = (dispatch, ownProps) => ({})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Buttons))

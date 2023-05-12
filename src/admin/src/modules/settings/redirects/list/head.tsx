import { connect } from "react-redux"
import { withRouter } from "react-router-dom"
import Buttons from "./components/headButtons"

const mapStateToProps = (state, ownProps) => ({})

const mapDispatchToProps = (dispatch, ownProps) => ({})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Buttons))

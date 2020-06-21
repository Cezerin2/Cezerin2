import { connect } from "react-redux"
import { withRouter } from "react-router"
import { LoginContainer } from "theme"
import { mapDispatchToProps, mapStateToProps } from "../containerProps"

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(LoginContainer)
)

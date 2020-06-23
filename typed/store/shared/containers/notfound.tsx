import { connect } from "react-redux"
import { withRouter } from "react-router"
import { NotFoundContainer } from "theme"
import { mapDispatchToProps, mapStateToProps } from "../containerProps"

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(NotFoundContainer)
)

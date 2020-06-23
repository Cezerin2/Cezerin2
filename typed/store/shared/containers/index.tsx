import { connect } from "react-redux"
import { withRouter } from "react-router"
import { IndexContainer } from "theme"
import { mapDispatchToProps, mapStateToProps } from "../containerProps"

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(IndexContainer)
)

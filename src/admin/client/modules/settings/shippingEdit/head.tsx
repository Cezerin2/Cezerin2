import { connect } from "react-redux"
import { withRouter } from "react-router"
import { deleteShippingMethod } from "../actions"
import Buttons from "./components/headButtons"

const mapStateToProps = (state, ownProps) => ({
  shippingMethod: state.settings.shippingMethodEdit
})

const mapDispatchToProps = (dispatch, ownProps) => ({
  onDelete: id => {
    dispatch(deleteShippingMethod(id))
    ownProps.history.push("/admin/settings/shipping")
  }
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Buttons))

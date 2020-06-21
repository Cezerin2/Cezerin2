import { connect } from "react-redux"
import { withRouter } from "react-router"
import { deletePaymentMethod } from "../actions"
import Buttons from "./components/headButtons"

const mapStateToProps = (state, ownProps) => ({
  paymentMethod: state.settings.paymentMethodEdit
})

const mapDispatchToProps = (dispatch, ownProps) => ({
  onDelete: id => {
    dispatch(deletePaymentMethod(id))
    ownProps.history.push("/admin/settings/payments")
  }
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Buttons))

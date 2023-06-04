import { useAppDispatch, useAppSelector } from "lib/hooks"
import { connect } from "react-redux"
import { withRouter } from "react-router-dom"
import { deletePaymentMethod } from "../actions"
import { selectSettings } from "../settingsSlice"
import Buttons from "./components/headButtons"

const Redux = props => {
  const {} = useAppSelector(selectSettings)
  const dispatch = useAppDispatch()

  return null
}

const mapStateToProps = (state, ownProps) => {
  return {
    paymentMethod: state.settings.paymentMethodEdit,
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onDelete: id => {
      dispatch(deletePaymentMethod(id))
      ownProps.history.push("/admin/settings/payments")
    },
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Buttons))

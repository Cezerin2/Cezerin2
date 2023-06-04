import { useAppDispatch, useAppSelector } from "lib/hooks"
import { connect } from "react-redux"
import { withRouter } from "react-router-dom"
import { deleteShippingMethod } from "../actions"
import { selectSettings } from "../settingsSlice"
import Buttons from "./components/headButtons"

const Redux = props => {
  const {} = useAppSelector(selectSettings)
  const dispatch = useAppDispatch()

  return null
}

const mapStateToProps = (state, ownProps) => {
  return {
    shippingMethod: state.settings.shippingMethodEdit,
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onDelete: id => {
      dispatch(deleteShippingMethod(id))
      ownProps.history.push("/admin/settings/shipping")
    },
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Buttons))

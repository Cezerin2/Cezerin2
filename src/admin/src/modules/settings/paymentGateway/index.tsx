import { useAppDispatch, useAppSelector } from "lib/hooks"
import { connect } from "react-redux"
import { fetchPaymentGateway, updatePaymentGateway } from "../actions"
import { selectSettings } from "../settingsSlice"
import Form from "./components/form"

const Redux = props => {
  const {} = useAppSelector(selectSettings)
  const dispatch = useAppDispatch()

  return null
}

const mapStateToProps = (state, ownProps) => {
  return {
    gateway: ownProps.gateway,
    initialValues: state.settings.paymentGatewayEdit,
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onLoad: gateway => {
      dispatch(fetchPaymentGateway(gateway || ownProps.gateway))
    },
    onSubmit: data => {
      dispatch(updatePaymentGateway(ownProps.gateway, data))
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Form)

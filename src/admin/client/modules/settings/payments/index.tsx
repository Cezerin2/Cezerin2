import { connect } from "react-redux"
import { fetchPaymentMethods } from "../settingsSlice"
import Form from "./components/form"

const mapStateToProps = state => {
  return {
    paymentMethods: state.settings.paymentMethods,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onLoad: () => {
      dispatch(fetchPaymentMethods())
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Form)

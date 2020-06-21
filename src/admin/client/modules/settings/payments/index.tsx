import { connect } from "react-redux"
import { fetchPaymentMethods } from "../actions"
import Form from "./components/form"

const mapStateToProps = state => ({
  paymentMethods: state.settings.paymentMethods
})

const mapDispatchToProps = dispatch => ({
  onLoad: () => {
    dispatch(fetchPaymentMethods())
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(Form)

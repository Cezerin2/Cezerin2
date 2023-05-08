import { useAppDispatch, useAppSelector } from "lib/hooks"
import { connect } from "react-redux"
import { fetchPaymentMethods } from "../actions"
import Form from "./components/form"

const Redux = props => {
  const {} = useAppSelector()
  const dispatch = useAppDispatch()

  return null
}

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

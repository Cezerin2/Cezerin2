import { connect } from "react-redux"
import { fetchShippingMethods } from "../actions"
import Form from "./components/form"

const mapStateToProps = state => ({
  shippingMethods: state.settings.shippingMethods
})

const mapDispatchToProps = dispatch => ({
  onLoad: () => {
    dispatch(fetchShippingMethods())
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(Form)

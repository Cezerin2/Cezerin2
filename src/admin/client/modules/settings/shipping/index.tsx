import { connect } from "react-redux"
import { fetchShippingMethods } from "../settingsSlice"
import Form from "./components/form"

const mapStateToProps = state => {
  return {
    shippingMethods: state.settings.shippingMethods,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onLoad: () => {
      dispatch(fetchShippingMethods())
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Form)

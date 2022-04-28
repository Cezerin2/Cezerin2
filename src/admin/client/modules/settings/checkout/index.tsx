import { connect } from "react-redux"
import { fetchCheckoutFields } from "../settingsSlice"
import Form from "./components/form"

const mapStateToProps = state => {
  return {
    checkoutFields: state.settings.checkoutFields,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onLoad: () => {
      dispatch(fetchCheckoutFields())
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Form)

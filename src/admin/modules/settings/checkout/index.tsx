import { connect } from "react-redux"
import { fetchCheckoutFields } from "../actions"
import Form from "./components/form"

const mapStateToProps = state => ({
  checkoutFields: state.settings.checkoutFields
})

const mapDispatchToProps = dispatch => ({
  onLoad: () => {
    dispatch(fetchCheckoutFields())
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(Form)

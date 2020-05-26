import { connect } from "react-redux"
import { fetchEmailSettings } from "../actions"
import Form from "./components/form"

const mapStateToProps = state => ({
  emailSettings: state.settings.emailSettings
})

const mapDispatchToProps = dispatch => ({
  onLoad: () => {
    dispatch(fetchEmailSettings())
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(Form)

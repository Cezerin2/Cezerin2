import { connect } from "react-redux"
import { fetchEmailSettings } from "../settingsSlice"
import Form from "./components/form"

const mapStateToProps = state => {
  return {
    emailSettings: state.settings.emailSettings,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onLoad: () => {
      dispatch(fetchEmailSettings())
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Form)

import { connect } from "react-redux"
import { deleteLogo, fetchSettings, uploadLogo } from "../settingsSlice"
import Form from "./components/form"

const mapStateToProps = state => {
  return {
    settings: state.settings.settings,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onLoad: () => {
      dispatch(fetchSettings())
    },
    onImageDelete: () => {
      dispatch(deleteLogo())
    },
    onImageUpload: form => {
      dispatch(uploadLogo(form))
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Form)

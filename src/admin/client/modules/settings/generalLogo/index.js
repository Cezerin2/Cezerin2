import { connect } from "react-redux"
import { fetchSettings, deleteLogo, uploadLogo } from "../actions"
import Form from "./components/form"

const mapStateToProps = state => ({
  settings: state.settings.settings
})

const mapDispatchToProps = dispatch => ({
  onLoad: () => {
    dispatch(fetchSettings())
  },
  onImageDelete: () => {
    dispatch(deleteLogo())
  },
  onImageUpload: form => {
    dispatch(uploadLogo(form))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(Form)

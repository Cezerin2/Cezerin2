import { connect } from "react-redux"
import { fetchImportSettings, updateImportSettings } from "../actions"
import Form from "./components/form"

const mapStateToProps = state => ({
  initialValues: state.settings.importSettings
})

const mapDispatchToProps = dispatch => ({
  onLoad: () => {
    dispatch(fetchImportSettings())
  },
  onSubmit: values => {
    dispatch(updateImportSettings(values))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(Form)

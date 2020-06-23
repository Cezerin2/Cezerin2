import { connect } from "react-redux"
import { fetchImportSettings } from "../actions"
import Form from "./components/form"

const mapStateToProps = state => ({
  importSettings: state.settings.importSettings
})

const mapDispatchToProps = dispatch => ({
  onLoad: () => {
    dispatch(fetchImportSettings())
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(Form)

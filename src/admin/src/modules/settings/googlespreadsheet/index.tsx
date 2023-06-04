import { useAppDispatch, useAppSelector } from "lib/hooks"
import { connect } from "react-redux"
import { fetchImportSettings, updateImportSettings } from "../actions"
import { selectSettings } from "../settingsSlice"
import Form from "./components/form"

const Redux = props => {
  const {} = useAppSelector(selectSettings)
  const dispatch = useAppDispatch()

  return null
}

const mapStateToProps = state => {
  return {
    initialValues: state.settings.importSettings,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onLoad: () => {
      dispatch(fetchImportSettings())
    },
    onSubmit: values => {
      dispatch(updateImportSettings(values))
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Form)

import { useAppDispatch, useAppSelector } from "lib/hooks"
import { connect } from "react-redux"
import { fetchThemeSettings, updateThemeSettings } from "../actions"
import { selectSettings } from "../settingsSlice"
import Form from "./components/form"

const Redux = props => {
  const {} = useAppSelector(selectSettings)
  const dispatch = useAppDispatch()

  return null
}

const mapStateToProps = state => {
  return {
    initialValues: state.settings.themeSettings,
    settingsSchema: state.settings.themeSettingsSchema,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onLoad: () => {
      dispatch(fetchThemeSettings())
    },
    onSubmit: values => {
      dispatch(updateThemeSettings(values))
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Form)

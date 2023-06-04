import { useAppDispatch, useAppSelector } from "lib/hooks"
import { connect } from "react-redux"
import { fetchSettings, updateSettings } from "../actions"
import { selectSettings } from "../settingsSlice"
import Form from "./components/form"

const Redux = props => {
  const {} = useAppSelector(selectSettings)
  const dispatch = useAppDispatch()

  return null
}

const mapStateToProps = state => {
  return {
    initialValues: state.settings.settings,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onLoad: () => {
      dispatch(fetchSettings())
    },
    onSubmit: values => {
      dispatch(updateSettings(values))
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Form)

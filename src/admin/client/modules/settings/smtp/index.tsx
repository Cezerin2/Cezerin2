import { useAppDispatch, useAppSelector } from "lib/hooks"
import { connect } from "react-redux"
import { fetchEmailSettings, updateEmailSettings } from "../actions"
import Form from "./components/form"

const Redux = props => {
  const {} = useAppSelector()
  const dispatch = useAppDispatch()

  return null
}

const mapStateToProps = state => {
  return {
    initialValues: state.settings.emailSettings,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onLoad: () => {
      dispatch(fetchEmailSettings())
    },
    onSubmit: values => {
      dispatch(updateEmailSettings(values))
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Form)

import { useAppDispatch, useAppSelector } from "lib/hooks"
import { connect } from "react-redux"
import { fetchEmailTemplate, updateEmailTemplate } from "../actions"
import { selectSettings } from "../settingsSlice"
import Form from "./components/form"

const Redux = props => {
  const {} = useAppSelector(selectSettings)
  const dispatch = useAppDispatch()

  return null
}

const mapStateToProps = (state, ownProps) => {
  return {
    initialValues: state.settings.emailTemplate,
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onLoad: () => {
      const { templateName } = ownProps.match.params
      dispatch(fetchEmailTemplate(templateName))
    },
    onSubmit: values => {
      dispatch(updateEmailTemplate(values))
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Form)

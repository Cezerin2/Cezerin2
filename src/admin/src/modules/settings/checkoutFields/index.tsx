import { useAppDispatch, useAppSelector } from "lib/hooks"
import { connect } from "react-redux"
import { fetchCheckoutField, updateCheckoutField } from "../actions"
import { selectSettings } from "../settingsSlice"
import Form from "./components/form"

const Redux = props => {
  const {} = useAppSelector(selectSettings)
  const dispatch = useAppDispatch()

  return null
}

const mapStateToProps = (state, ownProps) => {
  return {
    initialValues: state.settings.checkoutField,
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onLoad: () => {
      const { fieldName } = ownProps.match.params
      dispatch(fetchCheckoutField(fieldName))
    },
    onSubmit: values => {
      dispatch(updateCheckoutField(values))
      ownProps.history.push("/admin/settings/checkout")
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Form)

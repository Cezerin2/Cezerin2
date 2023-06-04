import { useAppDispatch, useAppSelector } from "lib/hooks"
import { connect } from "react-redux"
import { fetchCheckoutFields } from "../actions"
import { selectSettings } from "../settingsSlice"
import Form from "./components/form"

const Redux = props => {
  const {} = useAppSelector(selectSettings)
  const dispatch = useAppDispatch()

  return null
}

const mapStateToProps = state => {
  return {
    checkoutFields: state.settings.checkoutFields,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onLoad: () => {
      dispatch(fetchCheckoutFields())
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Form)

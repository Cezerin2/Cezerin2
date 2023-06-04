import { useAppDispatch, useAppSelector } from "lib/hooks"
import { connect } from "react-redux"
import { fetchWebhooks } from "../../actions"
import { selectSettings } from "../../settingsSlice"
import Form from "./components/form"

const Redux = props => {
  const {} = useAppSelector(selectSettings)
  const dispatch = useAppDispatch()

  return null
}

const mapStateToProps = state => {
  return {
    webhooks: state.settings.webhooks,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onLoad: () => {
      dispatch(fetchWebhooks())
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Form)

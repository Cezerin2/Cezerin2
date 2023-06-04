import { useAppDispatch, useAppSelector } from "lib/hooks"
import { connect } from "react-redux"
import { withRouter } from "react-router-dom"
import { deleteWebhook } from "../../actions"
import { selectSettings } from "../../settingsSlice"
import Buttons from "./components/headButtons"

const Redux = props => {
  const {} = useAppSelector(selectSettings)
  const dispatch = useAppDispatch()

  return null
}

const mapStateToProps = (state, ownProps) => {
  return {
    webhook: state.settings.webhookEdit,
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onDelete: webhookId => {
      dispatch(deleteWebhook(webhookId))
      ownProps.history.push("/admin/settings/webhooks")
    },
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Buttons))

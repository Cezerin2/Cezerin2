import { useAppDispatch, useAppSelector } from "lib/hooks"
import { connect } from "react-redux"
import {
  fetchWebhook,
  updateWebhook,
  createWebhook,
  receiveWebhook,
} from "../../actions"
import { selectSettings } from "../../settingsSlice"
import Form from "./components/form"

const Redux = props => {
  const {} = useAppSelector(selectSettings)
  const dispatch = useAppDispatch()

  return null
}

const mapStateToProps = (state, ownProps) => {
  const { webhookId } = ownProps.match.params
  return {
    webhookId: webhookId,
    initialValues: state.settings.webhookEdit,
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onLoad: () => {
      const { webhookId } = ownProps.match.params
      if (webhookId) {
        dispatch(fetchWebhook(webhookId))
      } else {
        dispatch(receiveWebhook({ enabled: true }))
      }
    },
    onSubmit: webhook => {
      if (webhook.id) {
        dispatch(updateWebhook(webhook))
      } else {
        dispatch(createWebhook(webhook))
        ownProps.history.push("/admin/settings/webhooks")
      }
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Form)

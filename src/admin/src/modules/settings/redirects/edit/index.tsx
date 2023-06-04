import { useAppDispatch, useAppSelector } from "lib/hooks"
import { connect } from "react-redux"
import {
  fetchRedirect,
  updateRedirect,
  createRedirect,
  receiveRedirect,
} from "../../actions"
import { selectSettings } from "../../settingsSlice"
import Form from "./components/form"

const Redux = props => {
  const {} = useAppSelector(selectSettings)
  const dispatch = useAppDispatch()

  return null
}

const mapStateToProps = (state, ownProps) => {
  const { redirectId } = ownProps.match.params
  return {
    redirectId,
    initialValues: state.settings.redirectEdit,
  }
}

const mapDispatchToProps = (dispatch, ownProps) => ({
  onLoad: () => {
    const { redirectId } = ownProps.match.params
    if (redirectId) {
      dispatch(fetchRedirect(redirectId))
    } else {
      dispatch(receiveRedirect({ enabled: true }))
    }
  },
  onSubmit: redirect => {
    if (redirect.id) {
      dispatch(updateRedirect(redirect))
    } else {
      dispatch(createRedirect(redirect))
      ownProps.history.push("/admin/settings/redirects")
    }
  },
})

export default connect(mapStateToProps, mapDispatchToProps)(Form)

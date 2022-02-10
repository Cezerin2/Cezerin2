import { connect } from "react-redux"
import {
  fetchRedirect,
  updateRedirect,
  createRedirect,
  receiveRedirect,
} from "../../actions"
import Form from "./components/form"

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

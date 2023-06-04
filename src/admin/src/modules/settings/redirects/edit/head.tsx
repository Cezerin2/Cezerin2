import { useAppDispatch, useAppSelector } from "lib/hooks"
import { connect } from "react-redux"
import { withRouter } from "react-router-dom"
import { deleteRedirect } from "../../actions"
import { selectSettings } from "../../settingsSlice"
import Buttons from "./components/headButtons"

const Redux = props => {
  const {} = useAppSelector(selectSettings)
  const dispatch = useAppDispatch()

  return null
}

const mapStateToProps = (state, ownProps) => ({
  redirect: state.settings.redirectEdit,
})

const mapDispatchToProps = (dispatch, ownProps) => ({
  onDelete: redirectId => {
    dispatch(deleteRedirect(redirectId))
    ownProps.history.push("/admin/settings/redirects")
  },
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Buttons))

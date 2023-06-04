import { useAppDispatch, useAppSelector } from "lib/hooks"
import { connect } from "react-redux"
import { withRouter } from "react-router-dom"
import { fetchServices } from "../actions"
import * as webstoreAuth from "lib/webstoreAuth"
import { selectApps } from "../appsSlice"
import List from "./components/list"

const Redux = props => {
  const {} = useAppSelector(selectApps)
  const dispatch = useAppDispatch()

  return null
}

const mapStateToProps = (state, ownProps) => {
  const webstoreAuthorized = webstoreAuth.isCurrentTokenValid()
  return {
    services: state.apps.services,
    webstoreAuthorized: webstoreAuthorized,
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    fetchData: () => {
      dispatch(fetchServices())
    },
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(List))

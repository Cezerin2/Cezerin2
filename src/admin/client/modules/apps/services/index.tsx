import { connect } from "react-redux"
import { withRouter } from "react-router"
import * as webstoreAuth from "lib/webstoreAuth"
import { fetchServices } from "../actions"
import List from "./components/list"

const mapStateToProps = (state, ownProps) => {
  const webstoreAuthorized = webstoreAuth.isCurrentTokenValid()
  return {
    services: state.apps.services,
    webstoreAuthorized
  }
}

const mapDispatchToProps = (dispatch, ownProps) => ({
  fetchData: () => {
    dispatch(fetchServices())
  }
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(List))

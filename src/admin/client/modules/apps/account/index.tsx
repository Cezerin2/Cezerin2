import * as webstoreAuth from "lib/webstoreAuth"
import { connect } from "react-redux"
import {
  fetchAccount,
  updateAccount,
  updateDeveloperAccount,
} from "../appsSlice"
import Details from "./components/details"

const mapStateToProps = (state, ownProps) => {
  return {
    account: state.apps.account,
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    fetchData: () => {
      const webstoreAuthorized = webstoreAuth.isCurrentTokenValid()
      if (webstoreAuthorized) {
        dispatch(fetchAccount())
      } else {
        ownProps.history.push("/admin/apps/login")
      }
    },
    onAccountSubmit: values => {
      dispatch(updateAccount(values))
    },
    onDeveloperSubmit: values => {
      dispatch(updateDeveloperAccount(values))
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Details)

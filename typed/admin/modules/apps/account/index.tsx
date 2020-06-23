import { connect } from "react-redux"
import * as webstoreAuth from "lib/webstoreAuth"
import { fetchAccount, updateAccount, updateDeveloperAccount } from "../actions"
import Details from "./components/details"

const mapStateToProps = (state, ownProps) => ({
  account: state.apps.account
})

const mapDispatchToProps = (dispatch, ownProps) => ({
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
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(Details)

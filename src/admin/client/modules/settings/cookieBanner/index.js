import { connect } from "react-redux"
import { fetchCookieBanner, updateCookieBanner } from "../actions"
import Form from "./components/form"

const mapStateToProps = state => ({
  cookieBanner: state.settings.cookieBanner,
  initialValues: state.settings.cookieBanner
})

const mapDispatchToProps = (dispatch, ownProps) => ({
  onLoad: () => {
    const { values } = ownProps.match.params
    dispatch(fetchCookieBanner(values))
  },
  onSubmit: values => {
    dispatch(updateCookieBanner(values))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(Form)

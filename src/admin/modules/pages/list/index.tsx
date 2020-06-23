import { connect } from "react-redux"
import { fetchPages } from "../actions"
import Form from "./components/form"

const mapStateToProps = state => ({
  pages: state.pages.pages
})

const mapDispatchToProps = dispatch => ({
  onLoad: () => {
    dispatch(fetchPages())
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(Form)

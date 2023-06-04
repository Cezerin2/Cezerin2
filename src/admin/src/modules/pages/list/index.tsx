import { useAppDispatch, useAppSelector } from "lib/hooks"
import { connect } from "react-redux"
import { fetchPages } from "../actions"
import { selectPages } from "../pagesSlice"
import Form from "./components/form"

const Redux = props => {
  const {} = useAppSelector(selectPages)
  const dispatch = useAppDispatch()

  return null
}

const mapStateToProps = state => {
  return {
    pages: state.pages.pages,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onLoad: () => {
      dispatch(fetchPages())
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Form)

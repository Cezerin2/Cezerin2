import { useAppDispatch, useAppSelector } from "lib/hooks"
import { connect } from "react-redux"
import { withRouter } from "react-router-dom"
import { deletePage } from "../actions"
import Buttons from "./components/headButtons"

const Redux = props => {
  const {} = useAppSelector()
  const dispatch = useAppDispatch()

  return null
}

const mapStateToProps = (state, ownProps) => {
  return {
    page: state.pages.pageEdit,
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onDelete: id => {
      dispatch(deletePage(id))
      ownProps.history.push("/admin/pages")
    },
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Buttons))

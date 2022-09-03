import { connect } from "react-redux"
import { withRouter } from "react-router-dom"
import {
  createCategory,
  deleteCategory,
  moveDownCategory,
  moveUpCategory,
  replaceCategory,
} from "../actions"
import Buttons from "./components/buttons"

const mapStateToProps = state => {
  return {
    selected: state.productCategories.items.find(
      item => item.id === state.productCategories.selectedId
    ),
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onMoveUp: () => {
      dispatch(moveUpCategory())
    },
    onMoveDown: () => {
      dispatch(moveDownCategory())
    },
    onDelete: id => {
      dispatch(deleteCategory(id))
    },
    onMoveTo: id => {
      dispatch(replaceCategory(id))
    },
    onCreate: () => {
      dispatch(createCategory())
    },
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Buttons))

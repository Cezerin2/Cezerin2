import { connect } from "react-redux"
import { deleteStatus, deselectStatus } from "../actions"
import Buttons from "./components/buttons"

const mapStateToProps = state => {
  return {
    selected: state.orderStatuses.items.find(
      item => item.id === state.orderStatuses.selectedId
    ),
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onDelete: id => {
      dispatch(deleteStatus(id))
    },
    onCreate: () => {
      dispatch(deselectStatus())
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Buttons)

import { connect } from "react-redux"
import { deleteGroup, deselectGroup } from "../actions"
import Buttons from "./components/buttons"

const mapStateToProps = state => {
  return {
    selected: state.customerGroups.items.find(
      item => item.id === state.customerGroups.selectedId
    ),
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onDelete: id => {
      dispatch(deleteGroup(id))
    },
    onCreate: () => {
      dispatch(deselectGroup())
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Buttons)

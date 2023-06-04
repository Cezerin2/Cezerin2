import { useAppDispatch, useAppSelector } from "lib/hooks"
import { connect } from "react-redux"
import { deleteStatus, deselectStatus } from "../actions"
import { selectOrderStatuses } from "../orderStatusesSlice"
import Buttons from "./components/buttons"

const Redux = props => {
  const {} = useAppSelector(selectOrderStatuses)
  const dispatch = useAppDispatch()

  return null
}

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

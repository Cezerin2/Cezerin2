import { useAppDispatch, useAppSelector } from "lib/hooks"
import { connect } from "react-redux"
import { deleteGroup, deselectGroup } from "../actions"
import { selectCustomerGroups } from "../customerGroupsSlice"
import Buttons from "./components/buttons"

const Redux = props => {
  const {} = useAppSelector(selectCustomerGroups)
  const dispatch = useAppDispatch()

  return null
}

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

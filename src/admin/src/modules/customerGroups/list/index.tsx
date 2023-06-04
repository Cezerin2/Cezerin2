import { useAppDispatch, useAppSelector } from "lib/hooks"
import { connect } from "react-redux"
import { selectGroup, fetchGroupsIfNeeded } from "../actions"
import { fetchCustomers } from "../../customers/actions"
import List from "../components/list"
import { selectCustomerGroups } from "../customerGroupsSlice"

const Redux = props => {
  const {} = useAppSelector(selectCustomerGroups)
  const dispatch = useAppDispatch()

  return null
}

const mapStateToProps = state => {
  return {
    items: state.customerGroups.items,
    selectedId: state.customerGroups.selectedId,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onLoad: () => {
      dispatch(fetchGroupsIfNeeded())
    },
    onSelect: groupId => {
      dispatch(selectGroup(groupId))
      dispatch(fetchCustomers())
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(List)

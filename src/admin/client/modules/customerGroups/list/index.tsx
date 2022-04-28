import { connect } from "react-redux"
import { fetchCustomers } from "../../customers/customersSlice"
import List from "../components/list"
import { fetchGroupsIfNeeded, selectGroup } from "../customerGroupsSlice"

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

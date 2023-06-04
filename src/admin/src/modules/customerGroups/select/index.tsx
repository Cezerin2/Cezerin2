import { useAppDispatch, useAppSelector } from "lib/hooks"
import { connect } from "react-redux"
import { fetchGroupsIfNeeded } from "../actions"
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
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onLoad: () => {
      dispatch(fetchGroupsIfNeeded())
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(List)

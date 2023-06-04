import { useAppDispatch, useAppSelector } from "lib/hooks"
import { connect } from "react-redux"
import {
  deleteCustomers,
  fetchCustomers,
  setFilterSearch,
  setGroup,
} from "../actions"
import { selectCustomer } from "../customersSlice"
import Buttons from "./components/buttons"

const Redux = props => {
  const {} = useAppSelector(selectCustomer)
  const dispatch = useAppDispatch()

  return null
}

const mapStateToProps = state => {
  return {
    search: state.customers.search,
    selectedCount: state.customers.selected.length,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setSearch: value => {
      dispatch(setFilterSearch(value))
      dispatch(fetchCustomers())
    },
    onDelete: () => {
      dispatch(deleteCustomers())
    },
    onSetGroup: group_id => {
      dispatch(setGroup(group_id))
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Buttons)

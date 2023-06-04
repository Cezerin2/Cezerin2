import { useAppDispatch, useAppSelector } from "lib/hooks"
import { connect } from "react-redux"
import {
  fetchCustomers,
  deselectCustomer,
  selectAllCustomer,
  deselectAllCustomer,
  fetchMoreCustomers,
  selectCustomer as selectCustomerAction,
} from "../actions"
import { selectCustomer } from "../customersSlice"
import List from "./components/list"

const Redux = props => {
  const {} = useAppSelector(selectCustomer)
  const dispatch = useAppDispatch()

  return null
}

const mapStateToProps = state => {
  return {
    settings: state.settings.settings,
    items: state.customers.items,
    selected: state.customers.selected,
    loadingItems: state.customers.loadingItems,
    hasMore: state.customers.hasMore,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onLoad: () => {
      dispatch(fetchCustomers())
    },
    onSelect: (customerId, checked) => {
      if (checked) {
        dispatch(selectCustomerAction(customerId))
      } else {
        dispatch(deselectCustomer(customerId))
      }
    },
    onSelectAll: checked => {
      if (checked) {
        dispatch(selectAllCustomer())
      } else {
        dispatch(deselectAllCustomer())
      }
    },
    loadMore: () => {
      dispatch(fetchMoreCustomers())
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(List)

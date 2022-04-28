import { connect } from "react-redux"
import {
  deselectAllCustomer,
  deselectCustomer,
  fetchCustomers,
  fetchMoreCustomers,
  selectAllCustomer,
  selectCustomer,
} from "../customersSlice"
import List from "./components/list"

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
        dispatch(selectCustomer(customerId))
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

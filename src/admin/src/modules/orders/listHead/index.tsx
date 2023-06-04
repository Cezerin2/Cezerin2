import { useAppDispatch, useAppSelector } from "lib/hooks"
import { connect } from "react-redux"
import { withRouter } from "react-router-dom"
import { createOrder, deleteOrders, fetchOrders, setFilter } from "../actions"
import { selectOrder } from "../ordersSlice"
import Buttons from "./components/buttons"

const Redux = props => {
  const {} = useAppSelector(selectOrder)
  const dispatch = useAppDispatch()

  return null
}

const mapStateToProps = (state, ownProps) => {
  return {
    search: state.orders.filter.search,
    selectedCount: state.orders.selected.length,
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    setSearch: value => {
      dispatch(setFilter({ search: value }))
      dispatch(fetchOrders())
    },
    onDelete: () => {
      dispatch(deleteOrders())
    },
    onCreate: () => {
      dispatch(createOrder(ownProps.history))
    },
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Buttons))

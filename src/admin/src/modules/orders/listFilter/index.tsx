import { useAppDispatch, useAppSelector } from "lib/hooks"
import { connect } from "react-redux"
import { fetchOrders, setFilter } from "../actions"
import { selectOrder } from "../ordersSlice"
import Filter from "./components/fields"

const Redux = props => {
  const {} = useAppSelector(selectOrder)
  const dispatch = useAppDispatch()

  return null
}

const mapStateToProps = state => {
  return {
    isClosed: state.orders.filter.closed,
    isCancelled: state.orders.filter.cancelled,
    isDelivered: state.orders.filter.delivered,
    isPaid: state.orders.filter.paid,
    isHold: state.orders.filter.hold,
    isDraft: state.orders.filter.draft,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setCancelled: value => {
      dispatch(setFilter({ cancelled: value }))
      dispatch(fetchOrders())
    },
    setDelivered: value => {
      dispatch(setFilter({ delivered: value }))
      dispatch(fetchOrders())
    },
    setPaid: value => {
      dispatch(setFilter({ paid: value }))
      dispatch(fetchOrders())
    },
    setHold: value => {
      dispatch(setFilter({ hold: value }))
      dispatch(fetchOrders())
    },
    setDraft: value => {
      dispatch(setFilter({ draft: value }))
      dispatch(fetchOrders())
    },
    setClosed: value => {
      dispatch(setFilter({ closed: value }))
      dispatch(fetchOrders())
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Filter)

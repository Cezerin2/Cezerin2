import { useAppDispatch, useAppSelector } from "lib/hooks"
import { connect } from "react-redux"
import { withRouter } from "react-router-dom"
import {
  addOrderItem,
  cancelOrder,
  closeOrder,
  deleteCurrentOrder,
  updateOrder,
} from "../actions"
import { selectOrder } from "../ordersSlice"
import Buttons from "./components/buttons"

const Redux = props => {
  const {} = useAppSelector(selectOrder)
  const dispatch = useAppDispatch()

  return null
}

const mapStateToProps = (state, ownProps) => {
  return {
    settings: state.settings.settings,
    order: state.orders.editOrder,
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onDelete: () => {
      dispatch(deleteCurrentOrder())
      ownProps.history.push("/admin/orders")
    },
    setCancelled: orderId => {
      dispatch(cancelOrder(orderId))
    },
    holdOrder: orderId => {
      dispatch(updateOrder({ id: orderId, hold: true }))
    },
    resumeOrder: orderId => {
      dispatch(updateOrder({ id: orderId, hold: false }))
    },
    setClosed: orderId => {
      dispatch(closeOrder(orderId))
    },
    addItem: (orderId, productId) => {
      dispatch(addOrderItem(orderId, productId))
    },
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Buttons))

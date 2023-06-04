import { useAppDispatch, useAppSelector } from "lib/hooks"
import { connect } from "react-redux"
import { withRouter } from "react-router-dom"
import { deleteCurrentCustomer } from "../actions"
import { selectCustomer } from "../customersSlice"
import Buttons from "./components/buttons"

const Redux = props => {
  const {} = useAppSelector(selectCustomer)
  const dispatch = useAppDispatch()

  return null
}

const mapStateToProps = (state, ownProps) => {
  return {
    customer: state.customers.editCustomer,
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onDelete: () => {
      dispatch(deleteCurrentCustomer())
      ownProps.history.push("/admin/customers")
    },
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Buttons))

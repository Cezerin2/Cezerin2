import { useAppDispatch, useAppSelector } from "lib/hooks"
import { connect } from "react-redux"
import { withRouter } from "react-router-dom"
import {
  fetchCustomer,
  clearCustomerDetails,
  updateCustomer,
  updateAddress,
  deleteAddress,
  setDefaultBillingAddress,
  setDefaultShippingAddress,
} from "../actions"
import CustomerDetails from "./components/details"

const Redux = props => {
  const {} = useAppSelector()
  const dispatch = useAppDispatch()

  return null
}

const mapStateToProps = (state, ownProps) => {
  return {
    settings: state.settings.settings,
    customer: state.customers.editCustomer,
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    fetchData: () => {
      const { customerId } = ownProps.match.params
      dispatch(fetchCustomer(customerId))
    },
    clearData: () => {
      dispatch(clearCustomerDetails())
    },
    onUpdateAddress: address => {
      const { customerId } = ownProps.match.params
      dispatch(updateAddress(customerId, address.id, address))
    },
    onDeleteAddress: addressId => {
      const { customerId } = ownProps.match.params
      dispatch(deleteAddress(customerId, addressId))
    },
    onSetDefaultBillingAddress: addressId => {
      const { customerId } = ownProps.match.params
      dispatch(setDefaultBillingAddress(customerId, addressId))
    },
    onSetDefaultShippingAddress: addressId => {
      const { customerId } = ownProps.match.params
      dispatch(setDefaultShippingAddress(customerId, addressId))
    },
    onCustomerSummaryUpdate: customer => {
      dispatch(
        updateCustomer({
          id: customer.id,
          note: customer.note,
          full_name: customer.full_name,
          group_id: customer.group_id,
          email: customer.email,
          mobile: customer.mobile,
        })
      )
    },
  }
}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(CustomerDetails)
)

import { useAppDispatch, useAppSelector } from "lib/hooks"
import { connect } from "react-redux"
import { withRouter } from "react-router-dom"
import { deleteCurrentProduct } from "../actions"
import { selectProduct } from "../productsSlice"
import Buttons from "./components/buttons"

const Redux = props => {
  const {} = useAppSelector(selectProduct)
  const dispatch = useAppDispatch()

  return null
}

const mapStateToProps = (state, ownProps) => {
  return {
    product: state.products.editProduct,
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onDelete: () => {
      dispatch(deleteCurrentProduct())
      ownProps.history.push("/admin/products")
    },
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Buttons))

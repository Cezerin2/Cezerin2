import { useAppDispatch, useAppSelector } from "lib/hooks"
import { connect } from "react-redux"
import { withRouter } from "react-router-dom"
import {
  createProduct,
  deleteProducts,
  fetchProducts,
  setCategory,
  setFilter,
} from "../actions"
import { selectProduct } from "../productsSlice"
import Buttons from "./components/buttons"

const Redux = props => {
  const {} = useAppSelector(selectProduct)
  const dispatch = useAppDispatch()

  return null
}

const mapStateToProps = (state, ownProps) => {
  return {
    search: state.products.filter.search,
    selectedCount: state.products.selected.length,
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    setSearch: (event, value) => {
      dispatch(setFilter({ search: value }))
      dispatch(fetchProducts())
    },
    onDelete: () => {
      dispatch(deleteProducts())
    },
    onMoveTo: category_id => {
      dispatch(setCategory(category_id))
    },
    onCreate: () => {
      dispatch(createProduct(ownProps.history))
    },
    // onImportProducts: () => {
    //   dispatch(importProducts(ownProps.history))
    // },
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Buttons))

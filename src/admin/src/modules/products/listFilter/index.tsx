import { useAppDispatch, useAppSelector } from "lib/hooks"
import { connect } from "react-redux"
import { fetchProducts, setFilter } from "../actions"
import { selectProduct } from "../productsSlice"
import Filter from "./components/filter"

const Redux = props => {
  const {} = useAppSelector(selectProduct)
  const dispatch = useAppDispatch()

  return null
}

const mapStateToProps = state => {
  return {
    filter: state.products.filter,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setEnabled: value => {
      dispatch(setFilter({ enabled: value }))
      dispatch(fetchProducts())
    },
    setDiscontinued: value => {
      dispatch(setFilter({ discontinued: value }))
      dispatch(fetchProducts())
    },
    setOnSale: value => {
      dispatch(setFilter({ onSale: value }))
      dispatch(fetchProducts())
    },
    setStock: value => {
      dispatch(setFilter({ stockStatus: value }))
      dispatch(fetchProducts())
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Filter)

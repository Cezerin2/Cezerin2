import { useAppDispatch, useAppSelector } from "lib/hooks"
import { connect } from "react-redux"
import { withRouter } from "react-router-dom"
import {
  fetchProducts,
  fetchMoreProducts,
  selectProduct,
  deselectProduct,
  selectAllProduct,
  deselectAllProduct,
} from "../actions"
import List from "./components/list"

const Redux = props => {
  const {} = useAppSelector()
  const dispatch = useAppDispatch()

  return null
}

const mapStateToProps = (state, ownProps) => {
  return {
    settings: state.settings.settings,
    items: state.products.items,
    selected: state.products.selected,
    loadingItems: state.products.loadingItems,
    hasMore: state.products.hasMore,
    totalCount: state.products.totalCount,
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onLoad: () => {
      dispatch(fetchProducts())
    },
    onSelect: event => {
      const productId = event.target.value
      const checked = event.target.checked

      if (checked) {
        dispatch(selectProduct(productId))
      } else {
        dispatch(deselectProduct(productId))
      }
    },
    onSelectAll: event => {
      const checked = event.target.checked

      if (checked) {
        dispatch(selectAllProduct())
      } else {
        dispatch(deselectAllProduct())
      }
    },
    loadMore: () => {
      dispatch(fetchMoreProducts())
    },
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(List))

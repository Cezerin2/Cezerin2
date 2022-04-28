import { connect } from "react-redux"
import List from "../components/list"
import { fetchCategoriesIfNeeded } from "../productCategoriesSlice"

const mapStateToProps = state => {
  return {
    items: state.productCategories.items,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onLoad: () => {
      dispatch(fetchCategoriesIfNeeded())
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(List)

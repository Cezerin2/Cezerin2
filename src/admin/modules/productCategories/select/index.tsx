import { connect } from "react-redux"
import {
  selectCategory,
  fetchCategoriesIfNeeded,
  createCategory
} from "../actions"
import List from "../components/list"

const mapStateToProps = state => ({
  items: state.productCategories.items
})

const mapDispatchToProps = dispatch => ({
  onLoad: () => {
    dispatch(fetchCategoriesIfNeeded())
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(List)

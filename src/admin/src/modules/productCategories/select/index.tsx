import { useAppDispatch, useAppSelector } from "lib/hooks"
import { connect } from "react-redux"
import {
  selectCategory,
  fetchCategoriesIfNeeded,
  createCategory,
} from "../actions"
import List from "../components/list"
import { selectProductCategories } from "../productCategoriesSlice"

const Redux = props => {
  const {} = useAppSelector(selectProductCategories)
  const dispatch = useAppDispatch()

  return null
}

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

import { useAppDispatch, useAppSelector } from "lib/hooks"
import { connect } from "react-redux"
import { withRouter } from "react-router-dom"
import { updateProduct } from "../../actions"
import { selectProduct } from "../../productsSlice"
import ProductGeneralForm from "./components/form"

const Redux = props => {
  const {} = useAppSelector(selectProduct)
  const dispatch = useAppDispatch()

  return null
}

const mapStateToProps = (state, ownProps) => {
  return {
    initialValues: state.products.editProduct,
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onSubmit: values => {
      dispatch(
        updateProduct({
          id: values.id,
          name: values.name,
          slug: values.slug,
          meta_title: values.meta_title,
          meta_description: values.meta_description,
          description: values.description,
        })
      )
    },
  }
}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(ProductGeneralForm)
)

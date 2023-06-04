import { useAppDispatch, useAppSelector } from "lib/hooks"
import { connect } from "react-redux"
import { withRouter } from "react-router-dom"
import {
  deleteImage,
  updateImages,
  updateImage,
  fetchImages,
  uploadImages,
} from "../../actions"
import { selectProduct } from "../../productsSlice"
import ProductImages from "./components/images"

const Redux = props => {
  const {} = useAppSelector(selectProduct)
  const dispatch = useAppDispatch()

  return null
}

const mapStateToProps = (state, ownProps) => {
  const { productId } = ownProps.match.params
  const oldImages = state.products.editProduct
    ? state.products.editProduct.images
    : []

  return {
    images: state.products.editProductImages || oldImages,
    uploadingImages: state.products.uploadingImages,
    productId: productId,
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onImageDelete: (productId, imageId) => {
      dispatch(deleteImage(productId, imageId))
    },
    onImageSort: (productId, images) => {
      dispatch(updateImages(productId, images))
    },
    onImageUpdate: image => {
      const { productId } = ownProps.match.params
      dispatch(
        updateImage(productId, {
          id: image.id,
          alt: image.alt,
        })
      )
    },
    onImageUpload: form => {
      const { productId } = ownProps.match.params
      dispatch(uploadImages(productId, form))
    },
  }
}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(ProductImages)
)

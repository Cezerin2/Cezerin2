import React from "react"
import { connect } from "react-redux"
import { withRouter } from "react-router"
import {
  fetchProducts,
  deleteProducts,
  setCategory,
  setFilter,
  createProduct
} from "../actions"
import Buttons from "./components/buttons"

const mapStateToProps = (state, ownProps) => {
  return {
    search: state.products.filter.search,
    selectedCount: state.products.selected.length
  }
}

<<<<<<< HEAD
const mapDispatchToProps = (dispatch, ownProps) => ({
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
=======
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
    onImportProducts: () => {
      dispatch(importProducts(ownProps.history))
    }
>>>>>>> parent of 5126239... Eslint fix (#45)
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Buttons))

import React from "react"
import { connect } from "react-redux"
import { reset } from "redux-form"
import { deleteStatus, deselectStatus } from "../actions"
import Buttons from "./components/buttons"

const mapStateToProps = state => ({
  selected: state.orderStatuses.items.find(
    item => item.id === state.orderStatuses.selectedId
  )
})

const mapDispatchToProps = dispatch => ({
  onDelete: id => {
    dispatch(deleteStatus(id))
    dispatch(reset("FormOrderStatus"))
  },
  onCreate: () => {
    dispatch(deselectStatus())
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(Buttons)

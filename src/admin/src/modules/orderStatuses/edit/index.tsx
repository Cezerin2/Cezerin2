import { useAppDispatch, useAppSelector } from "lib/hooks"
import { connect } from "react-redux"
import { createStatus, deselectStatus, updateStatus } from "../actions"
import { selectOrderStatuses } from "../orderStatusesSlice"
import Form from "./components/form"

const Redux = props => {
  const {} = useAppSelector(selectOrderStatuses)
  const dispatch = useAppDispatch()

  return null
}

const mapStateToProps = state => {
  return {
    statusId: state.orderStatuses.selectedId,
    items: state.orderStatuses.items,
    initialValues: state.orderStatuses.items.find(
      item => item.id === state.orderStatuses.selectedId
    ),
    isSaving: state.orderStatuses.isSaving,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onSubmit: values => {
      if (values.id) {
        dispatch(updateStatus(values))
      } else {
        dispatch(createStatus(values))
      }
    },
    onCancel: () => {
      dispatch(deselectStatus())
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Form)

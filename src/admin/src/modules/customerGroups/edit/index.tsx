import { useAppDispatch, useAppSelector } from "lib/hooks"
import { connect } from "react-redux"
import { createGroup, deselectGroup, updateGroup } from "../actions"
import { selectCustomerGroups } from "../customerGroupsSlice"
import Form from "./components/form"

const Redux = props => {
  const {} = useAppSelector(selectCustomerGroups)
  const dispatch = useAppDispatch()

  return null
}

const mapStateToProps = state => {
  return {
    groupId: state.customerGroups.selectedId,
    items: state.customerGroups.items,
    initialValues: state.customerGroups.items.find(
      item => item.id === state.customerGroups.selectedId
    ),
    isSaving: state.customerGroups.isSaving,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onSubmit: values => {
      if (values.id) {
        dispatch(updateGroup(values))
      } else {
        dispatch(createGroup(values))
      }
    },
    onCancel: () => {
      dispatch(deselectGroup())
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Form)

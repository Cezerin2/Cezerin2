import { useAppDispatch, useAppSelector } from "lib/hooks"
import { connect } from "react-redux"
import { fetchStatusesIfNeeded } from "../actions"
import List from "../components/list"
import { selectOrderStatuses } from "../orderStatusesSlice"

const Redux = props => {
  const {} = useAppSelector(selectOrderStatuses)
  const dispatch = useAppDispatch()

  return null
}

const mapStateToProps = state => {
  return {
    items: state.orderStatuses.items,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onLoad: () => {
      dispatch(fetchStatusesIfNeeded())
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(List)

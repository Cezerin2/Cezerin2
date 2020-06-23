import { connect } from "react-redux"
import { fetchStatusesIfNeeded } from "../actions"
import List from "../components/list"

const mapStateToProps = state => ({
  items: state.orderStatuses.items
})

const mapDispatchToProps = dispatch => ({
  onLoad: () => {
    dispatch(fetchStatusesIfNeeded())
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(List)

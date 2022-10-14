import { useAppDispatch, useAppSelector } from "lib/hooks"
import { connect } from "react-redux"
import { fetchRedirects } from "../../actions"
import Form from "./components/form"

const Redux = props => {
  const {} = useAppSelector()
  const dispatch = useAppDispatch()

  return null
}

const mapStateToProps = state => ({
  redirects: state.settings.redirects,
})

const mapDispatchToProps = dispatch => ({
  onLoad: () => {
    dispatch(fetchRedirects())
  },
})

export default connect(mapStateToProps, mapDispatchToProps)(Form)

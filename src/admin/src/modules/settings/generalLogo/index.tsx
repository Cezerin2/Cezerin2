import { useAppDispatch, useAppSelector } from "lib/hooks"
import { connect } from "react-redux"
import { fetchSettings, deleteLogo, uploadLogo } from "../actions"
import { selectSettings } from "../settingsSlice"
import Form from "./components/form"

const Redux = props => {
  const {} = useAppSelector(selectSettings)
  const dispatch = useAppDispatch()

  return null
}

const mapStateToProps = state => {
  return {
    settings: state.settings.settings,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onLoad: () => {
      dispatch(fetchSettings())
    },
    onImageDelete: () => {
      dispatch(deleteLogo())
    },
    onImageUpload: form => {
      dispatch(uploadLogo(form))
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Form)

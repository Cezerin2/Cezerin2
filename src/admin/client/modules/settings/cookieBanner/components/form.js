import React from "react"
import { Field, reduxForm } from "redux-form"
import { TextField, SelectField } from "redux-form-material-ui"
import TextAreaField from "./textareaField"

import messages from "lib/text"
import style from "./style.css"

import Paper from "material-ui/Paper"
import RaisedButton from "material-ui/RaisedButton"
import Divider from "material-ui/Divider"
import FontIcon from "material-ui/FontIcon"
import { List, ListItem } from "material-ui/List"

class CookieBannerForm extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      cookieBannerBody: ""
    }
  }

  componentDidMount() {
    this.props.onLoad()
  }

  render() {
    let {
      handleSubmit,
      pristine,
      submitting,
      cookieBanner,
      initialValues
    } = this.props
    this.state.cookieBannerBody =
      cookieBanner && cookieBanner.body ? cookieBanner.body : ""
    console.log(this.state.cookieBannerBody)

    return (
      <form
        onSubmit={handleSubmit}
        style={{
          display: "initial",
          width: "100%"
        }}
      >
        <Paper className="paper-box" zDepth={1}>
          <div className={style.cookieBannerInfo}>
            <p>{messages.cookie_banner_info}</p>
          </div>
          <div className={style.innerBox}>
            <div>
              <Field
                className={"cookie-banner-inputfield"}
                component={TextAreaField}
                fullWidth={true}
                type="text"
                name="body"
                placeholder="..HTML"
                floatingLabelText={messages.settings_emailBody}
                text={this.state.cookieBannerBody}
                cookieBanner={cookieBanner}
                rows="10"
                cols="100"
              />
            </div>
          </div>
          <div className="buttons-box">
            <RaisedButton
              type="submit"
              label={messages.save}
              primary={true}
              className={style.button}
              disabled={pristine || submitting}
            />
          </div>
        </Paper>
      </form>
    )
  }
}

export default reduxForm({
  form: "CookieBannerForm",
  enableReinitialize: true,
  keepDirtyOnReinitialize: false
})(CookieBannerForm)

import messages from "lib/text"
import sortBy from "lodash/sortBy"
import FlatButton from "material-ui/FlatButton"
import Paper from "material-ui/Paper"
import RaisedButton from "material-ui/RaisedButton"
import React, { FC, useEffect } from "react"
import { reduxForm } from "redux-form"
import DynamicEditControl from "./dynamicEditControl"
import style from "./style.css"

interface Props {
  handleSubmit
  pristine: boolean
  submitting: boolean
  initialValues
  reset
  settingsSchema
  onLoad
}

const ThemeSettings: FC<Props> = props => {
  const {
    handleSubmit,
    pristine,
    submitting,
    initialValues,
    reset,
    settingsSchema,
    onLoad,
  } = props

  useEffect(() => {
    onLoad()
  }, [])

  if (initialValues && settingsSchema) {
    let lastSection = null
    const sortedSettingsSchema = sortBy(settingsSchema, ["section", "label"])

    const fields = sortedSettingsSchema.map((item, index) => {
      let sectionTitle = null
      if (item.section !== lastSection) {
        lastSection = item.section
        sectionTitle =
          item.section && item.section !== "" ? (
            <div className={style.sectionTitle}>{item.section}</div>
          ) : null
      }

      return (
        <div key={index}>
          {sectionTitle}
          <DynamicEditControl
            type={item.type}
            fieldName={item.key}
            label={item.label}
            options={item.options}
            properties={item.properties}
          />
        </div>
      )
    })

    return (
      <form
        onSubmit={handleSubmit}
        style={{
          display: "initial",
          width: "100%",
        }}
      >
        <div style={{ margin: 20, color: "rgba(0, 0, 0, 0.52)" }}>
          {messages.themeSettings}
        </div>
        <Paper className="paper-box" zDepth={1}>
          <div className={style.innerBox}>{fields}</div>
          <div className="buttons-box">
            <FlatButton
              label={messages.cancel}
              className={style.button}
              onClick={reset}
              disabled={pristine || submitting}
            />
            <RaisedButton
              type="submit"
              label={messages.save}
              primary
              className={style.button}
              disabled={pristine || submitting}
            />
          </div>
        </Paper>
      </form>
    )
  }

  return null
}

export default reduxForm({
  form: "ThemeSettingsForm",
  enableReinitialize: true,
})(ThemeSettings)

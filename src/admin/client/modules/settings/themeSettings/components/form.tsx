import arrayMutators from "final-form-arrays"
import messages from "lib/text"
import sortBy from "lodash/sortBy"
import FlatButton from "material-ui/FlatButton"
import Paper from "material-ui/Paper"
import RaisedButton from "material-ui/RaisedButton"
import React, { FC, useEffect } from "react"
import { Form } from "react-final-form"
import DynamicEditControl from "./dynamicEditControl"
import style from "./style.css"

interface Props {
  initialValues
  onSubmit
  settingsSchema
  onLoad
}

const ThemeSettings: FC<Props> = props => {
  const { initialValues, onSubmit, settingsSchema, onLoad } = props

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
      <Form
        initialValues={initialValues}
        onSubmit={onSubmit}
        mutators={{ ...arrayMutators }}
      >
        {({ handleSubmit, pristine, form, submitting }) => (
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
                  onClick={form.reset}
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
        )}
      </Form>
    )
  }

  return null
}

export default ThemeSettings

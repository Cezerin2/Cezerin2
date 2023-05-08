import { KeyboardArrowRight } from "@mui/icons-material"
import data from "lib/data"
import messages from "lib/text"
import Divider from "material-ui/Divider"
import { List, ListItem } from "material-ui/List"
import MenuItem from "material-ui/MenuItem"
import Paper from "material-ui/Paper"
import RaisedButton from "material-ui/RaisedButton"
import React, { FC, Fragment, useEffect } from "react"
import { Field, Form } from "react-final-form"
import { Link } from "react-router-dom"
import { SelectField, TextField } from "redux-form-material-ui"
import { fields } from "./fields"
import style from "./style.sass"

interface Props {
  initialValues
  onSubmit
  onLoad
}

const GeneralSettings: FC<Props> = props => {
  const { initialValues, onSubmit, onLoad } = props

  useEffect(() => {
    onLoad()
  }, [])

  const currencyItems = []
  for (const key in data.currencies) {
    currencyItems.push(
      <MenuItem
        value={key}
        key={key}
        primaryText={`${key} - ${data.currencies[key]}`}
      />
    )
  }

  const taxItems = []
  for (const key in data.taxs) {
    taxItems.push(
      <MenuItem
        value={key}
        key={key}
        primaryText={`${key} - ${data.taxs[key]}`}
      />
    )
  }

  return (
    <Form initialValues={initialValues} onSubmit={onSubmit}>
      {({ handleSubmit, pristine, submitting }) => (
        <form
          onSubmit={handleSubmit}
          style={{
            display: "initial",
            width: "100%",
          }}
        >
          <Paper className="paper-box" zDepth={1}>
            <div className={style.innerBox}>
              <div style={{ width: "100%" }}>
                <List>
                  <Link
                    to="/admin/settings/general/logo"
                    style={{ textDecoration: "none" }}
                  >
                    <ListItem
                      rightIcon={<KeyboardArrowRight />}
                      primaryText={messages.logo}
                    />
                  </Link>
                  <Divider />
                </List>
              </div>

              <div className="row between-xs middle-xs">
                <div className="col-xs-12 col-sm-6">
                  {messages.settings_storeName}
                </div>
                <div className="col-xs-12 col-sm-6">
                  <Field component={TextField} fullWidth name="store_name" />
                </div>
              </div>

              <div className="row between-xs middle-xs">
                <div className="col-xs-12 col-sm-6">{messages.currency}</div>
                <div className="col-xs-12 col-sm-6">
                  <Field
                    component={SelectField}
                    autoWidth
                    fullWidth
                    name="currency_code"
                  >
                    {currencyItems}
                  </Field>
                </div>
              </div>
              {fields.map((field, index) => (
                <Fragment key={index}>
                  <Divider
                    style={{
                      marginTop: 10,
                      marginBottom: 10,
                    }}
                  />
                  {field}
                </Fragment>
              ))}
            </div>
            <div className="buttons-box">
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

export default GeneralSettings

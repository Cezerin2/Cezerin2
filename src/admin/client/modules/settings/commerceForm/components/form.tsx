import messages from "lib/text"
import MenuItem from "material-ui/MenuItem"
import Paper from "material-ui/Paper"
import { RadioButton } from "material-ui/RadioButton"
import RaisedButton from "material-ui/RaisedButton"
import React, { FC, useEffect, useState } from "react"
import { Field, reduxForm } from "redux-form"
import {
  RadioButtonGroup,
  SelectField,
  TextField,
} from "redux-form-material-ui"
import style from "./style.css"

const radioButtonStyle = {
  marginTop: 14,
  marginBottom: 14,
}

const validate = values => {
  const errors = {}
  const requiredFields = [
    "firstName",
    "lastName",
    "email",
    "favoriteColor",
    "notes",
  ]
  requiredFields.forEach(field => {
    if (!values[field]) {
      errors[field] = "Required"
    }
  })
  if (
    values.email &&
    !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
  ) {
    errors.email = "Invalid email address"
  }
  return errors
}

let selectFieldValuesFirst = null
let selectFieldValuesSecond = null
let selectFieldValuesThird = null

interface Props {
  handleSubmit
  pristine
  submitting
  initialValues
  onLoad
}

const CommerceForm: FC<Props> = props => {
  const [isSelectField, setIsSelectField] = useState(false)
  const [isTextField, setIsTextField] = useState(false)
  const [isServiceOptions, setIsServiceOptions] = useState(false)
  const [isServiceOptionsCalled, setIsServiceOptionsCalled] = useState(false)

  const { handleSubmit, pristine, submitting, initialValues, onLoad } = props

  useEffect(() => {
    onLoad()

    // props.initialize({ name: 'serviceOptions' });

    selectFieldValuesFirst = {
      1: messages.service_delivery,
    }
    selectFieldValuesSecond = {
      2: messages.service_togo,
    }
    selectFieldValuesThird = {
      3: messages.service_delivery_togo,
    }

    if (initialValues !== undefined && !isServiceOptionsCalled) {
      const isServiceOptionsValue =
        initialValues.status.indexOf(messages.commerce_formRestaurant) !== -1
      const isTextFieldValue =
        initialValues.serviceOptions.indexOf(selectFieldValuesFirst[1]) !== -1

      setIsServiceOptions(isServiceOptionsValue)
      setIsServiceOptionsCalled(true)
      setIsTextField(isTextFieldValue)
    }
  }, [props])

  const setTextField = index => {
    const value = index.indexOf(selectFieldValuesFirst[1]) !== -1 || false
    setIsTextField(value)
  }

  const setSelectField = event => {
    const isSelectFieldValue =
      event.target.value.indexOf(messages.commerce_formRestaurant) !== -1 ||
      false
    setIsSelectField(isSelectFieldValue)
    setIsServiceOptions(isSelectFieldValue)
  }

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        display: "initial",
        width: "100%",
      }}
    >
      <Paper className="paper-box" zDepth={1}>
        <div className={style.innerBox}>
          <div>{messages.commerce_formInfo}</div>
          <div className="blue-title">{messages.commerce_forms}</div>
          <div>
            <Field
              name="status"
              component={RadioButtonGroup}
              onChange={event => setSelectField(event)}
            >
              <RadioButton
                value={messages.commerce_formRestaurant}
                label={messages.commerce_formRestaurant}
                style={radioButtonStyle}
              />
              <RadioButton
                value={messages.commerce_formEshop}
                label={messages.commerce_formEshop}
                style={radioButtonStyle}
              />
              <RadioButton
                value={messages.commerce_formWholesale}
                label={messages.commerce_formWholesale}
                style={radioButtonStyle}
              />
            </Field>
          </div>
          <div>
            {(isSelectField || isServiceOptions) && (
              <Field
                name="serviceOptions"
                component={SelectField}
                fullWidth
                label={messages.service_options}
                hintText={messages.service_options_initial_value}
                floatingLabelText={messages.service_options_initial_value}
                onChange={(event, index, next) => setTextField(index)}
              >
                <MenuItem
                  value={selectFieldValuesFirst[1]}
                  primaryText={messages.service_delivery}
                />
                <MenuItem
                  value={selectFieldValuesSecond[2]}
                  primaryText={messages.service_togo}
                />
                <MenuItem
                  value={selectFieldValuesThird[3]}
                  primaryText={messages.service_delivery_togo}
                />
              </Field>
            )}
          </div>
          <div>
            {isTextField && (isSelectField || isServiceOptions) && (
              <Field
                component={TextField}
                fullWidth
                name="deliveryRadius"
                hintText={messages.delivery_radius}
                floatingLabelText={messages.delivery_radius}
              />
            )}
          </div>
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
  )
}

export default reduxForm({
  form: "CommerceForm",
  /*initialValues: {
		serviceOptions: {
			value: "myFirstName"
		}
	},*/
  /*initialValues: {
		serviceOptions: 'defaultValue'
	},*/
  //keepDirtyOnReinitialize: true,
  enableReinitialize: true,
  //updateUnregisteredFields: true
})(CommerceForm)

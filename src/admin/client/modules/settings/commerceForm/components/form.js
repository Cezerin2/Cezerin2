import React from "react"
import { Field, reduxForm } from "redux-form"
import { TextField, RadioButtonGroup } from "redux-form-material-ui"

import messages from "lib/text"
import style from "./style.css"

import Paper from "material-ui/Paper"
import MenuItem from "material-ui/MenuItem"
import Divider from "material-ui/Divider"
import RaisedButton from "material-ui/RaisedButton"
import { RadioButton } from "material-ui/RadioButton"
import { SelectField } from "redux-form-material-ui"

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

class CommerceForm extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      isSelectField: false,
      isTextField: false,
      isServiceOptions: false,
      isServiceOptionsCalled: false,
    }
  }

  componentWillMount() {
    //this.props.initialize({ name: 'serviceOptions' });

    selectFieldValuesFirst = {
      1: messages.service_delivery,
    }
    selectFieldValuesSecond = {
      2: messages.service_togo,
    }
    selectFieldValuesThird = {
      3: messages.service_delivery_togo,
    }
  }

  componentDidMount() {
    this.props.onLoad()
  }

  componentWillReceiveProps(nextProps) {
    if (
      nextProps.initialValues !== undefined &&
      !this.state.isServiceOptionsCalled
    ) {
      const isServiceOptions =
        nextProps.initialValues.status.indexOf(
          messages.commerce_formRestaurant
        ) !== -1
      const isTextField =
        nextProps.initialValues.serviceOptions.indexOf(
          selectFieldValuesFirst[1]
        ) !== -1
      this.setState({
        isServiceOptions,
        isServiceOptionsCalled: true,
        isTextField,
      })
    }
  }

  setTextField = index => {
    const isTextField = index.indexOf(selectFieldValuesFirst[1]) !== -1 || false
    this.setState({ isTextField })
  }

  setSelectField = event => {
    const isSelectField =
      event.target.value.indexOf(messages.commerce_formRestaurant) !== -1 ||
      false
    this.setState({ isSelectField, isServiceOptions: isSelectField })
  }

  render() {
    let { handleSubmit, pristine, submitting, initialValues } = this.props

    //console.log(this.props);

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
                onChange={event => this.setSelectField(event)}
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
              {(this.state.isSelectField || this.state.isServiceOptions) && (
                <Field
                  name="serviceOptions"
                  component={SelectField}
                  fullWidth={true}
                  label={messages.service_options}
                  hintText={messages.service_options_initial_value}
                  floatingLabelText={messages.service_options_initial_value}
                  onChange={(event, index, next) => this.setTextField(index)}
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
              {this.state.isTextField &&
                (this.state.isSelectField || this.state.isServiceOptions) && (
                  <Field
                    component={TextField}
                    fullWidth={true}
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

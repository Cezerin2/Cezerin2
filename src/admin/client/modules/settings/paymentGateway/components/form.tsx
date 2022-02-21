import messages from "lib/text"
import Dialog from "material-ui/Dialog"
import FlatButton from "material-ui/FlatButton"
import RaisedButton from "material-ui/RaisedButton"
import React from "react"
import { reduxForm } from "redux-form"
import { AVAILABLE_PAYMENT_GATEWAYS } from "../availablePaymentGateways"
import GatewaySettings from "./gatewaySettings"
import style from "./style.css"

class EditPaymentGatewayForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      open: false,
    }
  }

  componentDidMount() {
    this.props.onLoad()
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.gateway !== this.props.gateway) {
      this.props.onLoad(nextProps.gateway)
    }
  }

  handleOpen = () => {
    this.setState({ open: true })
  }

  handleClose = () => {
    this.setState({ open: false })
  }

  render() {
    let { handleSubmit, pristine, submitting, initialValues } = this.props
    const gatewayDetails = AVAILABLE_PAYMENT_GATEWAYS.find(
      item => item.key === this.props.gateway
    )

    if (this.props.gateway && this.props.gateway.length > 0) {
      return (
        <div>
          <RaisedButton
            onClick={this.handleOpen}
            label={messages.drawer_settings}
            style={{ margin: "15px 0 30px 0" }}
          />

          <Dialog
            title={gatewayDetails.name}
            modal={false}
            open={this.state.open}
            autoScrollBodyContent
            contentStyle={{ width: 600 }}
            onRequestClose={this.handleClose}
          >
            <form
              onSubmit={handleSubmit}
              style={{ display: "initial", width: "100%" }}
            >
              <GatewaySettings gateway={this.props.gateway} />

              <div className={style.buttons}>
                <FlatButton
                  label={messages.cancel}
                  onClick={this.handleClose}
                />
                <FlatButton
                  label={messages.save}
                  primary
                  type="submit"
                  onClick={this.handleClose}
                  style={{ marginLeft: 12 }}
                  disabled={pristine || submitting}
                />
              </div>
            </form>
          </Dialog>
        </div>
      )
    } else {
      return null
    }
  }
}

export default reduxForm({
  form: "EditPaymentGatewayForm",
  enableReinitialize: true,
})(EditPaymentGatewayForm)

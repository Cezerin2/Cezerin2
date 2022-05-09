import messages from "lib/text"
import Dialog from "material-ui/Dialog"
import FlatButton from "material-ui/FlatButton"
import RaisedButton from "material-ui/RaisedButton"
import React, { FC, useEffect, useRef, useState } from "react"
import { reduxForm } from "redux-form"
import { AVAILABLE_PAYMENT_GATEWAYS } from "../availablePaymentGateways"
import GatewaySettings from "./gatewaySettings"
import style from "./style.css"

interface Props {
  gateway
  onLoad
  handleSubmit
  pristine
  submitting
}

const EditPaymentGatewayForm: FC<Props> = props => {
  const [open, setOpen] = useState(false)
  const currentGateway = useRef(props.gateway)

  const { gateway, onLoad, handleSubmit, pristine, submitting } = props

  useEffect(() => {
    onLoad()

    if (currentGateway !== props.gateway) onLoad(gateway)
  }, [gateway])

  const handleClose = () => setOpen(false)

  const gatewayDetails = AVAILABLE_PAYMENT_GATEWAYS.find(
    item => item.key === gateway
  )

  if (gateway && gateway.length > 0) {
    return (
      <div>
        <RaisedButton
          onClick={() => setOpen(true)}
          label={messages.drawer_settings}
          style={{ margin: "15px 0 30px 0" }}
        />

        <Dialog
          title={gatewayDetails.name}
          modal={false}
          open={open}
          autoScrollBodyContent
          contentStyle={{ width: 600 }}
          onRequestClose={handleClose}
        >
          <form
            onSubmit={handleSubmit}
            style={{ display: "initial", width: "100%" }}
          >
            <GatewaySettings gateway={gateway} />

            <div className={style.buttons}>
              <FlatButton label={messages.cancel} onClick={handleClose} />
              <FlatButton
                label={messages.save}
                primary
                type="submit"
                onClick={handleClose}
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

export default reduxForm({
  form: "EditPaymentGatewayForm",
  enableReinitialize: true,
})(EditPaymentGatewayForm)

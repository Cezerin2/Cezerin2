import messages from "lib/text"
import Dialog from "material-ui/Dialog"
import FlatButton from "material-ui/FlatButton"
import RaisedButton from "material-ui/RaisedButton"
import React, { FC, useEffect, useState } from "react"
import { Form } from "react-final-form"
import { AVAILABLE_PAYMENT_GATEWAYS } from "../availablePaymentGateways"
import GatewaySettings from "./gatewaySettings"
import style from "./style.sass"

interface Props {
  initialValues
  onSubmit
  gateway
  onLoad
}

const EditPaymentGatewayForm: FC<Props> = props => {
  const [open, setOpen] = useState(false)

  const { initialValues, onSubmit, gateway, onLoad } = props

  useEffect(() => {
    onLoad()
  }, [onLoad])

  useEffect(() => {
    onLoad(gateway)
  }, [gateway, onLoad])

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
          <Form initialValues={initialValues} onSubmit={onSubmit}>
            {({ handleSubmit, pristine, submitting }) => (
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
            )}
          </Form>
        </Dialog>
      </div>
    )
  } else {
    return null
  }
}

export default EditPaymentGatewayForm

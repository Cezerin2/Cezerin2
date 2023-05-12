import { KeyboardArrowRight } from "@mui/icons-material"
import messages from "lib/text"
import Divider from "material-ui/Divider"
import { List, ListItem } from "material-ui/List"
import Paper from "material-ui/Paper"
import React, { FC, useEffect } from "react"
import { Link } from "react-router-dom"

const CheckoutFieldItem = ({ name, status, path }) => (
  <div>
    <Divider />
    <Link
      to={`/admin/settings/checkout/fields/${path}`}
      style={{ textDecoration: "none" }}
    >
      <ListItem
        rightIcon={<KeyboardArrowRight />}
        primaryText={
          <div className="row">
            <div className="col-xs-6">{name}</div>
            <div className="col-xs-6" style={{ color: "rgba(0, 0, 0, 0.4)" }}>
              {status}
            </div>
          </div>
        }
      />
    </Link>
  </div>
)

interface Props {
  checkoutFields
  onLoad: () => void
}

const EmailSettings: FC<Props> = props => {
  const { checkoutFields, onLoad } = props

  useEffect(() => {
    onLoad()
  }, [])

  const getFieldStatus = (fieldName: string) => {
    const fields = checkoutFields || []
    const field = fields.find(({ name }) => name === fieldName)
    const fieldStatus = field ? field.status : "required"
    switch (fieldStatus) {
      case "optional":
        return messages.settings_fieldOptional
      case "hidden":
        return messages.settings_fieldHidden
      default:
        return messages.settings_fieldRequired
    }
  }

  return (
    <>
      <div style={{ margin: 20, color: "rgba(0, 0, 0, 0.52)" }}>
        {messages.settings_checkoutFields}
      </div>
      <Paper className="paper-box" zDepth={1}>
        <div style={{ width: "100%" }}>
          <List style={{ padding: 0 }}>
            <CheckoutFieldItem
              name={messages.first_name}
              status={getFieldStatus("first_name")}
              path="first_name"
            />
            <CheckoutFieldItem
              name={messages.last_name}
              status={getFieldStatus("last_name")}
              path="last_name"
            />
            <CheckoutFieldItem
              name={messages.email}
              status={getFieldStatus("email")}
              path="email"
            />
            <CheckoutFieldItem
              name={messages.mobile}
              status={getFieldStatus("mobile")}
              path="mobile"
            />
            <CheckoutFieldItem
              name={messages.password}
              status={getFieldStatus("password")}
              path="password"
            />
            <CheckoutFieldItem
              name={messages.password_verify}
              status={getFieldStatus("password_verify")}
              path="password_verify"
            />
            <CheckoutFieldItem
              name={messages.address1}
              status={getFieldStatus("address1")}
              path="address1"
            />
            <CheckoutFieldItem
              name={messages.address2}
              status={getFieldStatus("address2")}
              path="address2"
            />
            <CheckoutFieldItem
              name={messages.postal_code}
              status={getFieldStatus("postal_code")}
              path="postal_code"
            />
            <CheckoutFieldItem
              name={messages.country}
              status={getFieldStatus("country")}
              path="country"
            />
            <CheckoutFieldItem
              name={messages.state}
              status={getFieldStatus("state")}
              path="state"
            />
            <CheckoutFieldItem
              name={messages.city}
              status={getFieldStatus("city")}
              path="city"
            />
            <CheckoutFieldItem
              name={messages.customerComment}
              status={getFieldStatus("comments")}
              path="comments"
            />
          </List>
        </div>
      </Paper>
    </>
  )
}

export default EmailSettings

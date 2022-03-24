import Divider from "material-ui/Divider"
import FontIcon from "material-ui/FontIcon"
import { List, ListItem } from "material-ui/List"
import Paper from "material-ui/Paper"
import React, { FC, useEffect } from "react"
import { Link } from "react-router-dom"

const MethodItem = ({ method }) => {
  return (
    <div>
      <Divider />
      <Link
        to={`/admin/settings/payments/${method.id}`}
        style={{ textDecoration: "none" }}
      >
        <ListItem
          rightIcon={
            <FontIcon className="material-icons">keyboard_arrow_right</FontIcon>
          }
          style={!method.enabled ? { color: "rgba(0, 0, 0, 0.3)" } : {}}
          primaryText={
            <div className="row">
              <div className="col-xs-6">{method.name}</div>
              <div className="col-xs-6" style={{ color: "rgba(0, 0, 0, 0.4)" }}>
                {method.description}
              </div>
            </div>
          }
        />
      </Link>
    </div>
  )
}

interface Props {
  paymentMethods
  onLoad
}

const EmailSettings: FC<Props> = props => {
  const { paymentMethods, onLoad } = props

  useEffect(() => {
    onLoad()
  }, [])

  const methods = paymentMethods.map((method, index) => (
    <MethodItem key={index} method={method} />
  ))

  return (
    <Paper className="paper-box" zDepth={1}>
      <div style={{ width: "100%" }}>
        <List style={{ padding: 0 }}>{methods}</List>
      </div>
    </Paper>
  )
}

export default EmailSettings

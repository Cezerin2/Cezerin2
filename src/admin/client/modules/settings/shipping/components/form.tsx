import { KeyboardArrowRight } from "@mui/icons-material"
import Divider from "material-ui/Divider"
import { List, ListItem } from "material-ui/List"
import Paper from "material-ui/Paper"
import React, { FC, useEffect } from "react"
import { Link } from "react-router-dom"

const MethodItem = ({ method }) => (
  <>
    <Divider />
    <Link
      to={`/admin/settings/shipping/${method.id}`}
      style={{ textDecoration: "none" }}
    >
      <ListItem
        rightIcon={<KeyboardArrowRight />}
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
  </>
)

interface Props {
  shippingMethods
  onLoad: () => void
}

const EmailSettings: FC<Props> = props => {
  const { shippingMethods, onLoad } = props

  useEffect(() => {
    onLoad()
  }, [])

  const methods = shippingMethods.map((method, index) => (
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

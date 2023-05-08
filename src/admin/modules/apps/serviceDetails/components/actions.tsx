import api from "lib/api"
import messages from "lib/text"
import Paper from "material-ui/Paper"
import RaisedButton from "material-ui/RaisedButton"
import React, { FC, useState } from "react"
import style from "./style.sass"

interface props {
  action
  serviceId
  fetchServiceLogs
}

const ActionComponent: FC<props> = props => {
  const [loading, setLoading] = useState(false)

  const { action, serviceId, fetchServiceLogs } = props

  const handleActionCall = () => {
    setLoading(true)

    return api.webstore.services.actions
      .call(serviceId, action.id)
      .then(({ status, json }) => {
        setLoading(false)
        fetchServiceLogs()
      })
      .catch(error => {
        alert(error)
        setLoading(false)
        fetchServiceLogs()
      })
  }

  return (
    <div className={style.action}>
      <div className="row middle-xs">
        <div className="col-xs-7" style={{ fontSize: "14px" }}>
          {action.description}
        </div>
        <div className="col-xs-5" style={{ textAlign: "right" }}>
          <RaisedButton
            label={action.name}
            primary
            disabled={loading}
            onClick={handleActionCall}
          />
        </div>
      </div>
    </div>
  )
}

const ServiceActions = ({ actions, serviceId, fetchServiceLogs }) => {
  const buttons = actions.map((action, index) => (
    <ActionComponent
      key={index}
      action={action}
      serviceId={serviceId}
      fetchServiceLogs={fetchServiceLogs}
    />
  ))

  return (
    <div style={{ maxWidth: 720, width: "100%" }}>
      <div className="gray-title" style={{ margin: "15px 0 15px 20px" }}>
        {messages.serviceActions}
      </div>
      <Paper className="paper-box" zDepth={1}>
        <div>{buttons}</div>
      </Paper>
    </div>
  )
}

export default ServiceActions

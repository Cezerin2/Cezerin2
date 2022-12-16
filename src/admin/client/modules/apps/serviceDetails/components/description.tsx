import parse from "html-react-parser"
import { sanitize } from "isomorphic-dompurify"
import messages from "lib/text"
import Paper from "material-ui/Paper"
import RaisedButton from "material-ui/RaisedButton"
import React from "react"
import style from "./style.sass"

const ServiceDescription = ({
  service,
  loadingEnableDisable,
  enableService,
  disableService,
}) => {
  if (service) {
    return (
      <div style={{ maxWidth: 720, width: "100%" }}>
        <Paper className="paper-box" zDepth={1}>
          <div className={style.innerBox}>
            <div className="row">
              <div className="col-xs-4">
                <img
                  src={service.cover_url}
                  alt={service.name}
                  className={style.cover}
                />
              </div>
              <div className="col-xs-8">
                <h1 className={style.title}>{service.name}</h1>
                <div className={style.developer}>{service.developer.name}</div>
                {!service.enabled && (
                  <RaisedButton
                    label={messages.enable}
                    primary
                    disabled={loadingEnableDisable}
                    onClick={enableService}
                  />
                )}
                {service.enabled && (
                  <RaisedButton
                    label={messages.disable}
                    disabled={loadingEnableDisable}
                    onClick={disableService}
                  />
                )}
              </div>
            </div>
            <div className={style.description}>
              {parse(sanitize(service.description))}
            </div>
          </div>
        </Paper>
      </div>
    )
  } else {
    return null
  }
}

export default ServiceDescription

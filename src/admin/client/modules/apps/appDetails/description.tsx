import parse from "html-react-parser"
import { sanitize } from "isomorphic-dompurify"
import Paper from "material-ui/Paper"
import React from "react"
import style from "./style.sass"

const AppDescription = ({
  name,
  description,
  coverUrl,
  developer,
  enabled,
}) => (
  <div style={{ maxWidth: 720, width: "100%" }}>
    <Paper className="paper-box" zDepth={1}>
      <div className={style.innerBox}>
        <div className="row">
          <div className="col-xs-4">
            <img src={coverUrl} alt={name} className={style.cover} />
          </div>
          <div className="col-xs-8">
            <h1 className={style.title}>{name}</h1>
            <div className={style.developer}>{developer}</div>
            {/* {!enabled &&
              <RaisedButton label={messages.enable} primary disabled={loadingEnableDisable} onClick={enableService} />
            }
            {enabled &&
              <RaisedButton label={messages.disable} disabled={loadingEnableDisable} onClick={disableService} />
            } */}
          </div>
        </div>
        <div className={style.description}>{parse(sanitize(description))}</div>
      </div>
    </Paper>
  </div>
)

export default AppDescription

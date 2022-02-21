import Paper from "material-ui/Paper"
import React from "react"
import apps from "src/apps"
import AppDescription from "./description"
import style from "./style.css"

const AppDetails = ({ match }) => {
  const { appKey } = match.params
  const app = apps.find(a => a.Description.key === appKey)
  const AppModule = app.App
  const appDescription = app.Description

  return (
    <div className={style.detailsContainer + " scroll col-full-height"}>
      <AppDescription {...appDescription} />
      <div style={{ maxWidth: 720, width: "100%" }}>
        <Paper className="paper-box" zDepth={1}>
          <div className={style.innerBox}>
            <AppModule />
          </div>
        </Paper>
      </div>
    </div>
  )
}

export default AppDetails

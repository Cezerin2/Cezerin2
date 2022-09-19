import { KeyboardArrowRight } from "@mui/icons-material"
import messages from "lib/text"
import { List, ListItem } from "material-ui/List"
import Paper from "material-ui/Paper"
import React, { FC, useEffect } from "react"
import { Link } from "react-router-dom"

interface Props {
  importSettings
  onLoad: () => void
}

const ImportSettings: FC<Props> = props => {
  const { importSettings, onLoad } = props

  useEffect(() => {
    onLoad()
  }, [])

  return (
    <Paper className="paper-box" zDepth={1}>
      <div style={{ width: "100%" }}>
        <List style={{ padding: 0 }}>
          <Link
            to="/admin/settings/import/googlespreadsheet"
            style={{ textDecoration: "none" }}
          >
            <ListItem
              rightIcon={<KeyboardArrowRight />}
              primaryText={
                <div className="row">
                  <div className="col-xs-6">
                    {messages.settings_spreadsheet}
                  </div>
                </div>
              }
            />
          </Link>
        </List>
      </div>
    </Paper>
  )
}

export default ImportSettings

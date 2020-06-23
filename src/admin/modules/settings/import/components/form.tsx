import React from "react"
import { Link } from "react-router-dom"
import messages from "lib/text"

import Paper from "material-ui/Paper"
import Divider from "material-ui/Divider"
import FontIcon from "material-ui/FontIcon"
import { List, ListItem } from "material-ui/List"

export default class ImportSettings extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this.props.onLoad()
  }

  render() {
    const { importSettings } = this.props

    return (
      <div>
        <Paper className="paper-box" zDepth={1}>
          <div style={{ width: "100%" }}>
            <List style={{ padding: 0 }}>
              <Link
                to="/admin/settings/import/googlespreadsheet"
                style={{ textDecoration: "none" }}
              >
                <ListItem
                  rightIcon={
                    <FontIcon className="material-icons">
                      keyboard_arrow_right
                    </FontIcon>
                  }
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
      </div>
    )
  }
}

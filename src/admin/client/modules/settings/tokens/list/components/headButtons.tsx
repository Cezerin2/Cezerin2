import { Add } from "@mui/icons-material"
import messages from "lib/text"
import IconButton from "material-ui/IconButton"
import React from "react"
import { Link } from "react-router-dom"

const Buttons = () => (
  <span>
    <Link to="/admin/settings/tokens/add">
      <IconButton
        touch
        tooltipPosition="bottom-left"
        tooltip={messages.settings_addToken}
      >
        <Add htmlColor="#fff" />
      </IconButton>
    </Link>
  </span>
)

export default Buttons

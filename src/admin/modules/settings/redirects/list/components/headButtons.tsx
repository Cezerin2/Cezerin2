import { Add } from "@mui/icons-material"
import messages from "lib/text"
import IconButton from "material-ui/IconButton"
import React from "react"
import { Link } from "react-router-dom"

const Buttons = () => (
  <span>
    <Link to="/admin/settings/redirects/add">
      <IconButton
        touch
        tooltipPosition="bottom-left"
        tooltip={messages.redirectAdd}
      >
        <Add htmlColor="#fff" />
      </IconButton>
    </Link>
  </span>
)

export default Buttons

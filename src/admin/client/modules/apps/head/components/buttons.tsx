import messages from "lib/text"
import FontIcon from "material-ui/FontIcon"
import IconButton from "material-ui/IconButton"
import IconMenu from "material-ui/IconMenu"
import MenuItem from "material-ui/MenuItem"
import React from "react"
import { Link } from "react-router-dom"

const WebStoreMenu = () => (
  <IconMenu
    iconButtonElement={
      <IconButton touch>
        <FontIcon color="#fff" className="material-icons">
          more_vert
        </FontIcon>
      </IconButton>
    }
    targetOrigin={{ horizontal: "right", vertical: "top" }}
    anchorOrigin={{ horizontal: "right", vertical: "top" }}
  >
    <MenuItem
      containerElement={<Link to="/admin/apps/account" />}
      primaryText={messages.account}
    />
  </IconMenu>
)

export default WebStoreMenu

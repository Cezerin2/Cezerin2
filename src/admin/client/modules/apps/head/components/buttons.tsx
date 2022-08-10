import { MoreVert } from "@mui/icons-material"
import { IconButton, Menu, MenuItem } from "@mui/material"
import messages from "lib/text"
import React, { FC, useState } from "react"
import { Link } from "react-router-dom"

const WebStoreMenu: FC = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)

  const open = Boolean(anchorEl)
  const handleClose = () => setAnchorEl(null)

  return (
    <>
      <IconButton
        aria-label="more"
        aria-controls={open ? "long-menu" : undefined}
        aria-expanded={open ? "true" : undefined}
        aria-haspopup="true"
        onClick={event => setAnchorEl(event.currentTarget)}
      >
        <MoreVert htmlColor="#fff" />
      </IconButton>
      <Menu
        MenuListProps={{
          "aria-labelledby": "long-button",
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "top" }}
      >
        <MenuItem onClick={handleClose}>
          <Link to="/admin/apps/account">{messages.account}</Link>
        </MenuItem>
      </Menu>
    </>
  )
}

export default WebStoreMenu

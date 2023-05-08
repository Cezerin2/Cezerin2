import {
  Apps,
  Description,
  ExitToApp,
  Folder,
  Home,
  LocalOffer,
  Menu as MenuIcon,
  Person,
  Settings,
  ShoppingCart,
} from "@mui/icons-material"
import messages from "lib/text"
import AppBar from "material-ui/AppBar"
import Divider from "material-ui/Divider"
import Drawer from "material-ui/Drawer"
import IconButton from "material-ui/IconButton"
import Menu from "material-ui/Menu"
import MenuItem from "material-ui/MenuItem"
import React from "react"
import { NavLink } from "react-router-dom"

const menuItems = [
  {
    title: messages.drawer_home,
    url: "/admin/",
    icon: Home,
  },
  {
    title: messages.drawer_products,
    url: "/admin/products",
    icon: LocalOffer,
  },
  {
    title: messages.drawer_orders,
    url: "/admin/orders",
    icon: ShoppingCart,
  },
  {
    title: messages.drawer_customers,
    url: "/admin/customers",
    icon: Person,
  },
  {
    title: messages.settings_pages,
    url: "/admin/pages",
    icon: Description,
  },
  {
    title: messages.files,
    url: "/admin/files",
    icon: Folder,
  },
  {
    title: "-",
    url: Settings,
  },
  {
    title: messages.drawer_settings,
    url: "/admin/settings",
    icon: Settings,
  },
  {
    title: messages.apps,
    url: "/admin/apps",
    icon: Apps,
  },
  {
    title: messages.drawer_logout,
    url: "/admin/logout",
    icon: ExitToApp,
  },
]

const styles = {
  link: {
    display: "block",
    color: "rgba(0,0,0,0.82)",
    textDecoration: "none",
  },
  linkActive: {
    color: "rgb(25, 118, 210)",
    backgroundColor: "rgba(0,0,0,0.05)",
  },
  icon: {
    left: 12,
    color: "rgba(0,0,0,0.54)",
  },
  iconActive: {
    left: 12,
    color: "inherit",
  },
  itemInnerDiv: {
    paddingLeft: 76,
    fontSize: 14,
    fontWeight: 500,
    color: "inherit",
  },
  item: {
    color: "inherit",
  },
  appBar: {
    backgroundColor: "#fff",
    paddingLeft: 28,
  },
  appBarTitle: {
    color: "#777",
    fontSize: 18,
  },
  menu: {
    paddingTop: 0,
  },
}

const DrawerMenu = ({ open, onClose, currentUrl }) => {
  const items = menuItems.map((item, index) =>
    item.title === "-" ? (
      <Divider key={index} />
    ) : (
      <NavLink
        to={item.url}
        key={index}
        exact
        style={styles.link}
        activeStyle={styles.linkActive}
      >
        <MenuItem
          onClick={onClose}
          primaryText={item.title}
          innerDivStyle={styles.itemInnerDiv}
          style={styles.item}
          leftIcon={
            <item.icon
              style={item.url === currentUrl ? styles.iconActive : styles.icon}
            />
          }
        />
      </NavLink>
    )
  )

  return (
    <Drawer docked={false} width={280} open={open} onRequestChange={onClose}>
      <AppBar
        title={messages.drawer_title}
        style={styles.appBar}
        titleStyle={styles.appBarTitle}
        zDepth={0}
        iconElementLeft={
          <IconButton onClick={onClose}>
            <MenuIcon htmlColor="#9e9e9e" />
          </IconButton>
        }
      />
      <Menu listStyle={styles.menu} disableAutoFocus>
        {items}
      </Menu>
    </Drawer>
  )
}

export default DrawerMenu

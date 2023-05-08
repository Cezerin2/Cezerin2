import {
  Email as EmailIcon,
  GetApp,
  Http,
  LocalShipping,
  Palette,
  Payment,
  Settings as SettingsIcon,
  ShoppingCart,
  SwapCalls,
  VpnKey,
} from "@mui/icons-material"
import messages from "lib/text"
import { List, ListItem } from "material-ui/List"
import Checkout from "modules/settings/checkout"
import CheckoutFields from "modules/settings/checkoutFields"
import Email from "modules/settings/email"
import EmailTemplate from "modules/settings/emailTemplates"
import General from "modules/settings/general"
import GeneralLogo from "modules/settings/generalLogo"
import GoogleSpredsheet from "modules/settings/googlespreadsheet"
import Import from "modules/settings/import"
import Payments from "modules/settings/payments"
import PaymentsEdit from "modules/settings/paymentsEdit"
import RedirectsEdit from "modules/settings/redirects/edit"
import Redirects from "modules/settings/redirects/list"
import Shipping from "modules/settings/shipping"
import ShippingEdit from "modules/settings/shippingEdit"
import Smtp from "modules/settings/smtp"
import Theme from "modules/settings/theme"
import TokensEdit from "modules/settings/tokens/edit"
import Tokens from "modules/settings/tokens/list"
import WebhooksEdit from "modules/settings/webhooks/edit"
import Webhooks from "modules/settings/webhooks/list"
import React from "react"
import { NavLink, Route, Switch } from "react-router-dom"

const styles = {
  link: {
    color: "inherit",
    textDecoration: "none",
    fontWeight: "inherit",
    display: "block",
  },
  linkActive: {
    backgroundColor: "rgba(0,0,0,0.1)",
  },
}

const SettingsMenu = () => (
  <List>
    <NavLink
      style={styles.link}
      activeStyle={styles.linkActive}
      to="/admin/settings"
      exact
    >
      <ListItem
        primaryText={messages.settings_general}
        leftIcon={<SettingsIcon />}
      />
    </NavLink>
    <NavLink
      style={styles.link}
      activeStyle={styles.linkActive}
      to="/admin/settings/shipping"
    >
      <ListItem
        primaryText={messages.settings_shipping}
        leftIcon={<LocalShipping />}
      />
    </NavLink>
    <NavLink
      style={styles.link}
      activeStyle={styles.linkActive}
      to="/admin/settings/payments"
    >
      <ListItem
        primaryText={messages.settings_payments}
        leftIcon={<Payment />}
      />
    </NavLink>
    <NavLink
      style={styles.link}
      activeStyle={styles.linkActive}
      to="/admin/settings/theme"
    >
      <ListItem primaryText={messages.settings_theme} leftIcon={<Palette />} />
    </NavLink>
    <NavLink
      style={styles.link}
      activeStyle={styles.linkActive}
      to="/admin/settings/checkout"
    >
      <ListItem
        primaryText={messages.settings_checkout}
        leftIcon={<ShoppingCart />}
      />
    </NavLink>
    <NavLink
      style={styles.link}
      activeStyle={styles.linkActive}
      to="/admin/settings/email"
    >
      <ListItem
        primaryText={messages.settings_emails}
        leftIcon={<EmailIcon />}
      />
    </NavLink>
    <NavLink
      style={styles.link}
      activeStyle={styles.linkActive}
      to="/admin/settings/redirects"
    >
      <ListItem primaryText={messages.redirects} leftIcon={<SwapCalls />} />
    </NavLink>
    <NavLink
      style={styles.link}
      activeStyle={styles.linkActive}
      to="/admin/settings/import"
      exact
    >
      <ListItem primaryText={messages.drawer_importing} leftIcon={<GetApp />} />
    </NavLink>
    <NavLink
      style={styles.link}
      activeStyle={styles.linkActive}
      to="/admin/settings/webhooks"
    >
      <ListItem primaryText={messages.webhooks} leftIcon={<Http />} />
    </NavLink>
    <NavLink
      style={styles.link}
      activeStyle={styles.linkActive}
      to="/admin/settings/tokens"
    >
      <ListItem primaryText={messages.settings_tokens} leftIcon={<VpnKey />} />
    </NavLink>
    {/* <NavLink style={styles.link} activeStyle={styles.linkActive} to="/admin/settings/taxes"><ListItem primaryText={messages.settings_taxes} leftIcon={<AttachMoney/>}/></NavLink>
    <NavLink style={styles.link} activeStyle={styles.linkActive} to="/admin/settings/security"><ListItem primaryText={messages.settings_security} leftIcon={<Security/>}/></NavLink> */}
  </List>
)

const Settings = () => (
  <div className="row row--no-gutter col-full-height">
    <div className="col-xs-12 col-sm-4 col-md-3 col--no-gutter scroll col-full-height">
      <SettingsMenu />
    </div>
    <div className="col-xs-12 col-sm-8 col-md-9 col--no-gutter scroll col-full-height">
      <Switch>
        <Route path="/admin/settings" exact component={General} />
        <Route path="/admin/settings/general/logo" component={GeneralLogo} />
        <Route path="/admin/settings/theme" component={Theme} />
        <Route path="/admin/settings/shipping" exact component={Shipping} />
        <Route
          path="/admin/settings/shipping/add"
          exact
          component={ShippingEdit}
        />
        <Route
          path="/admin/settings/shipping/:methodId"
          component={ShippingEdit}
        />
        <Route path="/admin/settings/payments" exact component={Payments} />
        <Route
          path="/admin/settings/payments/add"
          exact
          component={PaymentsEdit}
        />
        <Route
          path="/admin/settings/payments/:methodId"
          component={PaymentsEdit}
        />
        <Route path="/admin/settings/tokens" exact component={Tokens} />
        <Route path="/admin/settings/tokens/add" exact component={TokensEdit} />
        <Route path="/admin/settings/tokens/:tokenId" component={TokensEdit} />
        <Route path="/admin/settings/email" exact component={Email} />
        <Route path="/admin/settings/email/smtp" component={Smtp} />
        <Route
          path="/admin/settings/email/templates/:templateName"
          component={EmailTemplate}
        />
        <Route path="/admin/settings/import" exact component={Import} />
        <Route
          path="/admin/settings/import/googlespreadsheet"
          exact
          component={GoogleSpredsheet}
        />
        <Route path="/admin/settings/checkout" exact component={Checkout} />
        <Route
          path="/admin/settings/checkout/fields/:fieldName"
          component={CheckoutFields}
        />
        <Route path="/admin/settings/redirects" exact component={Redirects} />
        <Route
          path="/admin/settings/redirects/add"
          exact
          component={RedirectsEdit}
        />
        <Route
          path="/admin/settings/redirects/:redirectId"
          component={RedirectsEdit}
        />
        <Route path="/admin/settings/webhooks" exact component={Webhooks} />
        <Route
          path="/admin/settings/webhooks/add"
          exact
          component={WebhooksEdit}
        />
        <Route
          path="/admin/settings/webhooks/:webhookId"
          component={WebhooksEdit}
        />
      </Switch>
    </div>
  </div>
)

export default Settings

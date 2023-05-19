import React from "react"
import PropTypes from "prop-types"
import { NavLink } from "react-router-dom"
import { themeSettings, text } from "../lib/settings"
import storeSettings from "../../../config/store"

class FooterMenu extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isActive: false,
    }
  }

  isActiveToggle = () => {
    this.setState({
      isActive: !this.state.isActive,
    })
  }

  render() {
    const { title, items } = this.props
    let ulItems = null

    if (items && items.length > 0) {
      ulItems = items.map((item, index) => (
        <li className="footer-menu__link" key={index}>
          <NavLink to={item.url || ""}>{item.text}</NavLink>
        </li>
      ))
    }

    return (
      <div>
        <div className={`footer__title`}>{title}</div>
        <ul className="footer-menu">{ulItems}</ul>
      </div>
    )
  }
}

const SocialIcons = ({ icons }) => {
  if (icons && icons.length > 0) {
    const items = icons.map((icon, index) => (
      <a
        key={index}
        href={icon.url || ""}
        target="_blank"
        rel="noopener"
        title={icon.type}
        className={icon.type}
      />
    ))
    return <div className="social-icons">{items}</div>
  }
  return null
}

const Contacts = ({ contacts }) => {
  if (contacts && contacts.length > 0) {
    const items = contacts.map((item, index) => {
      const contact = item ? item.text : null
      if (contact && contact.indexOf("@") > 0) {
        return (
          <li key={index}>
            <a href={`mailto:${contact}`}>{contact}</a>
          </li>
        )
      }
      if (
        contact &&
        (contact.indexOf("+1") == 0 || contact.indexOf("1") == 0)
      ) {
        let contactTel = contact
        let re1 = new RegExp(/[-()\s/\\]/g)
        contactTel = contactTel.replace(re1, "")
        return (
          <li key={index}>
            <a className="footer-contacts__phone" href={`tel:${contactTel}`}>
              {contact}
            </a>
          </li>
        )
      }
      return <li key={index}>{contact}</li>
    })
    return <ul className="footer-contacts">{items}</ul>
  }
  return null
}

export default class Footer extends React.PureComponent {
  static propTypes = {
    settings: PropTypes.shape({}).isRequired,
  }

  render() {
    const { settings } = this.props
    const footerLogoUrl =
      settings.logo && settings.logo.length > 0 ? settings.logo : null

    return (
      <footer className="footer">
        <div className="footer__contacts">
          <div className="footer__title">Contacts</div>
          <Contacts contacts={themeSettings.footer_contacts} />
        </div>
        <div className="footer__socials">
          <div className="footer__title">Social Networks</div>
          <SocialIcons icons={themeSettings.footer_social} />
        </div>
        <div className="footer__menu">
          <FooterMenu
            title={themeSettings.footer_menu_1_title}
            items={themeSettings.footer_menu_1_items}
          />
        </div>
      </footer>
    )
  }
}

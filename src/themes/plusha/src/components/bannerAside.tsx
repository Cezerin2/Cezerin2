import React, { Component } from "react"
import ReactDOM from "react-dom"
import { NavLink } from "react-router-dom"

class BannerAside extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    return (
      <div className="banner-aside is-hidden-mobile">
        <NavLink to="">
          <div className="banner-aside__content">
            <div className="banner-aside__image">
              <img
                src="/assets/images/banner_aside.jpg"
                srcSet="/assets/images/banner_aside@2x.jpg 2x"
                alt=""
              />
            </div>
            <div className="banner-aside__text">Sale 10%</div>
          </div>
        </NavLink>
      </div>
    )
  }
}

export default BannerAside

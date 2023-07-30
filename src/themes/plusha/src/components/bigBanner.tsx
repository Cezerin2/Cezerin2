import React, { Component } from "react"
import ReactDOM from "react-dom"
import { NavLink } from "react-router-dom"

class BigBanner extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    return (
      <NavLink to="">
        <div className="big-banner__content">
          <div className="big-banner__image">
            <picture>
              <source
                media="(min-width: 769px)"
                sizes="(min-width: 769px) 1170px"
                srcSet="/assets/images/bigbanner.jpg, /assets/images/bigbanner@2x.jpg 2x"
              />
              <img src="/assets/images/bigbanner.jpg" alt="Banner" />
            </picture>
          </div>
          <div className="big-banner__text">
            Join our community at t.me/Cezerin
            <button
              type="button"
              className="big-banner__button button button_gallery"
            >
              Go
            </button>
          </div>
        </div>
      </NavLink>
    )
  }
}

export default BigBanner

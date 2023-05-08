import messages from "lib/text"
import React from "react"

export default () => (
  <div className="block404">
    <div className="title">404</div>
    <div className="description">{messages.pageNotFound}</div>
  </div>
)

import React from "react"
import * as helper from "../../lib/helper"
import { themeSettings, text } from "../../lib/settings"

const Tags = ({ tags }) => {
  if (tags && tags.length > 0) {
    return (
      <div className="product__tags tags">
        {tags.map((tag, index) => (
          <span key={index} className="tag">
            {tag}
          </span>
        ))}
      </div>
    )
  }
  return null
}

export default Tags

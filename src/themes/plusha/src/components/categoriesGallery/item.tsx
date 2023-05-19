import React from "react"
import { NavLink } from "react-router-dom"
import { themeSettings, text } from "../../lib/settings"

const Item = ({ category }) => {
  const imageHeight =
    themeSettings.list_image_max_height &&
    themeSettings.list_image_max_height > 0
      ? themeSettings.list_image_max_height
      : "auto"
  const placeholderHeight =
    themeSettings.list_image_max_height &&
    themeSettings.list_image_max_height > 0
      ? themeSettings.list_image_max_height
      : 200

  return (
    <div className="categories-gallery__item">
      <NavLink to={category.path}>
        <div
          className="categories-gallery__image"
          style={{
            backgroundImage: `url(${
              category.image || "/assets/images/noimage.svg"
            })`,
          }}
        ></div>
        <div className="categories-gallery__name">{category.name}</div>
      </NavLink>
    </div>
  )
}

export default Item

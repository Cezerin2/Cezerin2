import React from "react"
import Item from "./item"

const ServiceItem = ({ service }) => (
  <Item
    path={`/admin/apps/service/${service.id}`}
    coverUrl={service.cover_url}
    title={service.name}
    developer={service.developer.name}
    enabled={service.enabled}
  />
)

export default ServiceItem

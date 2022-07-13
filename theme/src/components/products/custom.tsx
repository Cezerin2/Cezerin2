import PropTypes from "prop-types"
import React, { FC, useEffect, useState } from "react"
import api from "../../lib/api"
import ProductList from "../productList"

interface Props {
  settings
  addCartItem
  isCentered
  className
  columnCountOnMobile
  columnCountOnTablet
  columnCountOnDesktop
  columnCountOnWidescreen
  columnCountOnFullhd
}

const CustomProducts: FC<Props> = props => {
  const [products, setProducts] = useState([])
  const [isCancelled, setIsCancelled] = useState(false)

  const {
    settings,
    addCartItem,
    isCentered,
    className,
    columnCountOnMobile,
    columnCountOnTablet,
    columnCountOnDesktop,
    columnCountOnWidescreen,
    columnCountOnFullhd,
  } = props

  useEffect(() => {
    fetchProducts(props)

    return () => {
      setIsCancelled(true)
    }
  }, [])

  useEffect(() => {
    fetchProducts(props)
  }, [props])

  const fetchProducts = ({
    ids,
    sku,
    sort,
    limit,
    category_id,
    tags,
    attributes,
    price_from,
    price_to,
    on_sale,
  }) => {
    const filter = {
      ids,
      sku,
      tags,
      on_sale,
      search: null,
      category_id,
      price_from,
      price_to,
      sort,
      fields:
        "path,id,name,category_id,category_name,sku,images,enabled,discontinued,stock_status,stock_quantity,price,on_sale,regular_price,attributes,tags",
      limit: limit || 4,
      offset: 0,
    }

    if (attributes && Array.isArray(attributes) && attributes.length > 0) {
      attributes.forEach(attr => {
        filter[`attributes.${attr.name}`] = attr.value
      })
    }

    api.ajax.products
      .list(filter)
      .then(({ json }) => {
        if (!isCancelled) {
          setProducts(json.data)
        }
      })
      .catch(() => {})
  }

  return (
    <ProductList
      products={products}
      addCartItem={addCartItem}
      settings={settings}
      loadMoreProducts={null}
      hasMore={false}
      columnCountOnMobile={columnCountOnMobile}
      columnCountOnTablet={columnCountOnTablet}
      columnCountOnDesktop={columnCountOnDesktop}
      columnCountOnWidescreen={columnCountOnWidescreen}
      columnCountOnFullhd={columnCountOnFullhd}
      isCentered={isCentered}
      className={className}
    />
  )
}

CustomProducts.propTypes = {
  ids: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string),
  ]),
  sku: PropTypes.string,
  sort: PropTypes.string,
  limit: PropTypes.number.isRequired,
  category_id: PropTypes.string,
  tags: PropTypes.string,
  attributes: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired,
    })
  ),
  price_from: PropTypes.number,
  price_to: PropTypes.number,
  on_sale: PropTypes.bool,
  settings: PropTypes.shape({}).isRequired,
  addCartItem: PropTypes.func.isRequired,
  isCentered: PropTypes.bool,
  className: PropTypes.string,
  columnCountOnMobile: PropTypes.number,
  columnCountOnTablet: PropTypes.number,
  columnCountOnDesktop: PropTypes.number,
  columnCountOnWidescreen: PropTypes.number,
  columnCountOnFullhd: PropTypes.number,
}

CustomProducts.defaultProps = {
  ids: null,
  sku: null,
  sort: null,
  category_id: null,
  tags: null,
  attributes: null,
  price_from: null,
  price_to: null,
  on_sale: null,
  isCentered: true,
  className: "columns is-multiline is-mobile products",
  columnCountOnMobile: 2,
  columnCountOnTablet: 3,
  columnCountOnDesktop: 4,
  columnCountOnWidescreen: 4,
  columnCountOnFullhd: 4,
}

export default CustomProducts

import React, { FC, useEffect } from "react"
import { Link } from "react-router-dom"
import { formatCurrency } from "../../lib/helper"
import { text } from "../../lib/settings"
import MetaTags from "../metaTags"

interface WishlistPageProps {
  wishlist: any
  settings: any
  fetchWishlist: () => void
  deleteWishlistItem: (itemId: string) => void
  addCartItem: (item: any) => void
}

const WishlistItem: FC<{
  item: any
  settings: any
  onRemove: (itemId: string) => void
  onAddToCart: (item: any) => void
}> = ({ item, settings, onRemove, onAddToCart }) => {
  const handleAddToCart = () => {
    const cartItem = {
      product_id: item.product_id,
      variant_id: item.variant_id,
      quantity: 1
    }
    onAddToCart(cartItem)
  }

  return (
    <div className="wishlist-item">
      <div className="wishlist-item-image">
        {item.image_url && (
          <Link to={item.path || `/product/${item.product_id}`}>
            <img src={item.image_url} alt={item.name || "Product"} />
          </Link>
        )}
      </div>
      
      <div className="wishlist-item-details">
        <div className="wishlist-item-name">
          <Link to={item.path || `/product/${item.product_id}`}>
            {item.name || "Product"}
          </Link>
        </div>
        
        {item.price && (
          <div className="wishlist-item-price">
            {formatCurrency(item.price, settings)}
          </div>
        )}
        
        <div className="wishlist-item-actions">
          <button 
            className="button is-primary"
            onClick={handleAddToCart}
          >
            {text.addToCart || "Add to Cart"}
          </button>
          
          <button 
            className="button is-light"
            onClick={() => onRemove(item.id)}
          >
            {text.remove || "Remove"}
          </button>
        </div>
      </div>
    </div>
  )
}

const WishlistPage: FC<WishlistPageProps> = ({
  wishlist,
  settings,
  fetchWishlist,
  deleteWishlistItem,
  addCartItem
}) => {
  useEffect(() => {
    fetchWishlist()
  }, [])

  const title = text.wishlist || "Wishlist"
  const description = text.wishlistDescription || "Your saved items"

  if (!wishlist || !wishlist.items || wishlist.items.length === 0) {
    return (
      <div className="container">
        <MetaTags
          title={title}
          description={description}
          canonicalUrl={`${settings.domain}/wishlist`}
        />
        
        <div className="section">
          <div className="container">
            <div className="content has-text-centered">
              <h1 className="title">{title}</h1>
              <p>{text.wishlistEmpty || "Your wishlist is empty"}</p>
              <Link to="/products" className="button is-primary">
                {text.continueShopping || "Continue Shopping"}
              </Link>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="container">
      <MetaTags
        title={title}
        description={description}
        canonicalUrl={`${settings.domain}/wishlist`}
      />
      
      <div className="section">
        <div className="container">
          <h1 className="title">{title}</h1>
          
          <div className="wishlist-items">
            {wishlist.items.map(item => (
              <WishlistItem
                key={item.id}
                item={item}
                settings={settings}
                onRemove={deleteWishlistItem}
                onAddToCart={addCartItem}
              />
            ))}
          </div>
          
          <div className="wishlist-actions">
            <Link to="/products" className="button is-light">
              {text.continueShopping || "Continue Shopping"}
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default WishlistPage

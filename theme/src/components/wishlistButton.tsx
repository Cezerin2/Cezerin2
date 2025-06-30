import React, { FC, useState, useEffect } from "react"
import { text } from "../lib/settings"

interface WishlistButtonProps {
  product: any
  variant_id?: string
  addWishlistItem: (item: any) => void
  deleteWishlistItem: (itemId: string) => void
  wishlist: any
  className?: string
}

const WishlistButton: FC<WishlistButtonProps> = ({
  product,
  variant_id,
  addWishlistItem,
  deleteWishlistItem,
  wishlist,
  className = "wishlist-button"
}) => {
  const [isInWishlist, setIsInWishlist] = useState(false)
  const [wishlistItemId, setWishlistItemId] = useState(null)

  useEffect(() => {
    if (wishlist && wishlist.items) {
      const existingItem = wishlist.items.find(item => 
        item.product_id === product.id && 
        (variant_id ? item.variant_id === variant_id : !item.variant_id)
      )
      
      if (existingItem) {
        setIsInWishlist(true)
        setWishlistItemId(existingItem.id)
      } else {
        setIsInWishlist(false)
        setWishlistItemId(null)
      }
    }
  }, [wishlist, product.id, variant_id])

  const handleClick = () => {
    if (isInWishlist && wishlistItemId) {
      deleteWishlistItem(wishlistItemId)
    } else {
      const item = {
        product_id: product.id,
        variant_id: variant_id || null
      }
      addWishlistItem(item)
    }
  }

  return (
    <button
      className={`${className} ${isInWishlist ? 'in-wishlist' : ''}`}
      onClick={handleClick}
      title={isInWishlist ? text.removeFromWishlist || "Remove from Wishlist" : text.addToWishlist || "Add to Wishlist"}
    >
      <span className="wishlist-icon">
        {isInWishlist ? "♥" : "♡"}
      </span>
      <span className="wishlist-text">
        {isInWishlist ? (text.removeFromWishlist || "Remove from Wishlist") : (text.addToWishlist || "Add to Wishlist")}
      </span>
    </button>
  )
}

export default WishlistButton

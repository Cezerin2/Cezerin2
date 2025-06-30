import React, { FC } from "react"
import { connect } from "react-redux"
import { mapDispatchToProps, mapStateToProps } from "../containerProps"
import WishlistPage from "../../../../theme/src/components/wishlist/wishlistPage"

interface Props {
  state: any
  fetchWishlist: () => void
  deleteWishlistItem: (itemId: string) => void
  addCartItem: (item: any) => void
}

const WishlistContainer: FC<Props> = (props) => {
  const { state, fetchWishlist, deleteWishlistItem, addCartItem } = props

  return (
    <WishlistPage
      wishlist={state.wishlist}
      settings={state.settings}
      fetchWishlist={fetchWishlist}
      deleteWishlistItem={deleteWishlistItem}
      addCartItem={addCartItem}
    />
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(WishlistContainer)

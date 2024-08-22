import s from './wishlist-main.module.scss'
import Link from 'next/link'
import { v4 as uuidv4 } from 'uuid'
import { connect } from 'react-redux'
import {
  addToWishlist,
  deleteFromWishlist,
} from '../../redux/actions/wishlistActions'
import { getPrice, getFormat } from '../../utils'

const WishlistMain = ({ wishlistItems, deleteFromWishlist }) => {
  return wishlistItems.length >= 1 ? (
    <div className={s.wrapper}>
      <div className={s.mainTitle}>Your shopping bag</div>
      <div className={s.cardlist}>
        {wishlistItems.map((product) => {
          const { normalPrice, salePrice } = getPrice(product)
          const normalPriceFront = getFormat(normalPrice) + ' som'
          const salePriceFront = getFormat(salePrice) + ' som'
          const sizes = product.variations
            ? product.variations.nodes.map(({ size }) => ({
                size: size.nodes[0]?.value,
              }))
            : [
                {
                  size: product.paSizes.nodes[0]?.name,
                },
              ]

          return (
            <div className={s.card} key={uuidv4()}>
              <img src={product.image.sourceUrl} alt="" className={s.img} />
              <img
                src="/removeMobile.svg"
                alt=""
                className={s.removeImg}
                onClick={() => deleteFromWishlist(product)}
              />
              <div className={s.details}>
                <div className={s.nameRemove}>
                  <div>{product.name}</div>
                  <button onClick={() => deleteFromWishlist(product)}>
                    Remove <img src="/remove.svg" alt="" />
                  </button>
                </div>
                <div className={s.price}>
                  {product.onSale ? salePriceFront : normalPriceFront}
                </div>
                <div className={s.cardColorsList}></div>
                <div className={s.color}>
                  Colors:
                  {product.paColors.nodes.map(({ name, color }, i) => (
                    <div>
                      {name}
                      <span
                        key={i}
                        style={{
                          backgroundColor: color,
                        }}
                      ></span>
                    </div>
                  ))}
                </div>
                <div className={s.size}>
                  Sizes:
                  {sizes.map(({ size }, i) => (
                    <span key={i}>{size}</span>
                  ))}
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  ) : (
    <div className={s.emptyCart}>
      Wishlist is empty
      <Link href="/">
        <a>Начать покупки</a>
      </Link>
    </div>
  )
}
const mapStateToProps = (state) => {
  return {
    wishlistItems: state.wishlistData,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addToWishlist: (item) => {
      dispatch(addToWishlist(item))
    },
    deleteFromWishlist: (item) => {
      dispatch(deleteFromWishlist(item))
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(WishlistMain)

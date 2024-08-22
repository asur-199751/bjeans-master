import s from './products-list.module.scss'
import Link from 'next/link'
import { getPrice, getFormat, getDiscount } from '../../utils'
import React, { useState } from 'react'
import { connect } from 'react-redux'
import {
  addToWishlist,
  deleteFromWishlist,
} from '../../redux/actions/wishlistActions'

const ProductsList = ({
  products,
  wishlistItems,
  addToWishlist,
  deleteFromWishlist,
}) => {
  return (
    <div className={s.list}>
      {products.map((product) => {
        const { normalPrice, salePrice } = getPrice(product)
        const normalPriceFront = getFormat(normalPrice) + ' сум'
        const salePriceFront = getFormat(salePrice) + ' сум'
        const discountPrice = getDiscount(normalPrice, salePrice)
        const wishlistItem = wishlistItems.filter(
          (wishlistItem) => wishlistItem.id === product.id
        )[0]

        const sizes = product.variations
          ? product.variations.nodes.map(({ size }) => size.nodes[0]?.value)
          : [product.paSizes.nodes[0]?.name]

        const sizesNew = [...new Set(sizes)]

        // const length = product.variations
        //   ? product.variations.nodes.map(({ length }) => length)
        //   : [length]

        // const lengthNew = [...new Set(length)]

        return (
          <div className={s.card} key={product.databaseId}>
            <div className={s.cardHover}>
              <Link href={'/product/' + product.slug}>
                <a className={s.cardImg}>
                  <img
                    src={product.image.sourceUrl}
                    alt={product.name}
                    onMouseOver={(e) =>
                      (e.currentTarget.src =
                        product.galleryImages?.nodes[0]?.sourceUrl)
                    }
                    onMouseOut={(e) =>
                      (e.currentTarget.src = product.image.sourceUrl)
                    }
                  />
                </a>
              </Link>
              <div className={s.cardSizes}>
                {sizesNew.map((r, i) => (
                  <span key={i}>{r}</span>
                ))}
              </div>
              {/* <div className={s.cardLength}>
                {lengthNew.map((r, i) => (
                  <span key={i}>{r}</span>
                ))}
              </div> */}
              <div className={s.cardColors}>
                <div className={s.cardColorsLenght}>
                  {product.paColors.nodes.length}

                  {product.paColors.nodes.length >= 1
                    ? ' цвет в наличии'
                    : ' цвета в наличии'}
                </div>
                <div className={s.cardColorsList}>
                  {product.paColors.nodes.map(({ color }, i) => (
                    <div
                      key={i}
                      style={{
                        backgroundColor: color,
                      }}
                    ></div>
                  ))}
                </div>
                <div
                  className={s.cardWishlist}
                  onClick={
                    wishlistItem
                      ? () => deleteFromWishlist(product)
                      : () => addToWishlist(product)
                  }
                >
                  {wishlistItem ? (
                    <>
                      <span>In favorites</span>
                      <img src='/catalog/blackHeart.svg' alt='' />
                    </>
                  ) : (
                    <img src='/catalog/heart.svg' alt='' />
                  )}
                </div>
              </div>
            </div>
            <div className={s.cardBody}>
              <div className={s.cardName}>{product?.name} - {product?.sku}</div>
              <div className={s.cardPrice}>
                {product.onSale ? (
                  <>
                    <span className={s.salePrice}>{salePriceFront}</span>
                    <span className={s.normalPrice}>{normalPriceFront}</span>
                    <span className={s.discountPrice}>-{discountPrice}%</span>
                  </>
                ) : (
                  <span>{normalPriceFront}</span>
                )}
              </div>
            </div>
          </div>
        )
      })}
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

export default connect(mapStateToProps, mapDispatchToProps)(ProductsList)

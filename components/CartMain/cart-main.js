import s from './cart-main.module.scss'
import Offer from '../Offer'
import Link from 'next/link'
import { v4 as uuidv4 } from 'uuid'
import { connect } from 'react-redux'
import {
  addToCart,
  decreaseQuantity,
  deleteFromCart,
} from '../../redux/actions/cartActions'
import {
  addToWishlist,
  deleteFromWishlist,
} from '../../redux/actions/wishlistActions'
import { getPrice, getFormat } from '../../utils'
import COUPON from '../../queries/coupon'
import { useLazyQuery } from '@apollo/react-hooks'
import client from '../../apollo/apollo-client'
import { useEffect, useState } from 'react'
import Loader from '../Loader'

const CartMain = ({
  cartItems,
  wishlistItems,
  addToCart,
  deleteFromCart,
  decreaseQuantity,
  addToWishlist,
  deleteFromWishlist,
}) => {
  const [loadCupon, { data, loading, error }] = useLazyQuery(COUPON, {
    client,
  })
  const [name, setName] = useState('')
  const [myCoupon, setMyCoupon] = useState(
    typeof window !== 'undefined'
      ? JSON.parse(localStorage.getItem('coupon'))
      : ' '
  )
  const sendCupon = () => {
    loadCupon({
      variables: {
        id: name,
      },
    })
  }

  useEffect(() => {
    if (data && data.coupon) {
      localStorage.setItem('coupon', JSON.stringify(data.coupon))
      setMyCoupon(JSON.parse(localStorage.getItem('coupon')))
    }
  }, [data])

  let couponFront
  let cartTotalPrice = 0
  let cartTotalPrice2 = 0
  let economy = 0

  cartItems.map((product) => {
    const { normalPrice, salePrice } = getPrice(product)
    cartTotalPrice += product.onSale
      ? parseInt(salePrice) * product.quantity
      : parseInt(normalPrice) * product.quantity
    cartTotalPrice2 += product.onSale
      ? parseInt(salePrice) * product.quantity
      : parseInt(normalPrice) * product.quantity
    localStorage.setItem('cartTotalPriceFront', cartTotalPrice)
    economy += product.onSale
      ? parseInt(normalPrice) * product.quantity -
        parseInt(salePrice) * product.quantity
      : 0
  })

  if (myCoupon && myCoupon.amount) {
    switch (myCoupon.discountType) {
      case 'FIXED_CART':
        cartTotalPrice -= myCoupon.amount
        couponFront = getFormat(myCoupon.amount) + ' сум'
        break
      case 'PERCENT':
        cartTotalPrice = Math.round(
          cartTotalPrice - cartTotalPrice * (myCoupon.amount / 100)
        )
        couponFront = myCoupon.amount + ' %'
        break
      default:
        break
    }
    localStorage.setItem('cartTotalPriceFront', cartTotalPrice)
  }

  return cartItems.length >= 1 ? (
    <div className={s.wrapper}>
      <div className={s.left}>
        <div className={s.hide}>
          <Offer style='cartPage' />
        </div>
        <div className={s.mainTitle}>Ваша корзина</div>

        <div className={s.cardlist}>
          {cartItems.map((product) => {
            const { normalPrice, salePrice } = getPrice(product)
            const normalPriceFront = getFormat(normalPrice) + ' сум'
            const salePriceFront = getFormat(salePrice) + ' сум'

            const wishlistItem = wishlistItems.filter(
              (wishlistItem) => wishlistItem.id === product.id
            )[0]

            return (
              <div className={s.card} key={uuidv4()}>
                <img src={product.image.sourceUrl} alt='' className={s.img} />
                <img
                  src='/removeMobile.svg'
                  alt=''
                  className={s.removeImg}
                  onClick={() => deleteFromCart(product.selectedProductId)}
                />
                <div className={s.details}>
                  <div className={s.nameRemove}>
                    <div>{product.name}</div>
                    <button
                      onClick={() => deleteFromCart(product.selectedProductId)}
                    >
                      Удалить <img src='/remove.svg' alt='' />
                    </button>
                  </div>
                  <div className={s.price}>
                    {product.onSale ? salePriceFront : normalPriceFront}
                  </div>
                  <div className={s.color}>
                    Цвет: <span> {product.selectedProductColor}</span>
                  </div>
                  <div className={s.color}>
                    {product.name === 'Джинсы' ? 'Ширина' : 'Размер'}:
                    <span>{product.selectedProductSize}</span>
                    {product.selectedProductLength && (
                      <div>
                        , Длина:<span>{product.selectedProductLength}</span>
                      </div>
                    )}
                  </div>
                  <div className={s.color}>
                    Количество: <span> {product.quantity}</span>
                  </div>
                  <div
                    className={s.wishlist}
                    onClick={
                      wishlistItem
                        ? () => deleteFromWishlist(product)
                        : () => addToWishlist(product)
                    }
                  >
                    {wishlistItem ? (
                      <>
                        <img src='/catalog/blackHeart.svg' alt='' />
                        Сохранен на потом
                      </>
                    ) : (
                      <>
                        <img src='/catalog/heart.svg' alt='' />
                        Сохранить на потом
                      </>
                    )}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
      <div className={s.right}>
        <div className={s.rightInner}>
          <div className={s.rightTitle}>ИТОГ ЗАКАЗА</div>
          <div className={s.rightList}>
            <div>Подитог:</div>
            <div>{getFormat(cartTotalPrice2) + ' сум'}</div>
          </div>
          <div className={s.rightList}>
            <div>Купон:</div>
            <div>{couponFront ? couponFront : ' 0 сум'} </div>
          </div>
          <div className={s.rightList}>
            <div>Моя скидка:</div>
            <div>
              <div>{getFormat(economy) + ' сум'}</div>
            </div>
          </div>
          <div className={s.rightList}>
            <div>Итого:</div>
            <div>{getFormat(cartTotalPrice) + ' сум'}</div>
          </div>
          <div className={s.rightListLast}>
            <img src='/offer/shipping.svg' alt='' />
            Бесплатная доставка по Ташкенту
          </div>
          <Link href='/application'>
            <a>
              ПЕРЕЙТИ К ОПЛАТЕ
              <img src='/smallWhiteArrow.svg' alt='' />
            </a>
          </Link>
          <div className={s.methodsText}>Мы принимаем все виды оплат:</div>
          <div className={s.methodsImages}>
            <img src='/footer/click.svg' alt='' />
            <img src='/footer/payme.svg' alt='' />
            <img src='/footer/visa.svg' alt='' />
            <img src='/footer/mastercard.svg' alt='' />
          </div>
        </div>
        <div className={s.promoCode}>У вас есть промокод?</div>
        {loading ? (
          <Loader coupon />
        ) : myCoupon ? (
          <div className={s.activatedPromoCode}>
            Промокод <div>{myCoupon.code}</div> активирован!
            <button
              onClick={() => {
                setMyCoupon(localStorage.removeItem('coupon'))
                setName('')
              }}
            >
              Отменить
            </button>
          </div>
        ) : (
          <>
            {error && (
              <div className={s.wrongPromoCode}>Неправильный промокод</div>
            )}
            <div className={s.sendPromoCode}>
              <input
                type='text'
                placeholder='Введите промокод'
                onChange={(e) => setName(e.target.value)}
              />
              <button onClick={sendCupon}>Применить</button>
            </div>
          </>
        )}

        <div className={s.show}>
          <Offer style='productCard' />
        </div>
      </div>
    </div>
  ) : (
    <div className={s.emptyCart}>
      Корзина пуста
      <Link href='/'>
        <a>Начать покупки</a>
      </Link>
    </div>
  )
}
const mapStateToProps = (state) => {
  return {
    cartItems: state.cartData,
    wishlistItems: state.wishlistData,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addToCart: (item) => {
      dispatch(addToCart(item))
    },
    decreaseQuantity: (item, joki) => {
      dispatch(decreaseQuantity(item, joki))
    },
    deleteFromCart: (item) => {
      dispatch(deleteFromCart(item))
    },
    addToWishlist: (item) => {
      dispatch(addToWishlist(item))
    },
    deleteFromWishlist: (item) => {
      dispatch(deleteFromWishlist(item))
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CartMain)

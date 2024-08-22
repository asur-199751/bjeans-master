import s from './cart-modal.module.scss'
import { v4 as uuidv4 } from 'uuid'
import { useRef, useEffect } from 'react'
import { connect } from 'react-redux'
import { deleteFromCart } from '../../redux/actions/cartActions'
import Link from 'next/link'
import { getPrice, getFormat } from '../../utils'

const CartModal = ({
  cartItems,
  deleteFromCart,
  activeStatus,
  getActiveStatus,
}) => {
  const myRef = useRef()

  const handleClickOutside = (e) => {
    if (!myRef.current.contains(e.target)) {
      getActiveStatus ? getActiveStatus(false) : ''
    }
  }
  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  })

  let cartTotalPrice = 0

  return (
    <>
      <div ref={myRef} className={`${s.wrapper}  ${activeStatus && s.active}`}>
        {cartItems.length >= 1 ? (
          <>
            <div className={s.top}>
              Корзина
              <img
                src="/closeModal.svg"
                alt=""
                onClick={() => (getActiveStatus ? getActiveStatus(false) : '')}
              />
            </div>
            <div className={s.cartItemList}>
              {cartItems.map((product) => {
                const { normalPrice, salePrice } = getPrice(product)
                const normalPriceFront = getFormat(normalPrice) + ' сум'
                const salePriceFront = getFormat(salePrice) + ' сум'
                cartTotalPrice += product.onSale
                  ? parseInt(salePrice) * product.quantity
                  : parseInt(normalPrice) * product.quantity

                return (
                  <div key={uuidv4()} className={s.cartItem}>
                    <img
                      src={product.image.sourceUrl}
                      className={s.img}
                      alt=""
                    />
                    <div className={s.cartItemListInfo}>
                      <div className={s.name}>{product.name}</div>
                      <div>Цвет: {product.selectedProductColor}</div>
                      <div>
                        {product.name === 'Джинсы' ? 'Ширина' : 'Размер'}:{' '}
                        {product.selectedProductSize}
                        {product.selectedProductLength &&
                          ' , Длина:' + product.selectedProductLength}
                      </div>
                      <div>
                        {product.onSale ? salePriceFront : normalPriceFront}
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
            <div className={s.overallPrice}>
              Итоговая сумма:<span> {getFormat(cartTotalPrice) + ' сум'}</span>
            </div>
            <div className={s.shipping}>
              <img src="/offer/shipping.svg" alt="" />
              Бесплатная доставка по Ташкенту
            </div>
            <Link href="/application">
              <a className={s.application}>Оформить заказ</a>
            </Link>
            <Link href="/cart">
              <a className={s.cart}>Перейти в корзину</a>
            </Link>
          </>
        ) : (
          <div className={s.empty}>Корзина пуста</div>
        )}
      </div>
    </>
  )
}

const mapStateToProps = (state) => {
  return {
    cartItems: state.cartData,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    deleteFromCart: (item) => {
      dispatch(deleteFromCart(item))
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CartModal)

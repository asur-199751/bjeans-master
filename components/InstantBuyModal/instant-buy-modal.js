import { useState } from 'react'
import ReactModal from 'react-modal'
import axios from 'axios'
import MaskedInput from 'react-input-mask'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/router'
import { getFormat } from '../../utils'

import s from './instant-buy-modal.module.scss'
const InstantBuyModal = ({
  buy,
  setBuy,
  product,
  selectedProductId,
  selectedProductColor,
  selectedProductSize,
  selectedProductLength,
  selectedProductStock,
  normalPriceFront,
  salePriceFront,
  discountPrice,
  normalPrice,
  salePrice,
}) => {
  const { register, handleSubmit, errors } = useForm()
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('+998 ')
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  // const [thank, setThank] = useState(false);
  // const [orderID, setOrderID] = useState('');
  const [order, setOrder] = useState()
  const [success, setSuccess] = useState(false)

  const orderPrice =
    salePrice < normalPrice ? salePrice + 10500 : normalPrice + 10500
  const orderPriceTotal = [getFormat(orderPrice), 'UZS'].join(' ')
  const discountAmount = [getFormat(normalPrice - salePrice), 'UZS'].join(' ')

  const sendInfo = async () => {
    setIsLoading(true)

    const orderData = {
      set_paid: false,
      currency: 'UZS',
      status: 'processing',
      payment_method_title: 'cash',
      line_items: [
        {
          product_id: product.databaseId,
          name: product.name,
          price: product.onSale ? salePrice : normalPrice,
          quantity: product.quantity,
          variation_id: product.variations && selectedProductId,
        },
      ],
      billing: {
        first_name: name,
        phone: phone,
      },
    }

    const response = await axios.post('/api/order', { order: orderData })

    if (response.data.status) {
      setBuy(false)
      setSuccess(true)
      setOrder(response.data.order.id)
    } else {
      alert(response.data.message)
      router.reload()
    }
    setIsLoading(false)
  }

  return (
    <ReactModal
      isOpen={buy}
      onRequestClose={() => setBuy(false)}
      ariaHideApp={false}
      overlayClassName={s.modalOverlay}
      className={s.modalContent}
    >
      <div className={s.modalTop}>
        <div>
          <img src="/instantBuyModal.svg" alt="" />
          КУПИТЬ В ОДИН КЛИК
        </div>
        <img src="/closeModal.svg" alt="" onClick={() => setBuy(false)} />
      </div>
      <div className={s.product}>
        <div className={s.productNamePrice}>
          <div className={s.productName}> {product.name} </div>
          <div className={s.productPrice}>
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
        <div>
          <img src={product.image.sourceUrl} alt="" />
        </div>
      </div>
      {/* <input
        placeholder="Имя Фамилия"
        onChange={(e) => setName(e.target.value)}
      />
      <input
        placeholder="Номер телефона (с кодом)"
        onChange={(e) => setPhone(e.target.value)}
      /> */}

      <div className={s.inputs}>
        <input
          id="name"
          name="name"
          onChange={(e) => setName(e.target.value)}
          ref={register({ required: true })}
          className={`${errors.name && s.error} ${name ? s.valid : ''}`}
        />
        <label htmlFor="name">Имя Фамилия</label>
        {errors.name ? (
          <p className={s.errorMessage}>Необходимо заполнить</p>
        ) : null}
      </div>
      <div className={s.inputs}>
        <MaskedInput
          id="phone"
          mask="+\9\98 (99) 999 99 99"
          alwaysShowMask
          className={errors.phone && s.error}
          onChange={(e) => setPhone(e.target.value)}
          value={phone}
          name="phone"
        >
          {(inputProps) => (
            <input
              ref={register({
                required: true,
                pattern:
                  /^[\+]?[0-9]{3}?[-\s\.]?[(]?[0-9]{2}?[)][-\s\.]?[0-9]{3}?[-\s\.]?[0-9]{2}?[-\s\.]?[0-9]{2}$/im,
              })}
              value={phone}
              className={`${errors.phone && s.error} ${phone ? s.valid : ''}`}
              name={inputProps.name}
              {...inputProps}
            />
          )}
        </MaskedInput>
        {errors.phone ? (
          <p className={s.errorMessage}>Необходимо заполнить</p>
        ) : null}
      </div>

      <div className={s.colorSize}>
        {selectedProductColor && (
          <div>
            Цвет: <span> {selectedProductColor}</span>
          </div>
        )}
        {selectedProductSize && (
          <div>
            {product.name === 'Джинсы' ? 'Ширина' : 'Размер'}:{' '}
            <span> {selectedProductSize}</span>
          </div>
        )}
        {selectedProductLength && (
          <div>
            Длина: <span> {selectedProductLength}</span>
          </div>
        )}
      </div>
      <button
        className={s.modalButtonBlack}
        disabled={!selectedProductStock || isLoading}
        onClick={handleSubmit(sendInfo)}
      >
        {isLoading ? (
          <div className={s.loaderAnimation}></div>
        ) : (
          <>
            <img src="/instantBuyWhite.svg" alt="" />
            {!selectedProductStock ? 'НЕТ В НАЛИЧИИ' : 'КУПИТЬ В ОДИН КЛИК'}
          </>
        )}
      </button>
    </ReactModal>
  )
}

export default InstantBuyModal

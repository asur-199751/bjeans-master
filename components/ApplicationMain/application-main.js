import s from './application-main.module.scss'
import Link from 'next/link'
import { v4 as uuidv4 } from 'uuid'
import { connect } from 'react-redux'
import { getPrice, getFormat } from '../../utils'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/router'
import axios from 'axios'
import PhoneInput from 'react-phone-input-2'
import Offer from '../Offer'
import { deleteAllFromCart } from '../../redux/actions/cartActions'
import useUser from '../../utils/useUser'
import MaskedInput from 'react-input-mask'
import sha512 from 'js-sha512'
import validator from 'validator'

const cities = [
  'Ташкент',
  'Республика Каракалпакстан',
  'Андижанская область',
  'Бухарская область',
  'Джизакская область',
  'Кашкадарьинская область',
  'Навоийская область',
  'Наманганская область',
  'Самаркандская область',
  'Сурхандарьинская область',
  'Сырдарьинская область',
  'Ташкентская область',
  'Ферганская область',
  'Хорезмская область',
]

const paymentMethods = [
  { src: '/cash.svg', value: 'cod' },
  { src: '/click.svg', value: 'click' },
  { src: '/payme.svg', value: 'payme' },
  { src: '', value: 'zoodpay' },
]

const host =
  process.env.NODE_ENV === 'production'
    ? 'https://bjeans.uz'
    : 'http://localhost:3000'

const ApplicationMain = ({ cartItems, deleteAllFromCart }) => {
  let economy = 0

  cartItems.map((product) => {
    const { normalPrice, salePrice } = getPrice(product)
    economy += product.onSale
      ? parseInt(normalPrice) * product.quantity -
        parseInt(salePrice) * product.quantity
      : 0
  })

  const { register, handleSubmit, errors } = useForm()
  const router = useRouter()
  const lineItems = []

  const [city, setCity] = useState('Ташкент')
  const [address, setAddress] = useState('')
  const [name, setName] = useState('')
  const [order, setOrder] = useState()
  const [surname, setSurname] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [comment, setComment] = useState('')
  const [selectMethod, setSelectMethod] = useState(paymentMethods[0].value)
  const [isLoading, setIsLoading] = useState(false)
  const { userData } = useUser()
  const [emailError, setEmailError] = useState()

  useEffect(() => {
    if (userData && userData.isLoggedIn) {
      setPhone(userData.user.username)
      setAddress(userData.user.shipping.address1)
      setName(userData.user.shipping.firstName)
      setSurname(userData.user.shipping.lastName)
      setCity(userData.user.shipping.city || 'Ташкент')
    }
  }, [userData])

  for (const product of cartItems) {
    const { normalPrice, salePrice } = getPrice(product)
    lineItems.push({
      product_id: product.databaseId,
      name: product.name,
      price: product.onSale ? salePrice : normalPrice,
      quantity: product.quantity,
      variation_id: product.variations && product.selectedProductId,
    })
  }

  const discount =
    typeof window !== 'undefined'
      ? JSON.parse(localStorage.getItem('coupon'))
      : ''

  const sendInfo = async () => {
    setIsLoading(true)

    const orderData = {
      set_paid: false,
      currency: 'UZS',
      status: selectMethod === 'cod' ? 'processing' : 'pending',
      payment_method: selectMethod,
      payment_method_title: selectMethod,
      total: cartTotalPrice ? cartTotalPrice : cartTotalPrice2,
      coupon_lines: discount && [{ code: discount.code }],
      line_items: lineItems,
      billing: {
        address_1: `${city}, ${address}`,
        first_name: name,
        last_name: surname,
        phone: phone,
        email: email ? email : 'test@mail.ru',
      },
      customer_note: comment && comment,
    }

    const response = await axios.post('/api/order', { order: orderData })

    if (response?.data?.status) {
      setOrder(response.data.order)
      switch (selectMethod) {
        case 'cod':
          await window.location.assign(
            `/order/${response.data.order.order_key}`
          )
          localStorage.clear()
          break
        case 'zoodpay':
          axios
            .post('/api/zoodpay', {
              data: {
                customer: {
                  customer_email: response.data.order.billing.email,
                  customer_phone: response.data.order.billing.phone,
                  first_name: response.data.order.billing.first_name,
                  customer_dob: '2000-01-01',
                },
                items: response.data.order.line_items.map(
                  ({ name, price, quantity }) => ({
                    categories: [['test', 'test']],
                    name: name,
                    price: price,
                    quantity: quantity,
                  })
                ),
                order: {
                  amount: parseInt(response.data.order.total).toFixed(2),
                  currency: 'UZS',
                  market_code: 'UZ',
                  merchant_reference_no: response.data.order.id.toString(),
                  service_code: 'ZPI',
                  lang: 'ru',
                  signature: sha512(
                    `]]LNN9Wv)4}T]qz|${response.data.order.id}|${response.data.order.total}|UZS|UZ|9$9MJmVk`
                  ),
                },
                shipping: {
                  address_line1: response.data.order.billing.address_1,
                  country_code: 'UZB',
                  name: response.data.order.billing.first_name,
                  zipcode: '100000',
                },
              },
            })
            .then((res) => {
              if (res.data.status === 400) {
                setIsLoading(false)
              } else {
                axios.post('/api/transaction', {
                  id: response.data.order.id,
                  transaction_id: res.data.data.transaction_id,
                })
                window.location.assign(res.data.data.payment_url)
                localStorage.clear()
              }
            })
          break
        case 'payme':
        case 'click':
          const form = document.querySelector(`#${selectMethod}-form`)
          if (form) {
            form.submit()
          }
          localStorage.clear()
          break
        default:
          break
      }
    } else {
      alert(response.data.message)
      router.reload()
    }
  }

  const cartTotalPrice =
    typeof window !== 'undefined'
      ? parseInt(localStorage.getItem('cartTotalPriceFront'))
      : ''

  let cartTotalPrice2 = 0
  cartItems.map((product) => {
    const { normalPrice, salePrice } = getPrice(product)
    cartTotalPrice2 += product.onSale
      ? parseInt(salePrice) * product.quantity
      : parseInt(normalPrice) * product.quantity
  })

  if (typeof window !== 'undefined') {
    fbq('track', 'InitiateCheckout')
  }

  const validateEmail = (e) => {
    var email = e.target.value
    setEmail(email)

    if (validator.isEmail(email)) {
      setEmailError()
    } else {
      setEmailError('Неверный Email')
    }
  }

  return (
    <section className={s.wrapper}>
      <form id='payme-form' method='post' action='https://checkout.paycom.uz'>
        <input type='hidden' name='merchant' value='6051fcc173214c962badcf71' />
        <input
          type='hidden'
          name='amount'
          value={cartTotalPrice ? cartTotalPrice * 100 : cartTotalPrice2}
        />
        <input
          type='hidden'
          name='account[order_id]'
          value={order && order.id}
        />
        <input type='hidden' name='lang' value='ru' />
        <input
          type='hidden'
          name='callback'
          value={`${host}/order/${order && order.order_key}`}
        />
      </form>
      <form
        id='click-form'
        method='get'
        action='https://my.click.uz/services/pay'
      >
        <input type='hidden' name='merchant_id' value='12379' />
        <input
          type='hidden'
          name='transaction_param'
          value={order && order.id}
        />
        <input type='hidden' name='service_id' value='17567' />
        <input
          type='hidden'
          name='amount'
          value={cartTotalPrice ? cartTotalPrice : cartTotalPrice2}
        />
        <input
          type='hidden'
          name='return_url'
          value={`${host}/order/${order && order.order_key}`}
        />
      </form>
      <div className={s.hide}>
        <Offer style='applicationPage' />
      </div>
      {cartItems.length >= 1 ? (
        <div className={s.inner}>
          <div className={s.label}>
            ДОСТАВКА
            <span>01</span>
          </div>
          <div className={s.inputs}>
            <select
              name='city'
              onChange={(e) => setCity(e.target.value)}
              ref={register({ required: true })}
              className={errors.city && s.errorInput}
            >
              {cities.map((r, i) => (
                <option key={i}> {r}</option>
              ))}
            </select>
          </div>
          <div className={s.inputs}>
            <input
              name='address'
              onChange={(e) => setAddress(e.target.value)}
              ref={register({ required: true })}
              className={errors.address && s.errorInput}
              placeholder='Адрес (Район, улица, дом, номер квартиры)'
            />
          </div>
          <div className={s.inputs}>
            <input
              name='name'
              onChange={(e) => setName(e.target.value)}
              ref={register({ required: true })}
              className={errors.name && s.errorInput}
              placeholder='Ваше имя'
            />
          </div>
          <div className={s.inputs}>
            <input
              name='surname'
              onChange={(e) => setSurname(e.target.value)}
              ref={register({ required: true })}
              className={errors.name && s.errorInput}
              placeholder='Фамилия'
            />
          </div>
          <div className={s.inputs}>
            <input
              id='email'
              name='email'
              type='text'
              value={email}
              className={`${email ? s.valid : ''} ${s.email}`}
              onChange={(e) => validateEmail(e)}
            />
            <label for='email'>
              Email (опционально){' '}
              <span style={{ color: 'red' }}>{emailError}</span>
            </label>
          </div>
          <div className={s.inputs}>
            <MaskedInput
              name='phone'
              mask='+\9\98999999999'
              alwaysShowMask
              className={errors.phone && s.errorInput}
              onChange={(e) => setPhone(e.target.value)}
              value={phone}
            >
              {(inputProps) => (
                <input
                  ref={register({
                    required: true,
                    pattern:
                      /^[\+]?[0-9]{3}[0-9]{2}[0-9]{3}[0-9]{2}[0-9]{2}$/im,
                  })}
                  value={phone}
                  name={inputProps.name}
                  {...inputProps}
                />
              )}
            </MaskedInput>
          </div>
          <div className={s.inputs}>
            <textarea
              name='comment'
              onChange={(e) => setComment(e.target.value)}
              ref={register}
              placeholder='Комментарии'
            />
          </div>
          <div className={s.label}>
            ОПЛАТА
            <span>02</span>
          </div>
          <div className={s.payments}>
            <div style={{ marginBottom: '20px' }}>
              Zoodpay - покупка товара в рассрочку в 4 платежа. Максимальная
              сумма - 500 000 сум.
              {selectMethod === 'zoodpay' && !email && (
                <div style={{ color: 'red' }}>
                  При выборе Zoodpay Email обязателен
                </div>
              )}
            </div>

            {paymentMethods.map((r) => (
              <button
                key={uuidv4()}
                className={selectMethod === r.value ? s.active : ''}
                onClick={() => setSelectMethod(r.value)}
              >
                {r.value == 'zoodpay' ? (
                  <div>Zoodpay</div>
                ) : (
                  <img src={r.src} alt='' />
                )}
                {r.value === 'cod' && 'При получении наличными или картой'}
              </button>
            ))}
          </div>
          <div className={s.summary}>
            <div className={s.label}>
              ИТОГО
              <span>03</span>
            </div>
            <div className={s.summaryList}>
              <div>Подитог:</div>
              <div>{getFormat(cartTotalPrice2) + ' сум'}</div>
            </div>
            <div className={s.summaryList}>
              <div>Купон:</div>
              <div>
                {discount ? discount.amount : ' 0 сум'}{' '}
                {discount && discount.discountType === 'FIXED_CART'
                  ? 'сум'
                  : discount && '%'}{' '}
              </div>
            </div>
            <div className={s.summaryList}>
              <div>Моя скидка:</div>
              <div>{getFormat(economy) + ' сум'}</div>
            </div>
            <div className={s.summaryList}>
              <div>К оплате:</div>
              <div>
                {getFormat(cartTotalPrice ? cartTotalPrice : cartTotalPrice2) +
                  ' сум'}
              </div>
            </div>
            <div className={s.summaryListLast}>
              <img src='/offer/shipping.svg' alt='' />
              Бесплатная доставка по Ташкенту
            </div>
            <button onClick={handleSubmit(sendInfo)} disabled={isLoading}>
              {isLoading ? (
                <div className={s.loaderAnimation}></div>
              ) : (
                <>
                  ОФОРМИТЬ ЗАКАЗ
                  <img src='/smallWhiteArrow.svg' alt='' />
                </>
              )}
            </button>
          </div>
        </div>
      ) : (
        <div className={s.emptyCart}>
          Корзина пуста
          <Link href='/'>
            <a>Начать покупки</a>
          </Link>
        </div>
      )}
      <Link href='tel:+998712337117'>
        <a className={s.lasthero}>
          Помощь доступна с 10:00 до 20:00 (по Ташкентскому времени)
          <span>Call-центр +998 71 2337117</span>
        </a>
      </Link>
    </section>
  )
}
const mapStateToProps = (state) => {
  return {
    cartItems: state.cartData,
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    deleteAllFromCart: () => {
      dispatch(deleteAllFromCart())
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ApplicationMain)

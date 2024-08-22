import s from './product-card.module.scss'
import PorductsList from '../../components/ProductsList'
import Offer from '../../components/Offer'
import { useState, useEffect } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { getPrice, getFormat, getDiscount } from '../../utils'
import Slider from 'react-slick'
import React from 'react'
import Link from 'next/link'
import Accordion from '../Accordion'
import InstantBuyModal from '../InstantBuyModal'

const ProductCard = ({
  product,
  cartItems,
  wishlistItems,
  addToCart,
  deleteFromCart,
  addToWishlist,
  deleteFromWishlist,
  getActiveStatus,
}) => {
  const [selectedProductId, setSelectedProductId] = useState(
    product.variations
      ? product.variations.nodes[0].databaseId
      : product.databaseId
  )

  const [selectedProductStock, setSelectedProductStock] = useState(
    product.variations
      ? product.variations.nodes[0].stockQuantity
      : product.stockQuantity
  )

  const [selectedProductColor, setSelectedProductColor] = useState(
    product.variations
      ? product.variations.nodes[0].color.nodes[0]?.value
      : product.paColors.nodes[0]?.name
  )

  const [selectedProductSize, setSelectedProductSize] = useState(
    product.variations
      ? product.variations.nodes[0].size.nodes[0]?.value
      : product.paSizes.nodes[0]?.name
  )
  const [selectedProductLength, setSelectedProductLength] = useState(
    product.variations ? product.variations.nodes[0].length : product.length
  )

  const cartItem = cartItems.filter(
    (cartItem) => cartItem.selectedProductId === selectedProductId
  )[0]
  const wishlistItem = wishlistItems.filter(
    (wishlistItem) => wishlistItem.id === product.id
  )[0]

  const { normalPrice, salePrice } = getPrice(product)
  const normalPriceFront = getFormat(normalPrice) + ' сум'
  const salePriceFront = getFormat(salePrice) + ' сум'
  const discountPrice = getDiscount(normalPrice, salePrice)

  const [windowWidth, setWindowWidth] = useState()
  let resizeWindow = () => setWindowWidth(window.innerWidth)

  useEffect(() => {
    resizeWindow()
    window.addEventListener('resize', resizeWindow)
    return () => window.removeEventListener('resize', resizeWindow)
  }, [])

  const SliderPrevArrow = (props) => (
    <img
      src="/productSliderArrowLeft.svg"
      alt=""
      onClick={props.onClick}
      className={s.sliderPrevArrow}
    />
  )

  const SliderNextArrow = (props) => (
    <img
      src="/productSliderArrowRight.svg"
      alt=""
      onClick={props.onClick}
      className={s.sliderNextArrow}
    />
  )

  const settings = {
    slidesToShow: 1,
    slidesToScroll: 1,
    prevArrow: <SliderPrevArrow />,
    nextArrow: <SliderNextArrow />,
    dots: windowWidth >= 1023 ? false : true,
    appendDots: (dots) => <ul className={s.as}>{dots}</ul>,
    customPaging: () => <div> </div>,
  }

  const aboutProduct = [
    {
      title: 'Состав',
      text: <div dangerouslySetInnerHTML={{ __html: product.description }} />,
    },
    {
      title: 'Доставка и возврат',
      text: 'Доставка выполняется ежедневно с 10:00 до 19:00 часов, кроме воскресенья. Товары, заказанные Вами в воскресенье, доставляются в понедельник. Время осуществления доставки зависит от времени размещения заказа и наличия товара на складе. Доставка по Ташкенту БЕСПЛАТНАЯ!',
    },
    // {
    //   title: 'Материал и уход',
    //   text: '100% Cotton, Machine wash, Imported.'
    // },
    {
      title: 'Гарантия',
      text: 'Мы гарантируем возврат или обмен бракованного изделия в течение 10 дней со дня оформления заявки. Каждый случай брака рассматривается индивидуально и в целях улучшения качества и сервиса проводим анализ, выявленного случая брака.',
    },
  ]

  const [buy, setBuy] = useState(false)

  return (
    <section className={s.wrapper}>
      <div className={s.left}>
        <div className={s.images}>
          <img src={product.image.sourceUrl} alt="" />
          {product.galleryImages.nodes.map((r) => (
            <img src={r.sourceUrl} alt="" key={uuidv4()} />
          ))}
        </div>
        <Slider {...settings} className={s.slider}>
          <div>
            <img
              src={product.image.sourceUrl}
              alt=""
              className={s.sliderImages}
            />
          </div>
          {product.galleryImages.nodes.map((r) => (
            <div key={uuidv4()}>
              <img src={r.sourceUrl} alt="" className={s.sliderImages} />
            </div>
          ))}
        </Slider>
        <div className={s.relatedDesk}>
          <div className={s.aboutProduct}>
            {aboutProduct.map(({ title, text }, i) => (
              <div key={i} className={s.aboutProductInner}>
                <Accordion title={title} product>
                  {text}
                </Accordion>
              </div>
            ))}
          </div>
          <div className={s.relatedTitle}>Похожие товары:</div>
          <PorductsList products={product.related.nodes} related />
        </div>
      </div>
      <div className={s.right}>
        <div className={s.details}>
          <div className={s.sku}>{product.sku}</div>
          <div className={s.name}>{product.name}</div>
          <div className={s.price}>
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
        {product.variations ? (
          <>
            {selectedProductColor && (
              <>
                <div className={s.attributesName}>
                  Цвет: <span> {selectedProductColor} </span>
                </div>
                <div className={s.colors}>
                  {product.variations.nodes.map(
                    (product) =>
                      product.size.nodes[0].value === selectedProductSize &&
                      selectedProductLength === product.length && (
                        <div
                          key={uuidv4()}
                          className={
                            selectedProductColor ===
                            product.color.nodes[0].value
                              ? s.active
                              : ''
                          }
                        >
                          <button
                            style={{
                              backgroundColor: product.color.nodes[0].color,
                            }}
                            onClick={() => {
                              setSelectedProductColor(
                                product.color.nodes[0].value
                              )
                              setSelectedProductStock(product.stockQuantity)
                              setSelectedProductId(product.databaseId)
                            }}
                          ></button>
                        </div>
                      )
                  )}
                </div>
              </>
            )}
            {selectedProductSize && (
              <>
                <div className={s.attributesName}>
                  {product.name === 'Джинсы' ? 'Ширина' : 'Размер'}:{' '}
                  <span> {selectedProductSize} </span>
                </div>
                <div className={s.sizes}>
                  {product.variations.nodes.map(
                    (product) =>
                      product.color.nodes[0].value === selectedProductColor &&
                      selectedProductLength === product.length && (
                        <button
                          key={uuidv4()}
                          className={`${
                            selectedProductSize === product.size.nodes[0].value
                              ? s.active
                              : ''
                          } ${!product.stockQuantity ? s.outOfStock : ''} `}
                          onClick={() => {
                            setSelectedProductSize(product.size.nodes[0].value)
                            setSelectedProductStock(product.stockQuantity)
                            setSelectedProductId(product.databaseId)
                          }}
                        >
                          {product.size.nodes[0].value}
                        </button>
                      )
                  )}
                </div>
              </>
            )}
            {selectedProductLength && (
              <>
                <div className={s.attributesName}>
                  Длина: <span> {selectedProductLength} </span>
                </div>
                <div className={s.sizes}>
                  {product.variations.nodes.map(
                    (product) =>
                      product.color.nodes[0].value === selectedProductColor &&
                      selectedProductSize === product.size.nodes[0].value && (
                        <button
                          key={uuidv4()}
                          className={`${
                            selectedProductLength === product.length
                              ? s.active
                              : ''
                          } ${!product.stockQuantity ? s.outOfStock : ''} `}
                          onClick={() => {
                            setSelectedProductLength(product.length)
                            setSelectedProductStock(product.stockQuantity)
                            setSelectedProductId(product.databaseId)
                          }}
                        >
                          {product.length}
                        </button>
                      )
                  )}
                </div>
              </>
            )}
          </>
        ) : (
          <>
            {selectedProductColor && (
              <>
                <div className={s.attributesName}>
                  Цвет: <span> {selectedProductColor} </span>
                </div>
                <div className={s.colors}>
                  <div key={uuidv4()} className={s.active}>
                    <button
                      style={{
                        backgroundColor: product.paColors.nodes[0].color,
                      }}
                    ></button>
                  </div>
                </div>
              </>
            )}
            {selectedProductSize && (
              <>
                <div className={s.attributesName}>
                  {product.name === 'Джинсы' ? 'Ширина' : 'Размер'}:{' '}
                  <span> {selectedProductSize} </span>
                </div>
                <div className={s.sizes}>
                  <button key={uuidv4()} className={s.active}>
                    {selectedProductSize}
                  </button>
                </div>
              </>
            )}
            {selectedProductLength && (
              <>
                <div className={s.attributesName}>
                  Длина: <span> {selectedProductLength} </span>
                </div>
                <div className={s.sizes}>
                  <button key={uuidv4()} className={s.active}>
                    {selectedProductLength}
                  </button>
                </div>
              </>
            )}
          </>
        )}

        <button
          className={`${s.cart} ${cartItem ? s.active : ''}  `}
          id="addToCart"
          onClick={
            cartItem
              ? () => deleteFromCart(selectedProductId)
              : () => {
                  addToCart(
                    product,
                    selectedProductColor,
                    selectedProductSize,
                    selectedProductLength,
                    selectedProductId
                  )
                  getActiveStatus(true)
                  process.env.NODE_ENV === 'production' &&
                    fbq('track', 'AddToCart', {
                      value: product.onSale
                        ? product.woocsSalePrice
                        : product.woocsRegularPrice,
                    })
                }
          }
          disabled={!selectedProductStock}
        >
          {cartItem ? 'ДОБАВЛЕН В КОРЗИНУ' : 'В КОРЗИНУ'}
        </button>
        <button className={s.wishlist} onClick={() => setBuy(true)}>
          <img src="/instantBuy.svg" alt="" />
          Купить сейчас
        </button>
        <InstantBuyModal
          buy={buy}
          setBuy={setBuy}
          product={product}
          selectedProductId={selectedProductId}
          selectedProductColor={selectedProductColor}
          selectedProductSize={selectedProductSize}
          selectedProductLength={selectedProductLength}
          selectedProductStock={selectedProductStock}
          normalPriceFront={normalPriceFront}
          salePriceFront={salePriceFront}
          discountPrice={discountPrice}
          normalPrice={normalPrice}
          salePrice={salePrice}
        />
        <div className={s.extraData}>
          <Link href="https://t.me/bjeansassistant">
            <a target="_blank" rel="noopener">
              <img src="/tg.svg" alt="" />
              Телеграм
            </a>
          </Link>
          <Link href="tel:+998712337117">
            <a>
              <img src="/tel.svg" alt="" />
              Позвонить
            </a>
          </Link>
          <div
            onClick={
              wishlistItem
                ? () => deleteFromWishlist(product)
                : () => addToWishlist(product)
            }
          >
            <img src="/add.svg" alt="" />
            {wishlistItem ? 'В избранных' : 'Избранное'}
          </div>
        </div>
        {/* <Offer style="productCard" /> */}
      </div>
      <div className={s.relatedMob}>
        <div className={s.aboutProduct}>
          {aboutProduct.map(({ title, text }, i) => (
            <div key={i} className={s.aboutProductInner}>
              <Accordion title={title} product>
                {text}
              </Accordion>
            </div>
          ))}
        </div>
        <div className={s.relatedTitle}>Похожие товары:</div>
        <PorductsList products={product.related.nodes} related />
      </div>
    </section>
  )
}
export default ProductCard

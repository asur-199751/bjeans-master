import s from './header.module.scss'
import Link from 'next/link'
import React, { useState, useEffect } from 'react'
import HeaderMobile from '../HeaderMobile'
import CartModal from '../CartModal'
import AdminModals from '../AdminModals'
import { connect } from 'react-redux'
import useUser from '../../utils/useUser'
import HeaderOverlay from '../HeaderOverlay'
import { useLazyQuery } from '@apollo/react-hooks'
import PRODUCTS from '../../queries/products'
import client from '../../apollo/apollo-client'

const Header = ({
  openCart,
  setOpenCart,
  cartItems,
  wishlistItems,
  categories,
  menCategories,
  womenCategories,
}) => {
  const links = [
    {
      name: 'Мужчины',
      slug: '/catalog/men',
      categories: categories?.men || [],
    },
    {
      name: 'Женщины',
      slug: '/catalog/women',
      categories: categories?.women || [],
    },
    {
      name: 'BJEANS x DK',
      slug: '/catalog/dk',
    },
    {
      name: 'Акции',
      slug: '/catalog/men/sale',
    },
    {
      name: 'Доставка',
      slug: '/help',
    },
  ]

  const [open, setOpen] = useState(false)
  const [modalOpen, setModalOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [isSearchActive, setIsSearchActive] = useState(true)
  const [searchResults, setSearchResults] = useState([])
  const [loadProducts, { data, loading }] = useLazyQuery(PRODUCTS, {
    client,
  })
  const { userData } = useUser()

  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
  }, [open])
  useEffect(() => {
    if (data && searchQuery.length) {
      setSearchResults(data.products.nodes)
    }
  }, [data])

  const searchData = (e) => {
    setSearchResults([])
    setSearchQuery(e.target.value)

    if (e.target.value.length) {
      loadProducts({
        variables: {
          first: 10,
          search: e.target.value,
        },
      })
    }
  }

  return (
    <>
      <section className={s.top}>
        <div className={s.topInner}>
          <div className={s.topLeft}>
            <Link href='/stores'>
              <a>
                <img src='/header/map.svg' alt='' />
                Локации Магазинов
              </a>
            </Link>
            <Link href='tel:+998712337117'>
              <a>
                <img src='/header/tel.svg' alt='' />
                71 2337117
              </a>
            </Link>
          </div>
          <div className={s.topCenter}>
            <Link href='/help'>
              <a>Информация о доставке и примерке</a>
            </Link>
          </div>
          <div className={s.topRight}>
            <Link href='/help'>
              <a>
                {/* <img src='/header/arrowDown.svg' alt='' /> */}
                Помощь
              </a>
            </Link>
          </div>
        </div>
      </section>
      <section className={s.sticky}>
        <div className={s.bot}>
          <div className={s.burger} onClick={() => setOpen(true)}>
            <img src='/burger.svg' alt='' />
            <span>Меню</span>
          </div>
          <div className={s.botLeft}>
            <Link href='/'>
              <a>
                <img src='/header/logo.svg' alt='' className={s.botLeftLogo} />
              </a>
            </Link>
            <div className={s.botLeftLinks}>
              {links.map(({ name, slug, categories }, i) => (
                <HeaderOverlay
                  key={i}
                  name={name}
                  slug={slug}
                  categories={categories}
                />
              ))}
            </div>
          </div>
          <div className={s.botRight}>
            <div className={s.search}>
              <input
                type='text'
                placeholder='Поиск по сайту'
                value={searchQuery}
                onChange={searchData}
                style={{ display: isSearchActive ? 'none' : 'block' }}
              />
              <img
                src={
                  isSearchActive ? '/header/search.svg' : '/header/close.svg'
                }
                alt=''
                onClick={() => {
                  setIsSearchActive((show) => !show)
                  setSearchResults([])
                  setSearchQuery('')
                }}
              />
              <div className={s.searchList}>
                {loading && !searchResults.length ? (
                  <div>Загрузка...</div>
                ) : searchQuery.length && !searchResults.length ? (
                  <div>Товары не найдены</div>
                ) : searchResults.length ? (
                  <div>
                    {searchResults.map((product) => (
                      <Link href={'/product/' + product.slug} key={product.key}>
                        <a>{product.name}</a>
                      </Link>
                    ))}
                  </div>
                ) : null}
              </div>
            </div>
            {userData && userData.isLoggedIn ? (
              <Link href='/account'>
                <a>
                  <img src='/header/admin.svg' alt='' />
                  <span>Профиль</span>
                </a>
              </Link>
            ) : (
              <div onClick={() => setModalOpen(true)}>
                <img src='/header/admin.svg' alt='' />
                <span>Войти</span>
              </div>
            )}
            <Link href='/wishlist'>
              <a>
                <img src='/header/wishlist.svg' alt='' />
                <span>
                  Избранное{' '}
                  {wishlistItems.length > 0 && `(${wishlistItems.length})`}
                </span>
              </a>
            </Link>
            <Link href='/cart'>
              <a>
                <img src='/header/cart.svg' alt='' />
                <span>
                  Корзина {cartItems.length > 0 && `(${cartItems.length})`}
                </span>
              </a>
            </Link>
          </div>
          <CartModal activeStatus={openCart} getActiveStatus={setOpenCart} />
        </div>
      </section>
      <HeaderMobile
        activeStatus={open}
        getActiveStatus={setOpen}
        categories={categories}
      />
      <AdminModals
        key={modalOpen}
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
      />
    </>
  )
}

const mapStateToProps = (state) => {
  return {
    cartItems: state.cartData,
    wishlistItems: state.wishlistData,
  }
}

export default connect(mapStateToProps)(Header)

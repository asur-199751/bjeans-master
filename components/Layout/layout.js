import s from './layout.module.scss'
import Header from '../Header'
import Footer from '../Footer'
import React from 'react'

const Layout = ({
  children,
  openCart,
  setOpenCart,
  categories,
  menCategories,
  womenCategories,
}) => {
  return (
    <>
      <Header
        openCart={openCart}
        setOpenCart={setOpenCart}
        categories={categories}
        menCategories={menCategories}
        womenCategories={womenCategories}
      />
      <main className={s.wrapper}>{children}</main>
      <Footer categories={categories} />
    </>
  )
}
export default Layout

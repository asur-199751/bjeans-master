import s from './header-mobile.module.scss'
import Link from 'next/link'
import Accordion from '../Accordion'
import CategoryFilter from '../CategoryFilter'
import { connect } from 'react-redux'

const HeaderMobile = ({
  cartItems,
  wishlistItems,
  activeStatus,
  getActiveStatus,
  categories,
}) => {
  return (
    <section className={`${s.wrapper}  ${activeStatus && s.active}`}>
      <div className={s.top}>
        <img src='/footer/footerLogo.svg' alt='' />
        <img
          src='/header/headerClose.svg'
          alt=''
          onClick={() => getActiveStatus(false)}
        />
      </div>
      <div className={s.mid}>
        <div>
          <img src='/header/admin.svg' alt='' />
          <span>Войти</span>
        </div>
        <Link href='/wishlist'>
          <a>
            <img src='/header/wishlist.svg' alt='' />
            <span>
              Избранное
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
      <Accordion title='МУЖЧИНАМ' menu>
        <CategoryFilter
          categories={
            categories &&
            categories.men.children.map(({ name, slug, children }) => ({
              name,
              children,
              link: `/catalog/${categories.men.slug}/${slug}`,
              joki: `/catalog/${categories.men.slug}/`,
            }))
          }
          menu
          getActiveStatus={getActiveStatus}
        />
      </Accordion>
      <Accordion title='ЖЕНЩИНАМ' menu>
        <CategoryFilter
          categories={
            categories &&
            categories.women.children.map(({ name, slug, children }) => ({
              name,
              children,
              link: `/catalog/${categories.women.slug}/${slug}`,
              joki: `/catalog/${categories.women.slug}/`,
            }))
          }
          menu
          getActiveStatus={getActiveStatus}
        />
      </Accordion>
      <Link href='/catalog/dk'>
        <a style={{ display: 'block', marginTop: '10px', fontWeight: 'bold' }}>
           BJEANS x DK
        </a>
      </Link>
    </section>
  )
}

const mapStateToProps = (state) => {
  return {
    cartItems: state.cartData,
    wishlistItems: state.wishlistData,
  }
}

export default connect(mapStateToProps)(HeaderMobile)

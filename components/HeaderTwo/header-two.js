import s from './header-two.module.scss'
import Link from 'next/link'

const HeaderTwo = ({ orderPage }) => (
  <header className={s.wrapper}>
    <div className={orderPage ? s.orderPageInner : s.inner}>
      <Link href="/cart">
        <a>
          <img src="/smallWhiteArrow.svg" alt="" />
          Назад
        </a>
      </Link>
      <Link href="/">
        <a>
          <img src="/header/whiteLogo.svg" alt="" />
        </a>
      </Link>
      <Link href="tel:+998712337117">
        <a>
          Нужна помощь? <br /> +998 71 2337117
        </a>
      </Link>
    </div>
  </header>
)

export default HeaderTwo

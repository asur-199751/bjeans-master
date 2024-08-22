import s from './footer-two.module.scss'
import Link from 'next/link'

const FooterTwo = () => (
  <footer className={s.wrapper}>
    <Link href="/">
      <a>Публичная оферта</a>
    </Link>
    <Link href="/">
      <a>Политика конфиденциальности</a>
    </Link>
    <Link href='https://billz.io/online-store'>
      <a target="_blank" rel="nofollow, noreferrer">
        Сайт разработан компанией
        <img src="/footer/billz.svg" alt="" />
      </a>
    </Link>
  </footer>
)

export default FooterTwo

import s from './offer.module.scss'
import Link from 'next/link'

const Offer = () => (
  <section className={s.commonStyle}>
    <div className={s.text}>
      <div>
        <img src="/offer/shipping.svg" alt="" />
        Бесплатная доставка
      </div>
      <div>
        <img src="/offer/returns.svg" alt="" />
        Бесплатный возврат
      </div>
      <div>
        <img src="/offer/warranty.svg" alt="" />
        Гарантия качества
      </div>
    </div>
    <Link href="/help">
      <a>Подробнее</a>
    </Link>
  </section>
)

export default Offer

import s from './order-main.module.scss'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'

const OrderMain = ({ order }) => {
  const [timeLeft, setTimeLeft] = useState(15)
  const router = useRouter()

  useEffect(() => {
    if (!timeLeft) {
      router.replace('/')
    }
    const intervalId = setInterval(() => {
      setTimeLeft(timeLeft - 1)
    }, 1000)
    return () => clearInterval(intervalId)
  }, [timeLeft])

  return (
    <>
      <section className={s.wrapper}>
        <div className={s.inner}>
          <div className={s.top}>
            СПАСИБО,
            <br />
            {order?.billing.firstName}!
            <span>
              Автоматическое перенаправление на страницу аккаунта через{' '}
              {timeLeft} секунд
            </span>
          </div>
          <div>
            Ваш заказ принят! Наши менеджеры свяжутся с вами для уточнения всех
            деталей. Сейчас вы можете перейти на следующие страницы:
          </div>
          <div className={s.logoJoki}>
            <Link href="/">
              <a>
                <img src="/orderHome.svg" alt="" />
                На главную
              </a>
            </Link>
            <img src="/orderLogo.svg" alt="" />
          </div>
          <img src="/orderIcon.svg" alt="" className={s.icons} />
          {/* <img src='/orderIcon2.svg' alt='' className={s.icons} /> */}
        </div>
      </section>
      <Link href="tel:+998712337117">
        <a className={s.lasthero}>
          Help available from 10:00 to 20:00 (Tashkent Timezone)
          <span>Call-center +998 71 2337117</span>
        </a>
      </Link>
    </>
  )
}
export default OrderMain

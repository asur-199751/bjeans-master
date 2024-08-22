import React from 'react'
import s from './contacts-main.module.scss'
import Link from 'next/link'

const ContactsMain = () => {
  return (
    <div className={s.wrapper}>
      <div className={s.top}>
        Есть вопросы?
        <img src='/contacts/q.svg' alt='' />
      </div>
      <div className={s.inner}>
        <div className={s.left}>
          <div>
            Наш Call цент работает с 10:00 до 20:00 без выходных. По деловым
            вопросам, можете написать на наш официальный еmail. Мы ждем ваших
            вопросов!
          </div>
        </div>
        <div className={s.right}>
          <Link href='tel:+998712337117'>
            <a>
              <div>
                <img src='/contacts/phone.svg' alt='' />
                +998 71 2337117
              </div>
              <div>Позвонить</div>
            </a>
          </Link>
          <Link href='mailto: conscept@bgroup.uz'>
            <a>
              <div>
                <img src='/contacts/mail.svg' alt='' />
                conscept@bgroup.uz
              </div>
              <div>Написать</div>
            </a>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default ContactsMain

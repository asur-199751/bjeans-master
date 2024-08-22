import React from 'react'
import s from './admin-main.module.scss'
import { useState } from 'react'
import AdminAbout from '../AdminAbout'
import AdminOrders from '../AdminOrders'
import AdminFavorites from '../AdminFavorites'
import AdminSecurity from '../AdminSecurity'
import useUser from '../../utils/useUser'

const tabItems = [
  {
    id: 1,
    title: 'Информация',
    img: '/admin/aboutMe.svg',
    content: <AdminAbout />,
  },
  {
    id: 2,
    title: 'Заказы',
    img: '/admin/orders.svg',
    content: <AdminOrders />,
  },
  {
    id: 3,
    title: 'Избранные',
    img: '/admin/favorites.svg',
    content: <AdminFavorites />,
  },
  {
    id: 4,
    title: 'Настройки',
    img: '/admin/security.svg',
    content: 'step 4 content',
    content: <AdminSecurity />,
  },
]

const AdminMain = () => {
  const [active, setActive] = useState(1)

  return (
    <>
      <div className={s.tabsWrapper}>
        <div className={s.tabsInner}>
          {tabItems.map(({ id, title, img }) => (
            <div key={id} onClick={() => setActive(id)}>
              <span className={active === id ? s.active : ''}>
                <img src={img} alt="" /> {title}
              </span>
            </div>
          ))}
        </div>
      </div>
      {tabItems.map(
        ({ id, content }) => active === id && <div key={id}> {content} </div>
      )}
    </>
  )
}

export default AdminMain

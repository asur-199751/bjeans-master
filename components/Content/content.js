import Link from 'next/link'
import React from 'react'
import s from './content.module.scss'

const Content = ({ about, stores, contacts, franchising }) => {
  const data = [
    {
      img: '/about/aboutUs.svg',
      name: 'О нас ',
      link: '/about',
      style: about,
    },
    {
      img: '/about/stores.svg',
      name: 'Магазины ',
      link: '/stores',
      style: stores,
    },
    {
      img: '/about/contact.svg',
      name: 'Контакты',
      link: '/contacts',
      style: contacts,
    },
    // {
    //   img: '/about/franchising.svg',
    //   name: 'Franchise',
    //   link: '/Franchise',
    //   style: franchising
    // }
  ]

  //   const current = data.find(
  //     ({ link }) => link === (process.browser && window.location.pathname)
  //   )

  return (
    <div className={s.wrapper}>
      <div className={s.inner}>
        {data.map((r, i) => (
          <div key={i}>
            <Link href={r.link}>
              <a className={r.style ? s.active : ''}>
                <img src={r.img} alt="" /> {r.name}
              </a>
            </Link>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Content

import Link from 'next/link'
import React from 'react'
import s from './stores-main.module.scss'

// {
//   img: '/stores/yunusTashkent.jpg',
//   location: 'Юнусабадский район, проспект Амир Темур, Дом 118/1',
//   title: 'B Jeans Ташкент',
//   phone: '+998977675092',
// },

// {
//   img: '/stores/shax.jpg',
//   location:
//     'Шахристанский. Проспект Амира Темура, 118/1, Юнусабадский район.',
//   title: 'B Jeans Ташкент',
//   phone: '+998977675092',
// },
// {
//   img: '/stores/atlasFergana.jpg',
//   location: 'ТРЦ Atlas, г.  Ферганаул. Тарона, 15',
//   title: 'B Jeans Фергана',
//   phone: '+998954049390',
// },
// {
//   img: '/stores/trcBukhara.jpg',
//   location:
//     'ТРЦ Бухара (1 этаж), на проспекте улиц И. Муминова и И.Каримова 1/1',
//   title: 'B Jeans Бухара',
//   phone: '+998904440800',
// },

// {
//   img: '/stores/barakaSamarkand.jpg',
//   location: 'ТРЦ M Baraka (2 этаж), ул. Мир Саид Барака, 2',
//   title: 'B Jeans Самарканд',
//   phone: '+998954109141',
// },
// {
//   img: '/stores/afsonaNamangan.jpg',
//   location: 'Afsona Land, ул. Ислама Каримова, дом 1',
//   title: 'B Jeans Наманган',
//   phone: '+998888700200',
// },
// {
//   img: '/stores/kirgiz.jpg',
//   location: 'ул. Курманджан Датка, дом 432',
//   title: 'B Jeans Ош, Киргизия',
//   phone: '+996221311777',
// },

const data = [
  {
    img: '/stores/mirzoTashkent.jpg',
    location:
      'Мирзо - Улугбекский район, улица Шахрисабз, массив Буюк Ипак Йули, 1 ',
    title: 'B Jeans Ташкент',
    phone: '+998712337117',
  },
  // {
  //   img: '/stores/atlasTashkent.jpg',
  //   location: 'ул. Темур Малик 3А (ориентир Ecobozor)',
  //   title: 'ТРЦ Atlas Чимган',
  //   phone: '+998914440800',
  // },
  {
    img: '/stores/atlasFergana.jpg',
    location: 'ул.Кораташ, 5А, третий этаж',
    title: 'ТРЦ Samarkand Darvoza',
    phone: '+998953017117',
  },
  // {
  //   img: '/stores/trcBukhara.jpg',
  //   location: 'улица Халклар Дустлиги, 7/1',
  //   title: 'B Jeans Бухара',
  //   phone: '+998655055665',
  // },
  // {
  //   img: '/stores/shax.jpg',
  //   location: 'ул. Матбуотчилар 17 (ориентир Бродвей)',
  //   title: 'ТЦ Зарафшан',
  //   phone: '+998914440800',
  // },
]

const StoresMain = () => (
  <div className={s.wrapper}>
    {data.map(({ img, location, title, phone }, i) => (
      <div className={s.block} key={i}>
        <div className={s.left}>
          <img src={img} alt='' />
        </div>
        <div className={s.right}>
          <div className={s.location}>
            <img src='/stores/map.svg' alt='' />
            {location}
          </div>
          <div className={s.title}> {title} </div>
          {phone && (
            <Link href={'tel:' + phone}>
              <a> {phone} </a>
            </Link>
          )}
        </div>
      </div>
    ))}
  </div>
)

export default StoresMain

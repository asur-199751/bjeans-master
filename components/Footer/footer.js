import s from './footer.module.scss'
import Link from 'next/link'

const company = {
  parent: 'Компания',
  children: [
    { name: 'О компании B Jeans', link: '/about' },
    { name: 'Магазины', link: '/stores' },
    { name: 'Связаться с нами', link: '/contacts' },
    { name: 'Блог', link: '/posts' },
    { name: 'Вакансии', link: '/vacancy' },
    { name: 'Партнерам', link: '/partner' },
  ],
}
const help = {
  parent: 'Помощь',
  children: [
    { name: 'Как заказать', link: '/help' },
    { name: 'Возврат и Обмен', link: '/help' },
    { name: 'Способы оплат', link: '/help' },
    { name: 'Гарантия', link: '/help' },
    { name: 'FAQ', link: '/help' },
  ],
}

const Footer = ({ categories }) => {
  const categoriesLinks = []

  for (const key in categories) {
    const category = categories[key]

    if (categories.hasOwnProperty(key)) {
      categoriesLinks.push({
        parent:
          (category.name === 'MEN' && 'МУЖЧИНЫ') ||
          (category.name === 'WOMEN' && 'ЖЕНЩИНЫ'),
        children: category.children.map(({ name, slug }) => ({
          name,
          link: `/catalog/${category.slug}/${slug}`,
        })),
      })
    }
  }

  return (
    <footer className={s.wrapper}>
      <Link href='/'>
        <a className={s.logo}>
          <img src='/footer/footerLogo.svg' alt='' />
          <img src='/footer/footerLine.svg' alt='' />
        </a>
      </Link>
      <section className={s.top}>
        <Link href='/stores'>
          <a>
            <img src='/footer/map.svg' alt='' />
            Локации Магазинов
          </a>
        </Link>
        <Link href='tel:+998712337117'>
          <a>
            <img src='/footer/tel.svg' alt='' />
            71 2337117
          </a>
        </Link>
        <Link href='https://www.instagram.com/bjeanscentralasia/?hl=en'>
          <a target='_blank' rel='noopener'>
            <img src='/footer/facebook.svg' alt='' />
            bjeanscentralasia
          </a>
        </Link>
        <Link href='mailto:conscept@bgroup.uz'>
          <a>
            <img src='/footer/mail.svg' alt='' />
            conscept@bgroup.uz
          </a>
        </Link>
      </section>
      <section className={s.mid}>
        {[company, ...categoriesLinks, help].map((r, i) => (
          <div className={s.links} key={i}>
            <div className={s.parent}>
              {r.parent === 'MEN' ? 'МУЖЧИНЫ' : r.parent}
            </div>
            {r.children.map(
              (r, i) =>
                r.name !== 'КОМБИНЕЗОНЫ' && (
                  <Link href={r.link} key={i}>
                    <a className={s.child}>{r.name}</a>
                  </Link>
                )
            )}
          </div>
        ))}
      </section>
      <section className={s.bot}>
        <div className={s.images}>
          <img src='/footer/click.svg' alt='' />
          <img src='/footer/payme.svg' alt='' />
          <img src='/footer/visa.svg' alt='' />
          <img src='/footer/mastercard.svg' alt='' />
        </div>
        <div className={s.references}>
          <Link href='/terms'>
            <a>Публичная оферта</a>
          </Link>
          <Link href='/privacy'>
            <a>Политика конфиденциальности</a>
          </Link>
          <Link href='https://billz.io/online-store'>
            <a target='_blank' rel='nofollow, noreferrer'>
              Сайт разработан компанией
              <img src='/footer/billz.svg' alt='' />
            </a>
          </Link>
        </div>
      </section>
    </footer>
  )
}

export default Footer

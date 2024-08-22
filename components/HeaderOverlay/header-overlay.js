import s from './header-overlay.module.scss'
import { useState } from 'react'
import Link from 'next/link'

const CartModal = ({ name, slug, categories }) => {
  const [isShown, setIsShown] = useState(false)
  let sluggg = slug
  return (
    <div
      className={s.link}
      onMouseEnter={() => setIsShown(true)}
      onMouseLeave={() => setIsShown(false)}
    >
      <Link href={slug}>
        <a className={s.mainLink}>{name}</a>
      </Link>
      {categories && isShown && (
        <div className={s.wrapper}>
          <div className={s.inner}>
            <div className={s.left}>
              <div className={s.leftLinks}>
                {categories &&
                  categories?.children?.map(({ parent, name, slug }, i) => (
                    <Link href={`${sluggg}/${slug}`} key={i}>
                      <a> {name} </a>
                    </Link>
                  ))}
              </div>
            </div>
            <div className={s.right}>
              {categories &&
                categories?.children?.map(({ name, children }, i) => {
                  let formattedChildren = children

                  const ORDER = [
                    'cargo',
                    'regular',
                    'mom fit',
                    'slim mom',
                    'slouchy',
                    'skinny',
                    'slim',
                    'straight',
                    'tapered',
                    'wide leg',
                  ]

                  formattedChildren = children.sort((a, b) => {
                    a.name = a.name.toLowerCase()
                    b.name = b.name.toLowerCase()

                    let nra = parseInt(a.name)
                    let nrb = parseInt(b.name)

                    if (ORDER.indexOf(a.name) != -1) nra = NaN
                    if (ORDER.indexOf(b.name) != -1) nrb = NaN

                    if (nrb === 0) return 1
                    if ((nra && !nrb) || nra === 0) return -1
                    if (!nra && nrb) return 1
                    if (nra && nrb) {
                      if (nra == nrb) {
                        return a.name
                          .substr(('' + nra).length)
                          .localeCompare(a.name.substr(('' + nra).length))
                      } else {
                        return nra - nrb
                      }
                    } else {
                      return ORDER.indexOf(a.name) - ORDER.indexOf(b.name)
                    }
                  })
                  return (
                    name === 'ДЖИНСЫ' &&
                    formattedChildren
                      .slice(-6)
                      .map(({ parent, name, slug, image }, i) => (
                        <div
                          style={{
                            backgroundImage: `url(${image && image.sourceUrl})`,
                          }}
                          key={i}
                        >
                          <Link href={`${sluggg}/${slug}`}>
                            <a> {name.toUpperCase()} </a>
                          </Link>
                        </div>
                      ))
                  )
                })}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default CartModal

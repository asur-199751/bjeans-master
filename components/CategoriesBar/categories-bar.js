import s from './categories-bar.module.scss'
import Link from 'next/link'

const CategoriesBar = ({ categories }) => (
  <div className={s.wrapper}>
    <div className={s.inner}>
      {categories.map(
        (r, i) =>
          r.name !== 'КОМБИНЕЗОНЫ' && (
            <Link href={r.link} key={i}>
              <a>{r.name}</a>
            </Link>
          )
      )}
    </div>
  </div>
)
export default CategoriesBar

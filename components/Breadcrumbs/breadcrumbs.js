import s from './breadcrumbs.module.scss'
import Link from 'next/link'

const Breadcrumbs = ({ path }) => (
  <div className={s.links}>
    {path.map((x, i) =>
      i === path.length - 1 ? (
        <a key={i}>{x.name}</a>
      ) : (
        <Link key={i} href={x.link}>
          <a>{x.name}</a>
        </Link>
      )
    )}
  </div>
)

export default Breadcrumbs

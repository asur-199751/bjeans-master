import s from './home-main.module.scss'
import Link from 'next/link'

const HomeMain = ({
  title,
  text,
  linkName,
  link,
  data,
  hideTwoBlock,
  showOneSlider,
}) => {
  return (
    <section className={s.wrapper}>
      <div className={s.left}>
        <div>{title}</div>
        <div>{text}</div>
        <Link href={link}>
          <a>{linkName}</a>
        </Link>
      </div>
      <div className={s.right}>{data}</div>
      {showOneSlider ? <div className={s.leftTestMobile}>{text}</div> : ''}
      {hideTwoBlock ? (
        ''
      ) : (
        <Link href={link}>
          <a className={s.leftLinkMobile}>{linkName}</a>
        </Link>
      )}
    </section>
  )
}
export default HomeMain

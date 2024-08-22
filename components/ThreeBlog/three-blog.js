import s from './three-blog.module.scss'
import Link from 'next/link'
import { v4 as uuidv4 } from 'uuid'

const ThreeBlog = ({ posts, windowWidth }) => {
  const postss = posts.filter((r) => r.title !== '' && r)
  const joki = windowWidth >= 1023 ? postss.slice(0, 3) : postss.slice(0, 1)
  return (
    <div className={s.blogStyle}>
      {joki.map(({ title, content, slug, featuredImage }) => (
        <div key={uuidv4()}>
          <img
            src={
              featuredImage?.node?.sourceUrl
                ? featuredImage.node.sourceUrl
                : '/tempImg3.jpg'
            }
            alt=""
            className={s.blogStyleImg}
          />
          <div className={s.blogStyleInner}>
            <div> {title} </div>
            <div dangerouslySetInnerHTML={{ __html: content }} />
            <Link href={'/posts/' + slug}>
              <a>
                Продолжить <img src="/home/smallArrowRight.svg" alt="" />
              </a>
            </Link>
          </div>
        </div>
      ))}
    </div>
  )
}
export default ThreeBlog

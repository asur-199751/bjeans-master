import React from 'react'
import s from './post-main.module.scss'
import Link from 'next/link'

const PostMain = ({ post }) => {
  return (
    <div>
      <Link href="/posts">
        <a className={s.top}>
          <img src="/home/smallArrowRight.svg" alt="" />
          Назад
        </a>
      </Link>
      <div className={s.first}>
        <div className={s.firstInner}>
          <img
            src={
              post.featuredImage?.node?.sourceUrl
                ? post.featuredImage.node.sourceUrl
                : '/postMain.jpg'
            }
            alt=""
            className={s.img}
          />
          <div className={s.title}>{post.title}</div>
        </div>
      </div>
      <div className={s.wrapper}>
        <div dangerouslySetInnerHTML={{ __html: post.content }} />
      </div>
    </div>
  )
}

export default PostMain

import React from 'react'
import s from './posts-main.module.scss'
import Link from 'next/link'

const PostsMain = ({ posts }) => {
  return (
    <div>
      {/* <div className={s.first}>
        <div className={s.firstInner}>
          <img src="/postMain.jpg" alt="" />
          <div>Motorcycles x Jeans</div>
          <div>
            You are out on a pleasant motorcycle ride. It’s a warm, sunny
            afternoon, your bike is in good condition and you are in good
            condition. You’re wearing a full-face helmet, a jacket, jeans,
            gloves, and boots. You are prepared for the worst, but so far, this
            ride is the best. You are out on a pleasant motorcycle ride. It’s a
            warm, sunny afternoon, your bike is in good condition and you are in
            good condition. You’re wearing a full-face helmet, a jacket, jeans,
            gloves, and boots. You are prepared for the worst, but so far, this
            ride is the best. You are prepared for the worst.
          </div>
          <Link href="/posts/">
            <a>Продолжить</a>
          </Link>
        </div>
      </div> */}
      <div className={s.blogStyle}>
        {posts.map(({ title, content, slug, featuredImage }, i) => (
          <div key={i}>
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
    </div>
  )
}

export default PostsMain

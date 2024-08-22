import React from 'react'
import s from './index.module.scss'

const Wait = () => {
  return (
    <div className={s.wrapper}>
      <img src='/header/logo.svg' alt='' />
      <div class={s.loader}>
        <span></span>
        <span></span>
        <span></span>
      </div>
    </div>
  )
}

export default Wait

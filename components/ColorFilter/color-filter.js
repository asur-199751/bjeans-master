import React from 'react'
import s from './color-filter.module.scss'
import Loader from '../Loader'

const ColorFilter = ({ colors, active, setFilterValues }) => {
  return (
    <div className={s.wrapper}>
      {colors?.map((r, i) => (
        <div
          key={i}
          className={s.inner}
          onClick={() => setFilterValues('colors', r.name)}
        >
          {(active || []).includes(r.name) ? (
            <div key={i} className={s.colorBlockActive}>
              <div
                className={s.colorActive}
                style={{
                  backgroundColor: r.color,
                }}
              ></div>
              <div className={s.colorNameActive}>{r.name}</div>
              <img src="/filterX.svg" alt="" />
            </div>
          ) : (
            <div key={i} className={s.colorBlock}>
              <div
                className={s.color}
                style={{
                  backgroundColor: r.color,
                }}
              ></div>
              <div className={s.colorName}>{r.name}</div>
            </div>
          )}
        </div>
      ))}
    </div>
  )
}
export default ColorFilter

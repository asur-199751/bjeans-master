import React from 'react'
import s from './size-filter.module.scss'
import Loader from '../Loader'

const SizeFilter = ({ sizes, active, setFilterValues }) => {
  return (
    <div className={s.size}>
      {sizes?.map((r, i) => (
        <div key={i} className={s.sizeInner}>
          <div
            className={(active || []).includes(r.name) ? s.active : ''}
            onClick={() => setFilterValues('sizes', r.name)}
          >
            {(active || []).includes(r.name) ? (
              <img src="/filterX.svg" alt="" />
            ) : (
              <img src="/filterBox.svg" alt="" />
            )}
            <span>{r.name.toUpperCase()}</span>
          </div>
        </div>
      ))}
    </div>
  )
}
export default SizeFilter

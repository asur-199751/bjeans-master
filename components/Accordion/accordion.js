import s from './accordion.module.scss'
import { useState } from 'react'

const Accordion = ({ title, children, menu, product }) => {
  const [expand, setExpand] = useState(menu ? false : true)
  return (
    <div>
      <div
        className={`${menu ? s.menuTitle : s.title}   ${
          expand ? s.active : ''
        }  ${product ? s.product : ''} `}
        onClick={() => setExpand((expand) => !expand)}
      >
        <div>{title}</div>
        <img src="/catalog/smallArrowDown.svg" />
      </div>
      {expand && (
        <div className={`${s.content} ${product ? s.productContent : ''} `}>
          {children}
        </div>
      )}
    </div>
  )
}
export default Accordion

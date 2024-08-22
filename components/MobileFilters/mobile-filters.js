import s from './mobile-filters.module.scss'
import Accordion from '../Accordion'
import CategoryFilter from '../CategoryFilter'
import SizeFilter from '../SizeFilter'
import ColorFilter from '../ColorFilter'
import React, { useState, useEffect } from 'react'

const MobileFilters = ({
  categoryData,
  sizes,
  colors,
  setFilterValues,
  filters,
}) => {
  const [open, setOpen] = useState(false)
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
  }, [open])

  const { parentCategory, categories, category } = categoryData

  let formattedSizes = sizes

  const ORDER = [
    'xs',
    's',
    's-m',
    'm',
    'm-l',
    'l',
    'l-xl',
    'xl',
    'xl-xxl',
    'xxl',
    'xxl-xxxl',
    'xxxl',
    'xxxl-xxxxl',
    'xxxxl',
    'xxxxxl',
  ]

  formattedSizes = sizes?.sort((a, b) => {
    a.name = a.name.toLowerCase()
    b.name = b.name.toLowerCase()

    let nra = parseInt(a.name)
    let nrb = parseInt(b.name)

    if (ORDER.indexOf(a.name) != -1) nra = NaN
    if (ORDER.indexOf(b.name) != -1) nrb = NaN

    if (nrb === 0) return 1
    if ((nra && !nrb) || nra === 0) return -1
    if (!nra && nrb) return 1
    if (nra && nrb) {
      if (nra == nrb) {
        return a.name
          .substr(('' + nra).length)
          .localeCompare(a.name.substr(('' + nra).length))
      } else {
        return nra - nrb
      }
    } else {
      return ORDER.indexOf(a.name) - ORDER.indexOf(b.name)
    }
  })

  return (
    <>
      <button onClick={() => setOpen(true)} className={s.filterBlock}>
        <img src='/filter.svg' alt='' />
        Фильтр
      </button>
      <div className={`${s.wrapper}  ${open && s.active}`}>
        <div className={s.top}>
          <img src='/footer/footerLogo.svg' alt='' />
          <img
            src='/header/headerClose.svg'
            alt=''
            onClick={() => setOpen(false)}
          />
        </div>
        {categories && (
          <Accordion title='Категории' menu>
            <CategoryFilter
              categories={categories}
              category={category}
              parentCategory={parentCategory}
              getActiveStatus={setOpen}
              menu
            />
          </Accordion>
        )}
        <Accordion title='Размеры' menu>
          <SizeFilter
            sizes={formattedSizes}
            active={filters.sizes}
            setFilterValues={setFilterValues}
          />
        </Accordion>
        <Accordion title='Цвета' menu>
          <ColorFilter
            colors={colors}
            active={filters.colors}
            setFilterValues={setFilterValues}
          />
        </Accordion>
        <div className={s.apply}>
          <button onClick={() => setOpen(false)}>Применить</button>
        </div>
      </div>
    </>
  )
}
export default MobileFilters

import s from './filters.module.scss'
import Accordion from '../Accordion'
import CategoryFilter from '../CategoryFilter'
import SizeFilter from '../SizeFilter'
import ColorFilter from '../ColorFilter'
import React from 'react'

const Filters = ({
  categoryData,
  sizes,
  colors,
  setFilterValues,
  filters,
  loading,
}) => {
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
    <div className={s.wrapper}>
      {categories && (
        <Accordion title='Категории'>
          <CategoryFilter
            categories={categories}
            category={category}
            parentCategory={parentCategory}
          />
        </Accordion>
      )}
      <Accordion title='Размеры'>
        <SizeFilter
          sizes={formattedSizes}
          active={filters.sizes}
          setFilterValues={setFilterValues}
          loading={loading}
        />
      </Accordion>
      <Accordion title='Цвета'>
        <ColorFilter
          colors={colors}
          active={filters.colors}
          setFilterValues={setFilterValues}
          loading={loading}
        />
      </Accordion>
    </div>
  )
}
export default Filters

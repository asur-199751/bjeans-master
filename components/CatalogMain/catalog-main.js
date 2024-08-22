import React, { useState, useEffect, useReducer, useRef } from 'react'
import { useLazyQuery } from '@apollo/react-hooks'
import InfiniteScroll from 'react-infinite-scroller'
import Loader from '../Loader'
import s from './catalog-main.module.scss'
import Filters from '../Filters'
import MobileFilters from '../MobileFilters'
import ProductsList from '../ProductsList'
import PRODUCTS from '../../queries/products'
import client from '../../apollo/apollo-client'
import Offer from '../Offer'

const filterVariables = (filters, dk) => {
  const result = {
    first: 6,
    filters: [],
  }

  if (filters.categories && filters.categories.length) {
    result.categories = filters.categories
  }

  if (filters.colors && filters.colors.length) {
    result.filters.push({
      taxonomy: 'PACOLOR',
      terms: Array.isArray(filters.colors) ? filters.colors : [filters.colors],
    })
  }

  if (filters.sizes && filters.sizes.length) {
    result.filters.push({
      taxonomy: 'PASIZE',
      terms: Array.isArray(filters.sizes) ? filters.sizes : [filters.sizes],
    })
  }

  if (dk) {
    result.filters.push({
      taxonomy: 'PABRAND',
      terms: ['DK'],
    })
  }

  return result
}

const sortProducts = (products, sortValue) => {
  if (sortValue === 'default') {
    return [...products].sort(() => Math.random() - 0.5)
  }
  if (sortValue === 'highToLow') {
    return [...products].sort((a, b) => {
      return b.regularPrice - a.regularPrice
    })
  }
  if (sortValue === 'lowToHigh') {
    return [...products].sort((a, b) => {
      return a.regularPrice - b.regularPrice
    })
  }
  return products
}

function reducer(state, action) {
  switch (action.type) {
    case 'SET_FILTERS':
      return {
        ...state,
        filters: action.filters,
        products: [],
      }
    case 'SET_FILTER_VALUE':
      return {
        ...state,
        filters: { ...state.filters, [action.filter]: action.value },
        products: [],
      }
    case 'RESET_FILTERS':
      return {
        ...state,
        products: [],
        filters: {},
      }
    case 'RESET':
      return state.init ? initialState : state
    case 'SET_PRODUCTS':
      return { ...state, products: action.products }
    case 'SET_PRODUCTS_AND_PAGE_INFO':
      return {
        ...state,
        products: action.products,
        pageInfo: action.pageInfo,
        activeTerms: action.activeTerms,
      }
    case 'SET_SORTING':
      return {
        ...state,
        sortValue: action.sortValue,
      }
    default:
      throw new Error()
  }
}

const initialState = {
  filters: {},
  sortValue: 'default',
  products: null,
  pageInfo: null,
}

const CatalogMain = ({
  products,
  categories,
  category,
  parentCategory,
  pageInfo,
  activeTerms,
}) => {
  const [state, dispatch] = useReducer(reducer, {
    ...initialState,
    pageInfo,
    products,
    activeTerms,
  })

  const [prevSortValue, setPrevSortValue] = useState('default')

  const setFilterValues = (type, value) => {
    const arrayValuesFor = ['colors', 'sizes']

    if (value === '' || value == null) {
      const filters = { ...state.filters }
      delete filters[type]

      dispatch({
        type: 'SET_FILTERS',
        filters,
      })

      return
    }

    if (arrayValuesFor.includes(type)) {
      let options = state.filters[type] || []

      if (options.includes(value)) {
        options = options.filter((x) => x !== value)
      } else {
        options = [...options, value]
      }

      dispatch({
        type: 'SET_FILTER_VALUE',
        filter: type,
        value: options,
      })
    } else {
      dispatch({
        type: 'SET_FILTER_VALUE',
        filter: type,
        value: value,
      })
    }
  }

  const [loadProducts, { data, loading }] = useLazyQuery(PRODUCTS, { client })

  const loadMore = () => {
    if (!loading && state.pageInfo.hasNextPage) {
      loadProducts({
        variables: {
          ...filterVariables(state.filters, category?.slug ? false : true),
          categories: category?.slug,
          after: state.pageInfo.endCursor,
          orderBy: [
            {
              field:
                state.sortValue === 'lowToHigh' ||
                state.sortValue === 'highToLow'
                  ? 'PRICE'
                  : 'DATE',
              order: state.sortValue === 'lowToHigh' ? 'ASC' : 'DESC',
            },
          ],
        },
      })
    }
  }

  useEffect(() => {
    if (data) {
      dispatch({
        type: 'SET_PRODUCTS_AND_PAGE_INFO',
        products:
          state.sortValue !== prevSortValue
            ? [...data.products.nodes]
            : [...state.products, ...data.products.nodes],
        pageInfo: data.products.pageInfo,
        activeTerms: data.products.activeTerms,
      })
      setPrevSortValue(state.sortValue)
    }
  }, [data])

  const useIsMount = () => {
    const isMountRef = useRef(true)

    useEffect(() => {
      isMountRef.current = false
    }, [])

    return isMountRef.current
  }

  const isMount = useIsMount()

  useEffect(() => {
    if (!isMount) {
      loadProducts({
        variables: {
          ...filterVariables(state.filters, category?.slug ? false : true),
          categories: category?.slug,
          orderBy: [
            {
              field:
                state.sortValue === 'lowToHigh' ||
                state.sortValue === 'highToLow'
                  ? 'PRICE'
                  : 'DATE',
              order: state.sortValue === 'lowToHigh' ? 'ASC' : 'DESC',
            },
          ],
        },
      })
    }
  }, [state.filters])
  useEffect(() => {
    if (!isMount) {
      loadProducts({
        variables: {
          ...filterVariables(state.filters, category?.slug ? false : true),
          categories: category?.slug,
          orderBy: [
            {
              field:
                state.sortValue === 'lowToHigh' ||
                state.sortValue === 'highToLow'
                  ? 'PRICE'
                  : 'DATE',
              order: state.sortValue === 'lowToHigh' ? 'ASC' : 'DESC',
            },
          ],
        },
      })
    }
  }, [state.sortValue])

  const [windowWidth, setWindowWidth] = useState()
  let resizeWindow = () => {
    setWindowWidth(window.innerWidth)
  }

  useEffect(() => {
    resizeWindow()
    window.addEventListener('resize', resizeWindow)
    return () => window.removeEventListener('resize', resizeWindow)
  }, [])

  return (
    <>
      <div className={s.wrapper}>
        {windowWidth >= 1023 ? (
          <Filters
            categoryData={{
              parentCategory,
              categories,
              category,
            }}
            sizes={state.activeTerms && state.activeTerms.paSizes}
            colors={state.activeTerms && state.activeTerms.paColors}
            setFilterValues={setFilterValues}
            filters={state.filters}
          />
        ) : (
          <MobileFilters
            categoryData={{
              parentCategory,
              categories,
              category,
            }}
            sizes={state.activeTerms && state.activeTerms.paSizes}
            colors={state.activeTerms && state.activeTerms.paColors}
            setFilterValues={setFilterValues}
            filters={state.filters}
          />
        )}
        <div className={s.right}>
          <div className={s.rightTop}>
            Сортировать:
            <select
              onChange={(e) =>
                dispatch({
                  type: 'SET_SORTING',
                  sortValue: e.target.value,
                })
              }
            >
              <option value='default'> по умолчанию</option>
              <option value='highToLow'> по убыванию</option>
              <option value='lowToHigh'> по возрастанию</option>
            </select>
          </div>
          {loading && !state.products.length ? (
            <Loader />
          ) : state.products.length ? (
            <InfiniteScroll
              pageStart={0}
              loadMore={loadMore}
              hasMore={!loading && state.pageInfo.hasNextPage}
              initialLoad={false}
            >
              <ProductsList products={state.products} />
              {loading && <Loader />}
            </InfiniteScroll>
          ) : (
            'Товары не найдены'
          )}
        </div>
      </div>
      <Offer />
    </>
  )
}

export default CatalogMain

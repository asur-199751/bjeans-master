import React from 'react'
import Layout from '../../components/Layout'
import CategoriesBar from '../../components/CategoriesBar'
import Breadcrumbs from '../../components/Breadcrumbs'
import ProductCard from '../../components/ProductCard'
import client from '../../apollo/apollo-client'
import PRODUCT from '../../queries/product'
import { HeadData } from '../../components/Head'
import { connect } from 'react-redux'
import { useState } from 'react'
import { addToCart, deleteFromCart } from '../../redux/actions/cartActions'
import {
  addToWishlist,
  deleteFromWishlist,
} from '../../redux/actions/wishlistActions'
import { StaticDataSingleton } from '../../utils/staticData'

const Product = ({
  product,
  categoriesBar,
  cartItems,
  wishlistItems,
  addToCart,
  deleteFromCart,
  addToWishlist,
  deleteFromWishlist,
  categories,
  menCategories,
  womenCategories,
}) => {
  const [openCart, setOpenCart] = useState(false)

  const breadcrumbs = [
    {
      name: 'Home',
      link: '/',
    },
    {
      name: product.name,
      link: `/product/${product.slug}`,
    },
  ]

  return (
    <>
      <HeadData
        title={`${product.name} | Bjeans`}
        description={product.description}
        image={product?.image?.sourceUrl}
        product={product}
      />
      <Layout
        openCart={openCart}
        setOpenCart={setOpenCart}
        categories={categories}
        menCategories={menCategories}
        womenCategories={womenCategories}
      >
        {categoriesBar.length ? (
          <CategoriesBar categories={categoriesBar} />
        ) : null}

        <Breadcrumbs path={breadcrumbs} />
        <ProductCard
          key={product.id}
          product={product}
          cartItems={cartItems}
          wishlistItems={wishlistItems}
          addToCart={addToCart}
          deleteFromCart={deleteFromCart}
          addToWishlist={addToWishlist}
          deleteFromWishlist={deleteFromWishlist}
          getActiveStatus={(r) => setOpenCart(r)}
        />
      </Layout>
    </>
  )
}

// export const getStaticPaths = async () => {
//   const paths = []

//   const fetchProducts = async (after) => {
//     const _tempProductsResult = await client.query({
//       query: PRODUCTS,
//       variables: {
//         first: 10,
//         ...(after ? { after } : {}),
//       },
//     })

//     paths.push(
//       ..._tempProductsResult.data.products.nodes.map((product) => ({
//         params: { slug: product.slug },
//       }))
//     )

//     if (_tempProductsResult.data.products.pageInfo.hasNextPage) {
//       await fetchProducts(_tempProductsResult.data.products.pageInfo.endCursor)
//     }
//   }

//   if (process.env.NODE_ENV === 'production') {
//     await fetchProducts()
//   }

//   return {
//     paths,
//     fallback: 'blocking',
//   }
// }

export async function getServerSideProps({ params }) {
  let response

  try {
    response = await client.query({
      query: PRODUCT,
      variables: { id: params.slug },
    })
  } catch (e) {
    return {
      notFound: true,
      revalidate: 30,
    }
  }

  const staticData = new StaticDataSingleton()
  await staticData.checkAndFetch()

  const categories = staticData.getRootCategories()

  const menChildren = categories.men.children.map((x) => x.slug)
  const womenChildren = categories.women.children.map((x) => x.slug)

  let menCategories = []
  let womenCategories = []
  staticData.getAllChildrenSlugs('men', menCategories)
  staticData.getAllChildrenSlugs('women', womenCategories)

  menCategories = menCategories
    .filter((x) => !menChildren.includes(x))
    .map((slug) => staticData.getCategoryBySlug(slug))
  womenCategories = womenCategories
    .filter((x) => !womenChildren.includes(x))
    .map((slug) => staticData.getCategoryBySlug(slug))

  const productCategories = response.data.product.productCategories.nodes.map(
    (x) => x.slug
  )
  const isMenCategory = productCategories.find((x) => x === 'men')
  const isWomenCategory = productCategories.find((x) => x === 'women')

  if (isMenCategory == null && isWomenCategory == null) {
    return {
      props: {
        product: response.data.product,
        categoriesBar: [],
      },
      // revalidate: 60,
    }
  }

  const category = staticData.getCategoryBySlug(
    isMenCategory || isWomenCategory,
    1
  )

  const categoriesBar = [
    ...category.children.map(({ name, slug }) => ({
      name,
      link: `/catalog/${category.slug}/${slug}`,
    })),
    {
      name: 'Sale',
      link: `/catalog/${category.slug}/sale`,
    },
  ]

  return {
    props: {
      product: response.data.product,
      categoriesBar,
      menCategories,
      womenCategories,
      categories,
    },
    // revalidate: 60,
  }
}

const mapStateToProps = (state) => {
  return {
    cartItems: state.cartData,
    wishlistItems: state.wishlistData,
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    addToCart: (
      item,
      selectedProductColor,
      selectedProductSize,
      selectedProductLength,
      selectedProductId
    ) => {
      dispatch(
        addToCart(
          item,
          selectedProductColor,
          selectedProductSize,
          selectedProductLength,
          selectedProductId
        )
      )
    },
    deleteFromCart: (item) => {
      dispatch(deleteFromCart(item))
    },
    addToWishlist: (item) => {
      dispatch(addToWishlist(item))
    },
    deleteFromWishlist: (item) => {
      dispatch(deleteFromWishlist(item))
    },
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Product)

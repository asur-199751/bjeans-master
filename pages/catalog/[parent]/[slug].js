import React from 'react'
import Layout from '../../../components/Layout'
import CategoriesBar from '../../../components/CategoriesBar'
import Breadcrumbs from '../../../components/Breadcrumbs'
import CatalogMain from '../../../components/CatalogMain'
import client from '../../../apollo/apollo-client'
import PRODUCTS from '../../../queries/products'
import SIZES from '../../../queries/sizes'
import COLORS from '../../../queries/colors'
import { StaticDataSingleton } from '../../../utils/staticData'
import { HeadData } from '../../../components/Head'

const Catalog = ({
  products,
  categoriesBar,
  category,
  parentCategory,
  pageInfo,
  categories,
  menCategories,
  womenCategories,
  activeTerms,
}) => {
  const categoriesFilter = category.children.map(({ name, slug }) => ({
    name,
    link: `/catalog/${parentCategory.slug}/${slug}`,
  }))

  const isSale = parentCategory && parentCategory.slug === category.slug

  const breadcrumbs = [
    {
      name: 'Главная',
      link: '/',
    },
    {
      name: parentCategory.name,
      link: `/catalog/${parentCategory.slug}`,
    },
    {
      name: isSale ? 'Sale' : category.name,
      link: isSale
        ? `/catalog/${category.slug}/sale`
        : `/catalog/${category.slug}`,
    },
  ]

  return (
    <Layout
      categories={categories}
      menCategories={menCategories}
      womenCategories={womenCategories}
    >
      <HeadData />
      <CategoriesBar categories={categoriesBar} />
      <Breadcrumbs path={breadcrumbs} />
      <CatalogMain
        key={category.id}
        products={products}
        pageInfo={pageInfo}
        categories={categoriesFilter}
        category={category}
        parentCategory={parentCategory}
        isSale={isSale}
        activeTerms={activeTerms}
      />
    </Layout>
  )
}

// export const getStaticPaths = async () => {
//   const staticData = new StaticDataSingleton()
//   await staticData.checkAndFetch()

//   const men = []
//   const women = []

//   // Note that we mutate paths variable with this functions
//   staticData.getAllChildrenSlugs('men', men)
//   staticData.getAllChildrenSlugs('women', women)

//   const paths = [
//     ...men.map((slug) => ({ params: { parent: 'men', slug } })),
//     ...women.map((slug) => ({ params: { parent: 'women', slug } })),
//     { params: { parent: 'men', slug: 'sale' } },
//     { params: { parent: 'women', slug: 'sale' } },
//   ]

//   return {
//     paths,
//     fallback: 'blocking',
//   }
// }

export async function getServerSideProps({ params }) {
  const staticData = new StaticDataSingleton()
  await staticData.checkAndFetch()

  const categories = staticData.getRootCategories()
  const parentCategory = staticData.getCategoryBySlug(params.parent, 1)
  const category = staticData.getCategoryBySlug(
    params.slug === 'sale' ? params.parent : params.slug,
    2
  )

  const categoriesBar = [
    ...parentCategory.children.map(({ name, slug }) => ({
      name,
      link: `/catalog/${params.parent}/${slug}`,
    })),
    {
      name: 'Sale',
      link: `/catalog/${params.parent}/sale`,
    },
  ]

  const productsResponse = await client.query({
    query: PRODUCTS,
    variables: {
      first: 6,
      categories: params.slug !== 'sale' ? [params.slug] : [],
      onSale: params.slug === 'sale' ? true : null,
    },
  })

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

  return {
    props: {
      products: productsResponse.data.products.nodes,
      activeTerms: productsResponse.data.products.activeTerms,
      pageInfo: productsResponse.data.products.pageInfo,
      categoriesBar,
      parentCategory,
      category,
      categories,
      menCategories,
      womenCategories,
    },
    // revalidate: 60,
  }
}

export default Catalog

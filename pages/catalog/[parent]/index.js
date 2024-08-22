import React from 'react'
import Layout from '../../../components/Layout'
import CategoriesBar from '../../../components/CategoriesBar'
import Breadcrumbs from '../../../components/Breadcrumbs'
import CatalogMain from '../../../components/CatalogMain'
import client from '../../../apollo/apollo-client'
import PRODUCTS from '../../../queries/products'
import { StaticDataSingleton } from '../../../utils/staticData'
import { HeadData } from '../../../components/Head'

const Catalog = ({
  pageInfo,
  products,
  categoriesBar,
  category,
  categories,
  menCategories,
  womenCategories,
  activeTerms,
}) => {
  const categoriesFilter = category.children.map(({ name, slug }) => ({
    name,
    link: `/catalog/${category.slug}/${slug}`,
  }))

  let title = ''
  let description = ''

  switch (category.slug) {
    case 'men':
      title = 'Джинсовая одежда для мужчин, в Ташкенте | Bjeans'
      description =
        'Нужна джинсовая одежда для мужчин, хотите купить мужские джинсы в Ташкенте. Бесплатная доставка, Бесплатный возврат, Гарантия качества | Bjeans'
      break
    case 'women':
      title = 'Джинсовая одежда для женщин, в Ташкенте | Bjeans'
      description =
        'Купить джинсовую одежду для женщин в Ташкенте, вы можете в интернет-магазине B-jeans, Бесплатная доставка, Бесплатный возврат, Гарантия качества'
      break
    default:
      break
  }

  // title= 'Акции и скидки джинсовой одежды в Ташкенте | Bjeans'
  // description=
  //   'Ищите выгодное предложение, чтобы купить джинсы, джинсовые рубашки и брюки в Ташкенте? Тогда акции и скидки в магазине B-jeans - для вас!'

  const breadcrumbs = [
    {
      name: 'Главная',
      link: '/',
    },
    {
      name: category.name,
      link: `/catalog/${category.slug}`,
    },
  ]

  return (
    <Layout
      categories={categories}
      menCategories={menCategories}
      womenCategories={womenCategories}
    >
      <HeadData title={title} description={description} />
      <CategoriesBar categories={categoriesBar} />
      <Breadcrumbs path={breadcrumbs} />
      <CatalogMain
        key={category.id}
        products={products}
        categories={categoriesFilter}
        pageInfo={pageInfo}
        category={category}
        activeTerms={activeTerms}
      />
    </Layout>
  )
}

export default Catalog

// export const getStaticPaths = async () => {
//   const paths = ['men', 'women'].map((x) => ({ params: { parent: x } }))

//   return {
//     paths,
//     fallback: false,
//   }
// }

export async function getServerSideProps({ params }) {
  const staticData = new StaticDataSingleton()
  await staticData.checkAndFetch()

  const category = staticData.getCategoryBySlug(params.parent, 1)
  const categories = staticData.getRootCategories()

  const categoriesBar = [
    ...category.children.map(({ name, slug }) => ({
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
    variables: { first: 6, categories: [params.parent] },
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
      category,
      categories,
      menCategories,
      womenCategories,
    },
    // revalidate: 60,
  }
}

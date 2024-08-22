import Layout from '../../components/Layout'
import Breadcrumbs from '../../components/Breadcrumbs'
import CatalogMain from '../../components/CatalogMain'
import client from '../../apollo/apollo-client'
import PRODUCTS from '../../queries/products'
import { StaticDataSingleton } from '../../utils/staticData'
import { HeadData } from '../../components/Head'

const Catalog = ({
  pageInfo,
  products,
  categories,
  menCategories,
  womenCategories,
  activeTerms,
}) => {
  const title = 'Джинсовая одежда для женщин, в Ташкенте | Bjeans'
  const description =
    'Купить джинсовую одежду для женщин в Ташкенте, вы можете в интернет-магазине B-jeans, Бесплатная доставка, Бесплатный возврат, Гарантия качества'

  const breadcrumbs = [
    {
      name: 'Главная',
      link: '/',
    },
    {
      name: 'BJEANS x DK',
      link: `/catalog/dk`,
    },
  ]

  return (
    <Layout
      categories={categories}
      menCategories={menCategories}
      womenCategories={womenCategories}
    >
      <HeadData title={title} description={description} />
      <Breadcrumbs path={breadcrumbs} />
      <CatalogMain
        key='DK'
        products={products}
        pageInfo={pageInfo}
        activeTerms={activeTerms}
      />
    </Layout>
  )
}

export default Catalog

export async function getServerSideProps() {
  const staticData = new StaticDataSingleton()
  await staticData.checkAndFetch()

  const categories = staticData.getRootCategories()

  const productsResponse = await client.query({
    query: PRODUCTS,
    variables: {
      first: 6,
      filters: [
        {
          taxonomy: 'PABRAND',
          terms: ['DK'],
        },
      ],
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
      categories,
      menCategories,
      womenCategories,
    },
  }
}

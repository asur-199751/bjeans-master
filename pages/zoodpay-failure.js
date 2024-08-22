import React from 'react'
import Layout from '../components/Layout'
import WishlistMain from '../components/WishlistMain'
import { StaticDataSingleton } from '../utils/staticData'
import { HeadData } from '../components/Head'

const ZoodpayFailure = ({ categories, menCategories, womenCategories }) => {
  return (
    <Layout
      categories={categories}
      menCategories={menCategories}
      womenCategories={womenCategories}
    >
      <div className="zoodpay">
        Не получилось завершить транзакцию. <br /> Убедитесь, что вы ввели
        правильные данные и попробуйте снова.
      </div>
    </Layout>
  )
}

export async function getStaticProps() {
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

  return {
    props: {
      menCategories,
      womenCategories,
      categories,
    },
    revalidate: 60,
  }
}

export default ZoodpayFailure

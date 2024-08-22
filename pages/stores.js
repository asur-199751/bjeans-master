import React from 'react'
import Layout from '../components/Layout'
import Content from '../components/Content'
import StoresMain from '../components/StoresMain'
import { StaticDataSingleton } from '../utils/staticData'
import { HeadData } from '../components/Head'

const Stores = ({ categories, menCategories, womenCategories }) => {
  return (
    <Layout
      categories={categories}
      menCategories={menCategories}
      womenCategories={womenCategories}
    >
      <HeadData pageUrl="/stores" />
      <Content stores />
      <StoresMain />
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

export default Stores

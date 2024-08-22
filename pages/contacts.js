import React from 'react'
import Layout from '../components/Layout'
import Content from '../components/Content'
import ContactsMain from '../components/ContactsMain'
import { StaticDataSingleton } from '../utils/staticData'
import { HeadData } from '../components/Head'

const Contacts = ({ categories, menCategories, womenCategories }) => {
  return (
    <Layout
      categories={categories}
      menCategories={menCategories}
      womenCategories={womenCategories}
    >
      <HeadData />
      <Content contacts />
      <ContactsMain />
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

export default Contacts

import React from 'react'
import Layout from '../components/Layout'
import { StaticDataSingleton } from '../utils/staticData'
import client from '../apollo/apollo-client'
import EXTRA from '../queries/extra'
import { HeadData } from '../components/Head'

const Offer = ({ categories, menCategories, womenCategories, post }) => {
  return (
    <Layout
      categories={categories}
      menCategories={menCategories}
      womenCategories={womenCategories}
    >
      <HeadData />
      <div dangerouslySetInnerHTML={{ __html: post }} />
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

  const post = await client.query({
    query: EXTRA,
    variables: { id: 9074 },
  })

  return {
    props: {
      menCategories,
      womenCategories,
      categories,
      post: post.data.post.content,
    },
    revalidate: 60,
  }
}

export default Offer

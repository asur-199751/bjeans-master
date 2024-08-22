import React from 'react'
import Layout from '../../components/Layout'
import PostsMain from '../../components/PostsMain'
import { StaticDataSingleton } from '../../utils/staticData'
import client from '../../apollo/apollo-client'
import POSTS from '../../queries/posts'
import { HeadData } from '../../components/Head'

const Posts = ({ categories, menCategories, womenCategories, postss }) => {
  const posts = postss.filter((r) => r.title !== '' && r)
  return (
    <Layout
      categories={categories}
      menCategories={menCategories}
      womenCategories={womenCategories}
    >
      <HeadData pageUrl="/posts" />
      <PostsMain posts={posts} />
    </Layout>
  )
}

export async function getServerSideProps() {
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

  const posts = await client.query({
    query: POSTS,
  })

  return {
    props: {
      menCategories,
      womenCategories,
      categories,
      postss: posts.data.posts.nodes,
    },
    // revalidate: 60,
  }
}

export default Posts

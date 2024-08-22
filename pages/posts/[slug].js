import React from 'react'
import Layout from '../../components/Layout'
import PostMain from '../../components/PostMain'
import { StaticDataSingleton } from '../../utils/staticData'
import client from '../../apollo/apollo-client'
import POSTS from '../../queries/posts'
import POST from '../../queries/post'

const Posts = ({ categories, menCategories, womenCategories, post }) => {
  return (
    <Layout
      categories={categories}
      menCategories={menCategories}
      womenCategories={womenCategories}
    >
      <PostMain post={post} />
    </Layout>
  )
}

// export const getStaticPaths = async () => {
//   const posts = await client.query({
//     query: POSTS,
//   })

//   const paths = posts.data.posts.nodes.map(({ slug }) => ({
//     params: { slug: slug },
//   }))

//   return {
//     paths,
//     fallback: 'blocking',
//   }
// }

export async function getServerSideProps({ params }) {
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
    query: POST,
    variables: { id: params.slug },
  })

  return {
    props: {
      menCategories,
      womenCategories,
      categories,
      post: post.data.post,
    },
    // revalidate: 60,
  }
}

export default Posts

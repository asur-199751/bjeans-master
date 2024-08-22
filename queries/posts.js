import gql from 'graphql-tag'

const POSTS = gql`
  query POSTS {
    posts {
      nodes {
        title
        content
        slug
        featuredImage {
          node {
            sourceUrl
          }
        }
      }
    }
  }
`
export default POSTS

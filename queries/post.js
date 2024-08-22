import gql from 'graphql-tag'

const POST = gql`
  query POST($id: ID!) {
    post(id: $id, idType: SLUG) {
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
`
export default POST

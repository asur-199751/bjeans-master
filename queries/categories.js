import gql from 'graphql-tag'

const CATEGORIES = gql`
  query CATEGORIES($first: Int, $after: String) {
    productCategories(
      first: $first
      after: $after
      where: { hideEmpty: true, orderby: MENU_ORDER}
    ) {
      pageInfo {
        hasNextPage
        endCursor
      }
      nodes {
        databaseId
        name
        slug
        image {
          sourceUrl
        }
        parent {
          node {
            slug
          }
        }
        children(first: 100, where: { hideEmpty: true, orderby: MENU_ORDER }) {
          nodes {
            slug
          }
        }
      }
    }
  }
`

export default CATEGORIES

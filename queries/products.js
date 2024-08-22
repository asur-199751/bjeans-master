import gql from 'graphql-tag'
import { _Product, _SimpleProduct, _VariableProduct } from './fragments'

const PRODUCTS = gql`
  query PRODUCTS(
    $first: Int
    $after: String
    $categories: [String]
    $filters: [ProductTaxonomyFilterInput]
    $onSale: Boolean
    $search: String
    $orderBy: [ProductsOrderbyInput]
  ) {
    products(
      first: $first
      after: $after
      where: {
        status: "publish"
        stockStatus: IN_STOCK
        onSale: $onSale
        categoryIn: $categories
        taxonomyFilter: { and: $filters }
        search: $search
        orderby: $orderBy
      }
    ) {
      pageInfo {
        endCursor
        hasNextPage
      }
      activeTerms {
        paColors {
          name
          slug
          color
        }
        paSizes {
          name
          slug
        }
      }
      nodes {
        ..._Product
        ... on SimpleProduct {
          ..._SimpleProduct
        }
        ... on VariableProduct {
          ..._VariableProduct
        }
        productCategories {
          nodes {
            name
            slug
          }
        }
      }
    }
  }
  ${_Product}
  ${_SimpleProduct}
  ${_VariableProduct}
`

export default PRODUCTS

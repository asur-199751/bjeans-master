import gql from 'graphql-tag'
import { CustomerFragment } from '../queries/customer'

export const UPDATE_CUSTOMER = gql`
  mutation UpdateCustomer(
    $mutationId: String!
    $firstName: String
    $city: String
    $address: String
    $phone: String
  ) {
    updateCustomer(
      input: {
        clientMutationId: $mutationId
        firstName: $firstName
        billing: { phone: $phone }
        shipping: { firstName: $firstName, address1: $address, city: $city }
      }
    ) {
      customer {
        ..._Customer
      }
    }
  }
  ${CustomerFragment}
`

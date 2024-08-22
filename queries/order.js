import gql from 'graphql-tag'

const ORDER = gql`
  query ORDER($id: ID!) {
    order(id: $id, idType: ORDER_NUMBER) {
      databaseId
      orderKey
      date
      customerNote
      total(format: RAW)
      status
      paymentMethodTitle
      billing {
        firstName
        phone
        address1
      }
      lineItems {
        nodes {
          product {
            name
            image {
              sourceUrl
            }
          }
          quantity
          total
          color: metaData(key: "pa_color") {
            value
          }
          size: metaData(key: "pa_size") {
            value
          }
        }
      }
    }
  }
`
export default ORDER

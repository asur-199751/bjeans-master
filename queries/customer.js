import gql from 'graphql-tag'

export const CustomerFragment = gql`
  fragment _Customer on Customer {
    databaseId
    firstName
    username
    billing {
      address1
      city
      firstName
      phone
    }
    shipping {
      address1
      city
      firstName
      lastName
      phone
    }
  }
`

export const CUSTOMER = gql`
  query Customer($customerId: Int) {
    customer(customerId: $customerId) {
      ..._Customer
    }
  }
  ${CustomerFragment}
`

export const CUSTOMER_ORDERS = gql`
  query CustomerOrders($customerId: Int) {
    orders(first: 50, where: { customerId: $customerId }) {
      nodes {
        databaseId
        date
        status
        customerNote
        total(format: RAW)
        paymentMethodTitle
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
  }
`

export const CUSTOMER_ORDER = gql`
  query CustomerOrder($orderId: ID!) {
    order(id: $orderId, idType: DATABASE_ID) {
      databaseId
      date
      total
      subtotal
      shippingTotal
      status
      shipping {
        address1
      }
      billing {
        firstName
        phone
      }
      customerNote
      lineItems {
        nodes {
          quantity
          subtotal
          product {
            name
          }
        }
      }
    }
  }
`

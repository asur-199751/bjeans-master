import gql from 'graphql-tag'

const CUSTOM = gql`
  query MyQuery {
    themeGeneralSettings {
      home_settings {
        slider {
          title
          link
          image {
              sourceUrl
          }
          imageMob {
              sourceUrl
          }
        }
      }
    }
  }
`
export default CUSTOM

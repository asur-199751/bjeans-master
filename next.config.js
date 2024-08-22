module.exports = {
  async redirects() {
    return [
      {
        source: '/catalog',
        destination: '/catalog/men',
        permanent: false,
      },
    ]
  },
}

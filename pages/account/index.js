import React from 'react'
import Layout from '../../components/Layout'
import AdminMain from '../../components/AdminMain'
import { StaticDataSingleton } from '../../utils/staticData'
import useUser from '../../utils/useUser'
import { HeadData } from '../../components/Head'

const Account = ({ categories }) => {
  useUser({ redirectTo: '/' })

  return (
    <Layout categories={categories}>
      <HeadData />
      <AdminMain />
    </Layout>
  )
}

export async function getStaticProps() {
  const staticData = new StaticDataSingleton()
  await staticData.checkAndFetch()

  const categories = staticData.getRootCategories()

  return {
    props: {
      categories,
    },
    revalidate: 60,
  }
}

export default Account

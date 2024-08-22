import Layout from '../components/Layout'
import HomeBanner from '../components/HomeBanner'
import Offer from '../components/Offer'
import HomeMain from '../components/HomeMain'
import ThreeSlider from '../components/ThreeSlider'
import TwoBlock from '../components/TwoBlock'
import OneSlider from '../components/OneSlider'
import ThreeBlog from '../components/ThreeBlog'
import React, { useState, useEffect } from 'react'
import { StaticDataSingleton } from '../utils/staticData'
import client from '../apollo/apollo-client'
import POSTS from '../queries/posts'
import { HeadData } from '../components/Head'
import CUSTOM from '../queries/custom'

const Index = ({
  menCategories,
  womenCategories,
  categories,
  postss,
  homeOne,
}) => {
  const posts = postss.filter((r) => r.title !== '' && r)

  const [windowWidth, setWindowWidth] = useState()
  let resizeWindow = () => setWindowWidth(window.innerWidth)

  useEffect(() => {
    resizeWindow()
    window.addEventListener('resize', resizeWindow)
    return () => window.removeEventListener('resize', resizeWindow)
  }, [])

  const mainData = [
    {
      title: 'Популярные товары для мужчин',
      text: 'Джинсовые брюки и куртки в новой коллекции SS21 B Jeans',
      linkName: 'Перейти',
      link: '/catalog/men',
      rightData: (
        <ThreeSlider
          data={menCategories.map((x) => ({
            img: x.image && x.image.sourceUrl,
            title: x.name,
            link: `/catalog/men/${x.slug}`,
            text: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
          }))}
          windowWidth={windowWidth}
        />
      ),
    },
    {
      title: 'Популярные товары для женщин',
      text: 'Более 8 стилей джинс и других джинсовых изделий для красивых дам…',
      linkName: 'Перейти',
      link: '/catalog/women',
      rightData: (
        <ThreeSlider
          data={womenCategories.map((x) => ({
            img: x.image && x.image.sourceUrl,
            title: x.name,
            link: `/catalog/women/${x.slug}`,
            text: 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.',
          }))}
          windowWidth={windowWidth}
        />
      ),
    },
    {
      title: 'Джинсовые куртки',
      text: 'Ознакомьтесь с огромным ассортиментом курток B Jeans разных стилей и кроя.',
      linkName: 'Перейти',
      link: '/catalog/men',
      rightData: (
        <TwoBlock
          data={[
            {
              img: '/2.jpg',
              title: 'ДЛЯ МУЖЧИН',
              slug: '/catalog/men',
            },
            {
              img: '/1.jpg',
              title: 'ДЛЯ ЖЕНЩИН',
              slug: '/catalog/women',
            },
          ]}
        />
      ),
      hideTwoBlock: true,
    },
    {
      title: 'Посетите наши магазины',
      text: 'B Jeans - первый бренд отечественного производства выпускающий джинсовые изделия, открывший свой филиал в городе Ташкент в сентябре 2020 года. Все производство размещено в городе Бухара, Узбекистан. Для производства джинсовой продукции используется высококачественный хлопок и нетоксичные красители.',
      linkName: 'Контакты',
      link: '/stores ',
      rightData: (
        <OneSlider
          data={{
            img: '/home/home-two-3.jpg',
            title:
              'Tashkent city, Mirzo-Ulugbek district, Shahrisabz street, 1',
          }}
        />
      ),
      showOneSlider: true,
    },
    // {
    //   title: 'Загляните в наш блог',
    //   text: 'Ознакомьтесь с последними тенденциями и предложениями на джинсы премиум-класса. Также мы покажем как подобрать себе стильный образ.',
    //   linkName: 'Перейти',
    //   link: '/posts',
    //   rightData: <ThreeBlog posts={posts} windowWidth={windowWidth} />,
    // },
  ]

  return (
    <Layout
      categories={categories}
      menCategories={menCategories}
      womenCategories={womenCategories}
    >
      <HeadData />
      <HomeBanner homeOne={homeOne} />
      <Offer />
      {mainData.map((r, i) => {
        return (
          <HomeMain
            key={i}
            title={r.title}
            text={r.text}
            linkName={r.linkName}
            link={r.link}
            data={r.rightData}
            hideLink={r.hideLink}
            hideTwoBlock={r.hideTwoBlock}
            showOneSlider={r.showOneSlider}
            windowWidth={windowWidth}
          />
        )
      })}
    </Layout>
  )
}

export async function getStaticProps() {
  const staticData = new StaticDataSingleton()
  await staticData.checkAndFetch(true)

  const categories = staticData.getRootCategories()
  const menChildren = categories.men.children.map((x) => x.slug)
  const womenChildren = categories.women.children.map((x) => x.slug)

  let menCategories = []
  let womenCategories = []
  staticData.getAllChildrenSlugs('men', menCategories)
  staticData.getAllChildrenSlugs('women', womenCategories)

  menCategories = menCategories
    .filter((x) => !menChildren.includes(x))
    .map((slug) => staticData.getCategoryBySlug(slug))
  womenCategories = womenCategories
    .filter((x) => !womenChildren.includes(x))
    .map((slug) => staticData.getCategoryBySlug(slug))

  const posts = await client.query({
    query: POSTS,
  })

  const result4 = await client.query({
    query: CUSTOM,
  })

  return {
    props: {
      menCategories,
      womenCategories,
      categories,
      postss: posts.data.posts.nodes,
      homeOne: result4.data.themeGeneralSettings.home_settings.slider,
    },
    revalidate: 60,
  }
}

export default Index

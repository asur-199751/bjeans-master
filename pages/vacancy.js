import React, { useState } from 'react'
import Layout from '../components/Layout'
import { StaticDataSingleton } from '../utils/staticData'
import axios from 'axios'
import { HeadData } from '../components/Head'

const Vacancy = ({ categories, menCategories, womenCategories }) => {
  const [info, setInfo] = useState({
    title: 'Вступай в команду B JEANS!',
    name: '',
    birthday: '',
    country: '',
    city: '',
    phone: '',
    address: '',
    position: '',
  })

  const [loading, setLoading] = useState(false)

  const inputs = [
    {
      title: 'Ф.И.О:',
      name: 'name',
      value: info.name,
    },
    {
      title: 'Дата рождения:',
      name: 'birthday',
      value: info.birthday,
    },
    {
      title: 'Страна:',
      name: 'country',
      value: info.country,
    },
    {
      title: 'Город:',
      name: 'city',
      value: info.city,
    },
    {
      title: 'Номер телефона:',
      name: 'phone',
      value: info.phone,
    },
    {
      title: 'Адрес проживания:',
      name: 'address',
      value: info.address,
    },
    {
      title: 'Желаемая должность:',
      name: 'position',
      value: info.position,
    },
  ]

  const sendData = async () => {
    setLoading(true)
    await axios
      .post('/api/vacancy', info)
      .then(function (response) {
        console.log(response)
      })
      .catch(function (error) {
        console.log(error)
      })
    alert('Отправлено')
    setLoading(false)
  }

  return (
    <Layout
      categories={categories}
      categories={categories}
      menCategories={menCategories}
      womenCategories={womenCategories}
    >
      <HeadData pageUrl="/vacancy" />
      <div className="jokiTitle">Вступай в команду B JEANS!</div>
      {inputs.map(({ title, name, value }) => (
        <input
          type="text"
          key={title}
          name={name}
          placeholder={title}
          value={value}
          className="jokiInput"
          onChange={(e) =>
            setInfo({ ...info, [e.target.name]: e.target.value })
          }
        />
      ))}
      <button
        className="jokiButton"
        onClick={() => sendData()}
        disabled={loading}
      >
        {loading ? 'ОТПРАВКА...' : 'ОТПРАВИТЬ'}
      </button>
    </Layout>
  )
}

export async function getStaticProps() {
  const staticData = new StaticDataSingleton()
  await staticData.checkAndFetch()

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

  return {
    props: {
      menCategories,
      womenCategories,
      categories,
    },
    revalidate: 60,
  }
}

export default Vacancy

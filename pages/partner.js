import React, { useState } from 'react'
import Layout from '../components/Layout'
import { StaticDataSingleton } from '../utils/staticData'
import axios from 'axios'
import { HeadData } from '../components/Head'

const Partner = ({ categories, menCategories, womenCategories }) => {
  const [info, setInfo] = useState({
    title: 'Партнерам',
    name: '',
    phone: '',
    email: '',
    comment: '',
  })

  const [loading, setLoading] = useState(false)

  const inputs = [
    {
      title: 'Ф.И.О:',
      name: 'name',
      value: info.name,
    },
    {
      title: 'Номер телефона:',
      name: 'phone',
      value: info.phone,
    },
    {
      title: 'E-mail:',
      name: 'email',
      value: info.email,
    },
  ]

  const sendData = async () => {
    setLoading(true)
    await axios
      .post('/api/partner', info)
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
      <HeadData pageUrl="/partner" />
      <div className="jokiTitle">Партнерам</div>
      <div className="jokiDesc">
        Если вы заинтересованы в сотрудничестве с нашим брендом, просим
        заполнить анкету и оставить свои контактные данные. Мы свяжемся с вам в
        ближайшее время
      </div>
      <br />
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
      <textarea
        placeholder="Напишите нам"
        name="comment"
        onChange={(e) => setInfo({ ...info, [e.target.name]: e.target.value })}
        value={info.comment}
        className="jokiTextarea"
      />
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

export default Partner

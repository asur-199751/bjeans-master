import React, { useEffect, useState } from 'react'
import s from './admin-about.module.scss'
import useUser from '../../utils/useUser'

const cities = [
  'Ташкент',
  'Республика Каракалпакстан',
  'Андижанская область',
  'Бухарская область',
  'Джизакская область',
  'Кашкадарьинская область',
  'Навоийская область',
  'Наманганская область',
  'Самаркандская область',
  'Сурхандарьинская область',
  'Сырдарьинская область',
  'Ташкентская область',
  'Ферганская область',
  'Хорезмская область',
]

const AdminAbout = () => {
  const [city, setCity] = useState('Ташкент')
  const [address, setAddress] = useState('')
  const [name, setName] = useState('')
  const [surname, setSurname] = useState('')
  const { userData } = useUser()

  useEffect(() => {
    if (userData && userData.isLoggedIn) {
      setAddress(userData.user.shipping.address1)
      setName(userData.user.shipping.firstName)
      setSurname(userData.user.shipping.lastName)
      setCity(userData.user.shipping.city || 'Ташкент')
    }
  }, [userData])

  return (
    <div className={s.wrapper}>
      <div className={s.top}>
        <div>
          Hello,{' '}
          {userData
            ? (userData.user && userData.user.firstName) || 'User'
            : '...'}{' '}
        </div>
        <div>
          Here you can see and edit your personal information that will be
          auto-filled in next orders.
        </div>
      </div>
      <div className={s.inner}>
        <div className={s.forDELIVERY}>
          <div>FOR DELIVERY</div>
          <div>We guarantee the safety of your data and orders</div>
        </div>
        <select value={city} onChange={(e) => setCity(e.target.value)}>
          {cities.map((r, i) => (
            <option key={i}> {r}</option>
          ))}
        </select>
        <input
          placeholder="Address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
        <input
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          placeholder="Surname"
          value={surname}
          onChange={(e) => setSurname(e.target.value)}
        />
        <input placeholder="Email" />
        <button>SAVE CHANGES</button>
      </div>
    </div>
  )
}

export default AdminAbout

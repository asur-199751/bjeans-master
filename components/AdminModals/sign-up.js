import s from './admin-modals.module.scss'
import React, { useState } from 'react'
import axios from 'axios'

const SignUpModal = ({
  setContent,
  contentTypes,
  setModalOpen,
  phone,
  setPhone,
}) => {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')

  const onSubmit = async (e) => {
    e.preventDefault()

    const response = await axios.post('/api/auth/send-otp', {
      firstName,
      lastName,
      phone,
    })

    if (response?.data?.status) {
      setContent(contentTypes.phoneVerification)
    }
  }

  return (
    <>
      <div className={s.modalTop}>
        Создайте аккаунт
        <img src="/closeModal.svg" alt="" onClick={() => setModalOpen(false)} />
      </div>

      <div className={s.modalText}>
        Зарегистрированные пользователи на сайте Bjeans имеют возможность
        отслеживать свои заказы и многое другое
      </div>

      <input
        placeholder="Имя"
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
      />
      <input
        placeholder="Фамилия"
        value={lastName}
        onChange={(e) => setLastName(e.target.value)}
      />
      <input
        placeholder="Номер телефона (с кодом)"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
      />
      <div className={s.modalBottom}>
        <button className={s.modalButtonBlack} onClick={(e) => onSubmit(e)}>
          Зарегистрироваться
        </button>
        <button
          type="button"
          onClick={() => setContent(contentTypes.signIn)}
          className={s.modalButtonWhite}
        >
          У меня уже есть аккаунт
        </button>
        <div className={s.modalWarning}>
          Создавая аккаунт вы соглашаетесь с Публичной офертой и Политикой
          конфиденциальности Bjeans.
        </div>
      </div>
    </>
  )
}

export default SignUpModal

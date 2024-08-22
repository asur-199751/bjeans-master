import s from './admin-modals.module.scss'
import axios from 'axios'

const SignInModal = ({
  setModalOpen,
  setContent,
  contentTypes,
  phone,
  setPhone,
}) => {
  const onSubmit = async (e) => {
    e.preventDefault()

    const response = await axios.post('/api/auth/send-otp', { phone })

    if (response?.data?.status) {
      setContent(contentTypes.phoneVerification)
    }
  }

  return (
    <>
      <div className={s.modalTop}>
        Пожалуйста, войдите
        <img src="/closeModal.svg" alt="" onClick={() => setModalOpen(false)} />
      </div>
      <input
        placeholder="Номер телефона (с кодом)"
        className={s.modalInput}
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
      />
      <div className={s.modalBottom}>
        <button className={s.modalButtonWhite} onClick={(e) => onSubmit(e)}>
          Вход в учетную запись
        </button>
        <div
          className={s.modalWarning}
          onClick={() => setContent(contentTypes.signUp)}
        >
          Еще не зарегистрировались? Создать учетную запись
        </div>
      </div>
    </>
  )
}

export default SignInModal

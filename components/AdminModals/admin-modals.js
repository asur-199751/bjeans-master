import React, { useState } from 'react'
import s from './admin-modals.module.scss'
import ReactModal from 'react-modal'

import SignUpModal from './sign-up'
import PhoneVerificationModal from './phone-verification'
import SignInModal from './sign-in'

const AdminModals = ({ modalOpen, setModalOpen }) => {
  const contentTypes = {
    signUp: 'signUp',
    phoneVerification: 'phoneVerification',
    signIn: 'signIn',
  }

  const [content, setContent] = useState(contentTypes.signUp)
  const [contentBefore, setContentBefore] = useState(contentTypes.signUp)
  const [phone, setPhone] = useState('')

  const setContents = (contentType) => {
    setContentBefore(content)
    setContent(contentType)
  }

  const contentComponents = {
    signUp: (
      <ReactModal
        isOpen={modalOpen}
        onRequestClose={() => setModalOpen(false)}
        ariaHideApp={false}
        className={s.modalContent}
        overlayClassName={s.modalOverlay}
      >
        <SignUpModal
          setContent={setContents}
          setModalOpen={setModalOpen}
          contentTypes={contentTypes}
          phone={phone}
          setPhone={setPhone}
        />
      </ReactModal>
    ),
    phoneVerification: (
      <ReactModal
        isOpen={modalOpen}
        onRequestClose={() => setModalOpen(false)}
        ariaHideApp={false}
        className={s.modalContent}
        overlayClassName={s.modalOverlay}
      >
        <PhoneVerificationModal
          setContent={setContent}
          contentTypes={contentTypes}
          phone={phone}
          contentBefore={contentBefore}
        />
      </ReactModal>
    ),
    signIn: (
      <ReactModal
        isOpen={modalOpen}
        onRequestClose={() => setModalOpen(false)}
        ariaHideApp={false}
        className={s.modalContent}
        overlayClassName={s.modalOverlay}
      >
        <SignInModal
          contentTypes={contentTypes}
          setContent={setContents}
          setModalOpen={setModalOpen}
          phone={phone}
          setPhone={setPhone}
        />
      </ReactModal>
    ),
  }

  return <div>{contentComponents[content]}</div>
}

export default AdminModals

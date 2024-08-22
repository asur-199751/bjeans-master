import '../styles/globals.scss'
import { PersistGate } from 'redux-persist/integration/react'
import Router from 'next/router'
import { useStore } from 'react-redux'
import { store } from '../redux/store'
import React, { useState, useEffect } from 'react'
import Wait from '../components/wait'
import { HeadData } from '../components/Head'

if (process.browser) {
  const hours = 6
  const now = Date.now()
  const setupTime = localStorage.getItem('version')
  if (setupTime == null) {
    localStorage.clear()
    localStorage.setItem('version', now)
  } else if (now - setupTime > hours * 60 * 60 * 1000) {
    localStorage.clear()
    localStorage.setItem('version', now)
  }
}

function MyApp({ Component, pageProps }) {
  const store = useStore()

  const [loading, setLoading] = useState(false)
  useEffect(() => {
    const start = () => {
      console.log('start')
      setLoading(true)
    }
    const end = () => {
      console.log('findished')
      setLoading(false)
    }
    Router.events.on('routeChangeStart', start)
    Router.events.on('routeChangeComplete', end)
    Router.events.on('routeChangeError', end)
    return () => {
      Router.events.off('routeChangeStart', start)
      Router.events.off('routeChangeComplete', end)
      Router.events.off('routeChangeError', end)
    }
  }, [])

  return (
    <>
      <HeadData />
      {loading ? (
        <Wait />
      ) : (
        <PersistGate persistor={store.__persistor}>
          {() => <Component {...pageProps} />}
        </PersistGate>
      )}
    </>
  )
}

export default store.withRedux(MyApp)

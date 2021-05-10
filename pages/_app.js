import MainLayout from '../components/Layout/main_layout'
import 'tailwindcss/tailwind.css'
import '../styles/globals.css'
import { appWithTranslation } from 'next-i18next'
import ProgressBar from '@badrap/bar-of-progress'

import Router, { useRouter } from 'next/router'
import React from 'react'

const progress = new ProgressBar({
  size: 2,
  color: '#ffffff',
  className: 'bar-of-progress',
  delay: 100,
})

Router.events.on('routeChangeStart', progress.start)
Router.events.on('routeChangeComplete', progress.finish)
Router.events.on('routeChangeError', progress.finish)

function MyApp({ Component, pageProps }) {
  const router = useRouter()
  return (
    <div className="tailwind">
      {router.asPath.split('/')[1] === 'admin' ? (
        <Component {...pageProps} />
      ) : (
        <MainLayout>
          <Component {...pageProps} />
        </MainLayout>
      )}
    </div>
  )
}

export default appWithTranslation(MyApp)

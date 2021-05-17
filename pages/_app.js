import MainLayout from '../components/Layout/main_layout'

import '../styles/globals.css'
import 'antd/dist/antd.css'
import '../styles/custom.css'
import { appWithTranslation } from 'next-i18next'
import ProgressBar from '@badrap/bar-of-progress'

import Router, { useRouter } from 'next/router'
import React from 'react'
import AdminLayout from '../components/Layout/admin_layout'

const progress = new ProgressBar({
  size: 2,
  color: '#93C5FD',
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
        <AdminLayout>
          <Component {...pageProps} />
        </AdminLayout>
      ) : (
        <MainLayout>
          <Component {...pageProps} />
        </MainLayout>
      )}
    </div>
  )
}

export default appWithTranslation(MyApp)

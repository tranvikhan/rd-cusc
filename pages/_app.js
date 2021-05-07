import Layout from '../components/Layout/main_layout'
import 'antd/dist/antd.css'
import '../styles/globals.css'

import 'animate.css/animate.min.css'

import { appWithTranslation } from 'next-i18next'

function MyApp({ Component, pageProps }) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  )
}

export default appWithTranslation(MyApp)

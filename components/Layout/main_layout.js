import { BackTop } from 'antd'
import TopNavigation from '../Navigation/top_navigation'
import Footer from './footer'

export default function MainLayout({ children }) {
  return (
    <>
      <TopNavigation />
      <div className="min-h-screen"> {children}</div>

      <Footer />
      <BackTop />
    </>
  )
}

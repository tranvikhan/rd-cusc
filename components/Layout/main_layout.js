import { BackTop } from 'antd'
import TopNavigation from '../Navigation/top_navigation'
import Footer from './footer'

export default function MainLayout({ children }) {
  return (
    <div>
      <TopNavigation />
      {children}
      <Footer />
      <BackTop />
    </div>
  )
}

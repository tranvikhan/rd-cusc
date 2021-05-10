import TopNavigation from '../Navigation/top_navigation'
import Footer from './footer'
import { useRouter } from 'next/router'

export default function MainLayout({ children }) {
  return (
    <div>
      <TopNavigation />
      {children}
      <Footer />
    </div>
  )
}

import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { LoadingOutlined } from '@ant-design/icons'
const useUser = () => ({ user: 'Khan', loading: false })
export default function AdminHome() {
  const { user, loading } = useUser()
  const router = useRouter()
  useEffect(() => {
    if (!(user || loading)) {
      router.push('/admin/auth/login')
    } else {
      router.push('/admin/dashboard')
    }
  }, [user, loading])
  return (
    <div className="flex h-screen justify-center items-center">
      <div className="flex w-8 h-8 bg-blue-100 text-blue-500 rounded-full justify-center items-center mr-4">
        <LoadingOutlined />
      </div>
      Đang chuyển trang ...
    </div>
  )
}

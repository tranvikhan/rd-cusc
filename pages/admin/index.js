import { LoadingOutlined } from '@ant-design/icons'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
export default function AdminHome() {
  const router = useRouter()
  useEffect(() => {
    router.replace('/admin/auth/login')
  }, [])
  return (
    <div className="flex h-screen justify-center items-center">
      <div className="flex w-8 h-8 bg-blue-100 text-blue-500 rounded-full justify-center items-center mr-4">
        <LoadingOutlined />
      </div>
      Đang chuyển trang ...
    </div>
  )
}

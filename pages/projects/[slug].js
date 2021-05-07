import { useRouter } from 'next/router'
export default function Projects() {
  const router = useRouter()
  return <div>{JSON.stringify(router.pathname)}</div>
}

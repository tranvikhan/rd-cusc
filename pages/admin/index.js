import dynamic from 'next/dynamic'
import WebHead from '../../components/Layout/head'
import Header from '../../components/Layout/header'
const BasicDemo = dynamic(() => import('../../components/Editor'), {
  ssr: false,
})
export default function index() {
  return (
    <article>
      <WebHead title="ADMIN" pageTitle="ADMIN" description="ADMIN" />
      <Header></Header>
      <BasicDemo />
    </article>
  )
}

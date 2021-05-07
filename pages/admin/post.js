import dynamic from 'next/dynamic'
import React from 'react'
import Container from '../../components/Layout/container'
import Header from '../../components/Layout/header'
import WebHead from '../../components/Layout/head'
const MyEditor = dynamic(() => import('../../components/Editor/index'), {
  ssr: false,
})

export default function PostEditor() {
  return (
    <article>
      <WebHead
        title="R&D | CUSC"
        pageTitle="Nhóm nghiên cứu và phát triển | CUSC"
        description="Website nhóm R&D - Trung tâm công nghệ phần mềm Đại học Cần Thơ"
      />
      <Header></Header>
      <section className="py-10 bg-white">
        <Container>
          <MyEditor />
        </Container>
      </section>
    </article>
  )
}

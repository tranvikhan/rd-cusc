import React from 'react'
import Container from '../components/Layout/container'
import Header from '../components/Layout/header'
import WebHead from '../components/Layout/head'
import { useRouter } from 'next/router'

export default function About() {
  const router = useRouter()
  return (
    <article>
      <WebHead
        title={
          router.locale === 'vi' ? 'Không tìm thấy trang' : 'Page not found'
        }
        pageTitle={
          router.locale === 'vi' ? 'Không tìm thấy trang' : 'Page not found'
        }
        description={
          router.locale === 'vi'
            ? 'Lỗi không tìm thấy trang'
            : 'Error is page not found'
        }
      />
      <Header></Header>
      <section className="bg-white py-10">
        <Container>
          <div className="h-96 flex flex-col space-y-4 justify-center items-center text-xl">
            <h1>
              {router.locale === 'vi'
                ? '404 | Không tìm thấy trang'
                : '404 | Page not found'}
            </h1>
            <img
              src="/assets/img/404 Page Not Found _Two Color.svg"
              alt="Page not found"
            />
          </div>
        </Container>
      </section>
    </article>
  )
}

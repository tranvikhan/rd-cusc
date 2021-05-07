import React from 'react'
import Container from '../../components/Layout/container'
import Header from '../../components/Layout/header'
import Link from 'next/link'
import WebHead from '../../components/Layout/head'
import { Pagination } from '@material-ui/lab'

import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useTranslation } from 'next-i18next'

export const getStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, ['projects'])),
  },
})

export default function Projects() {
  const { t } = useTranslation('projects')
  return (
    <article>
      <WebHead
        title={t('title')}
        pageTitle={t('title')}
        description={t('description')}
      />
      <Header>
        <Container>
          <div className="pb-8">
            <NewProject
              href="/news/123456"
              imageURL="/assets/img/famer.jpg"
              title="Dự án nông nghiệp thông minh"
              content="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
              author={{
                avatar: '/assets/img/users/thViet.jpg',
                name: 'Trần Hoàng Việt',
              }}
              createAt="04/05/2021"
            />
          </div>
        </Container>
      </Header>

      <section className="bg-white py-10">
        <Container>
          <h1 className="text-2xl leading-8 font-extrabold text-black mb-1">
            {t('session1.h1')}
          </h1>
          <h3 className="text-base leading-6 font-semibold tracking-wide lg:w-2/4">
            {t('session1.p')}
          </h3>
          <div className="grid lg:grid-cols-4 gap-8  grid-cols-2 mt-10 ">
            <ProjectItem
              href="/"
              imageURL="/assets/img/news/5457306_cover_hinh_anh_ro_net_Galaxy_Z_Flip_3_tinhte.jpg"
              title="Thêm hình ảnh rò rỉ rõ nét về Galaxy Z Flip 3?"
              author={{
                avatar: '/assets/img/users/thViet.jpg',
                name: 'Trần Hoàng Việt',
              }}
              createAt="04/05/2021"
            />
            <ProjectItem
              href="/"
              imageURL="/assets/img/news/5456237_Cover_Nvidia.jpg"
              title="Lộ thông tin GeForce RTX 3080 Ti, công bố ngày 31/05, bán ra trong tháng 6"
              author={{
                avatar: '/assets/img/users/thViet.jpg',
                name: 'Trần Hoàng Việt',
              }}
              createAt="04/05/2021"
            />
            <ProjectItem
              href="/"
              imageURL="/assets/img/news/5457092_cover.jpg"
              title="Trên tay AirTag: tìm rất chính xác"
              author={{
                avatar: '/assets/img/users/thViet.jpg',
                name: 'Trần Hoàng Việt',
              }}
              createAt="04/05/2021"
            />
            <ProjectItem
              href="/"
              imageURL="/assets/img/news/5455999_cover_chuphinh_realme8pro_tinhte.jpg"
              title="Ngày nghỉ lễ của mình, chụp bằng realme 8 & realme 8 Pro"
              author={{
                avatar: '/assets/img/users/thViet.jpg',
                name: 'Trần Hoàng Việt',
              }}
              createAt="04/05/2021"
            />
            <ProjectItem
              href="/"
              imageURL="/assets/img/news/5456237_Cover_Nvidia.jpg"
              title="Lộ thông tin GeForce RTX 3080 Ti, công bố ngày 31/05, bán ra trong tháng 6"
              author={{
                avatar: '/assets/img/users/thViet.jpg',
                name: 'Trần Hoàng Việt',
              }}
              createAt="04/05/2021"
            />
            <ProjectItem
              href="/"
              imageURL="/assets/img/news/5456237_Cover_Nvidia.jpg"
              title="Lộ thông tin GeForce RTX 3080 Ti, công bố ngày 31/05, bán ra trong tháng 6"
              author={{
                avatar: '/assets/img/users/thViet.jpg',
                name: 'Trần Hoàng Việt',
              }}
              createAt="04/05/2021"
            />
            <ProjectItem
              href="/"
              imageURL="/assets/img/news/5456237_Cover_Nvidia.jpg"
              title="Lộ thông tin GeForce RTX 3080 Ti, công bố ngày 31/05, bán ra trong tháng 6"
              author={{
                avatar: '/assets/img/users/thViet.jpg',
                name: 'Trần Hoàng Việt',
              }}
              createAt="04/05/2021"
            />
            <ProjectItem
              href="/"
              imageURL="/assets/img/news/5457306_cover_hinh_anh_ro_net_Galaxy_Z_Flip_3_tinhte.jpg"
              title="Thêm hình ảnh rò rỉ rõ nét về Galaxy Z Flip 3?"
              author={{
                avatar: '/assets/img/users/thViet.jpg',
                name: 'Trần Hoàng Việt',
              }}
              createAt="04/05/2021"
            />
          </div>
          <div className="pt-8 flex items-center justify-center">
            <Pagination count={10} shape="rounded" />
          </div>
        </Container>
      </section>
    </article>
  )
}

const NewProject = (props) => (
  <div className="grid lg:grid-cols-2 gap-0  grid-cols-1 mt-10 ">
    <div className="flex flex-col justify-center lg:p-8 p-0 py-8">
      <h1 className="text-white text-xl leading-7 font-bold">
        <Link href={props.href}>{props.title}</Link>
      </h1>
      <div className="flex flex-row items-center py-2">
        <img
          src={props.author.avatar}
          alt={props.author.name}
          className="object-cover h-8 w-8  rounded-full shadow-lg mr-2 border bg-purple-50"
        />
        <h3 className="text-blue-50 text-sm font-medium py-1">
          {props.author.name}
        </h3>
      </div>

      <p className="text-indigo-300 text-sm leading-5 font-medium mt-1">
        {props.content}
      </p>
    </div>

    <img
      src={props.imageURL}
      alt="boss"
      className="object-cover lg:h-80 h-64 w-full rounded-lg  shadow-lg"
    />
  </div>
)

const ProjectItem = (props) => (
  <div>
    <img
      src={props.imageURL}
      alt="boss"
      className="object-cover h-40 w-full rounded-lg  shadow-lg"
    />

    <div className="flex flex-col justify-center lg:py-0 p-0 py-4">
      <div className="flex flex-row items-center py-2 justify-between">
        <div className="flex flex-row items-center">
          <img
            src={props.author.avatar}
            alt={props.author.name}
            className="object-cover h-8 w-8  rounded-full shadow-lg mr-2 border bg-blue-300"
          />
          <h3 className="text-gray-600 text-sm font-medium py-1">
            {props.author.name}
          </h3>
        </div>

        <span className="text-gray-500 text-xs leading-5 font-medium mt-1">
          {props.createAt}
        </span>
      </div>
      <h1 className="text-black text-base leading-6 font-bold ">
        <Link href={props.href}>{props.title}</Link>
      </h1>
    </div>
  </div>
)

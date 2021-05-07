import React from 'react'
import Container from '../../components/Layout/container'
import Header from '../../components/Layout/header'
import Link from 'next/link'
import WebHead from '../../components/Layout/head'

import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useTranslation } from 'next-i18next'
import { Pagination } from 'antd'

export const getStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, ['news'])),
  },
})

export default function News() {
  const { t } = useTranslation('news')
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
            <NewPost
              href="/news/123456"
              imageURL="/assets/img/news/5456237_Cover_Nvidia.jpg"
              title="Lộ thông tin GeForce RTX 3080 Ti, công bố ngày 31/05, bán ra trong tháng 6"
              content="Trước đây có tin đồn là những chiếc card đồ họa RTX 3000 series bản nâng cấp sẽ được ra mắt vào ngày 18/05, với chiếc RTX 3080 Ti và 3070 Ti. Tuy nhiên theo nguồn tin mà Overclocking.com dẫn lại, thì ngày ra mắt đã bị dời sang ngày 31/05, và sẽ bán ra vào tháng 06 tới. Cụ thể hơn, RTX 3080 Ti sẽ bán vào ngày 02/06, và RTX 3070 Ti sẽ bán vào ngày 09/06. Không rõ lý do vì sao Nvidia dời ngày ra mắt hai chiếc card đồ họa cao cấp này, nhưng cũng cần nhớ là cái ngày 18/05 kể trên cũng chưa được Nvidia xác nhận chính thức."
              author={{
                avatar: '/assets/img/users/thViet.jpg',
                name: 'Trần Hoàng Việt',
              }}
              createAt="04/05/2021"
            />
          </div>
        </Container>
      </Header>
      <section className="bg-blue-100 py-10">
        <Container>
          <h1 className="text-2xl leading-8 font-extrabold text-black mb-1">
            {t('session1.h1')}
          </h1>
          {/*  <h3 className="text-base leading-6 font-semibold tracking-wide ">
            Chúng tôi có đội ngũ các thành viên chuyên môn trong nhiều lĩnh vực
            như: Ai, BigData, IoT, Data Transformation,...
          </h3> */}
          <div className="grid lg:grid-cols-4 gap-8  grid-cols-2 mt-10 ">
            <PostItem
              href="/"
              imageURL="/assets/img/news/5456237_Cover_Nvidia.jpg"
              title="Lộ thông tin GeForce RTX 3080 Ti, công bố ngày 31/05, bán ra trong tháng 6"
              author={{
                avatar: '/assets/img/users/thViet.jpg',
                name: 'Trần Hoàng Việt',
              }}
              createAt="04/05/2021"
            />
            <PostItem
              href="/"
              imageURL="/assets/img/news/5457092_cover.jpg"
              title="Trên tay AirTag: tìm rất chính xác"
              author={{
                avatar: '/assets/img/users/thViet.jpg',
                name: 'Trần Hoàng Việt',
              }}
              createAt="04/05/2021"
            />
            <PostItem
              href="/"
              imageURL="/assets/img/news/5455999_cover_chuphinh_realme8pro_tinhte.jpg"
              title="Ngày nghỉ lễ của mình, chụp bằng realme 8 & realme 8 Pro"
              author={{
                avatar: '/assets/img/users/thViet.jpg',
                name: 'Trần Hoàng Việt',
              }}
              createAt="04/05/2021"
            />
            <PostItem
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
        </Container>
      </section>
      <section className="bg-white py-10">
        <Container>
          <h1 className="text-2xl leading-8 font-extrabold text-black mb-1">
            {t('session2.h1')}
          </h1>
          {/*  <h3 className="text-base leading-6 font-semibold tracking-wide ">
            Chúng tôi có đội ngũ các thành viên chuyên môn trong nhiều lĩnh vực
            như: Ai, BigData, IoT, Data Transformation,...
          </h3> */}
          <div className="grid lg:grid-cols-4 gap-8  grid-cols-2 mt-10 ">
            <PostItem
              href="/"
              imageURL="/assets/img/news/5457306_cover_hinh_anh_ro_net_Galaxy_Z_Flip_3_tinhte.jpg"
              title="Thêm hình ảnh rò rỉ rõ nét về Galaxy Z Flip 3?"
              author={{
                avatar: '/assets/img/users/thViet.jpg',
                name: 'Trần Hoàng Việt',
              }}
              createAt="04/05/2021"
            />
            <PostItem
              href="/"
              imageURL="/assets/img/news/5456237_Cover_Nvidia.jpg"
              title="Lộ thông tin GeForce RTX 3080 Ti, công bố ngày 31/05, bán ra trong tháng 6"
              author={{
                avatar: '/assets/img/users/thViet.jpg',
                name: 'Trần Hoàng Việt',
              }}
              createAt="04/05/2021"
            />
            <PostItem
              href="/"
              imageURL="/assets/img/news/5457092_cover.jpg"
              title="Trên tay AirTag: tìm rất chính xác"
              author={{
                avatar: '/assets/img/users/thViet.jpg',
                name: 'Trần Hoàng Việt',
              }}
              createAt="04/05/2021"
            />
            <PostItem
              href="/"
              imageURL="/assets/img/news/5455999_cover_chuphinh_realme8pro_tinhte.jpg"
              title="Ngày nghỉ lễ của mình, chụp bằng realme 8 & realme 8 Pro"
              author={{
                avatar: '/assets/img/users/thViet.jpg',
                name: 'Trần Hoàng Việt',
              }}
              createAt="04/05/2021"
            />
            <PostItem
              href="/"
              imageURL="/assets/img/news/5456237_Cover_Nvidia.jpg"
              title="Lộ thông tin GeForce RTX 3080 Ti, công bố ngày 31/05, bán ra trong tháng 6"
              author={{
                avatar: '/assets/img/users/thViet.jpg',
                name: 'Trần Hoàng Việt',
              }}
              createAt="04/05/2021"
            />
            <PostItem
              href="/"
              imageURL="/assets/img/news/5456237_Cover_Nvidia.jpg"
              title="Lộ thông tin GeForce RTX 3080 Ti, công bố ngày 31/05, bán ra trong tháng 6"
              author={{
                avatar: '/assets/img/users/thViet.jpg',
                name: 'Trần Hoàng Việt',
              }}
              createAt="04/05/2021"
            />
            <PostItem
              href="/"
              imageURL="/assets/img/news/5456237_Cover_Nvidia.jpg"
              title="Lộ thông tin GeForce RTX 3080 Ti, công bố ngày 31/05, bán ra trong tháng 6"
              author={{
                avatar: '/assets/img/users/thViet.jpg',
                name: 'Trần Hoàng Việt',
              }}
              createAt="04/05/2021"
            />
            <PostItem
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
            <Pagination defaultCurrent={1} total={50} />
          </div>
        </Container>
      </section>
      <section className="bg-white py-10">
        <Container>
          <h1 className="text-2xl leading-8 font-extrabold text-black mb-1">
            {t('session3.h1')}
          </h1>
          {/*  <h3 className="text-base leading-6 font-semibold tracking-wide ">
            Chúng tôi có đội ngũ các thành viên chuyên môn trong nhiều lĩnh vực
            như: Ai, BigData, IoT, Data Transformation,...
          </h3> */}
          <div className="grid lg:grid-cols-4 gap-8  grid-cols-2 mt-10 ">
            <PostItem
              href="/"
              imageURL="/assets/img/news/5456237_Cover_Nvidia.jpg"
              title="Lộ thông tin GeForce RTX 3080 Ti, công bố ngày 31/05, bán ra trong tháng 6"
              author={{
                avatar: '/assets/img/users/thViet.jpg',
                name: 'Trần Hoàng Việt',
              }}
              createAt="04/05/2021"
            />
            <PostItem
              href="/"
              imageURL="/assets/img/news/5456237_Cover_Nvidia.jpg"
              title="Lộ thông tin GeForce RTX 3080 Ti, công bố ngày 31/05, bán ra trong tháng 6"
              author={{
                avatar: '/assets/img/users/thViet.jpg',
                name: 'Trần Hoàng Việt',
              }}
              createAt="04/05/2021"
            />
            <PostItem
              href="/"
              imageURL="/assets/img/news/5456237_Cover_Nvidia.jpg"
              title="Lộ thông tin GeForce RTX 3080 Ti, công bố ngày 31/05, bán ra trong tháng 6"
              author={{
                avatar: '/assets/img/users/thViet.jpg',
                name: 'Trần Hoàng Việt',
              }}
              createAt="04/05/2021"
            />
            <PostItem
              href="/"
              imageURL="/assets/img/news/5456237_Cover_Nvidia.jpg"
              title="Lộ thông tin GeForce RTX 3080 Ti, công bố ngày 31/05, bán ra trong tháng 6"
              author={{
                avatar: '/assets/img/users/thViet.jpg',
                name: 'Trần Hoàng Việt',
              }}
              createAt="04/05/2021"
            />
            <PostItem
              href="/"
              imageURL="/assets/img/news/5456237_Cover_Nvidia.jpg"
              title="Lộ thông tin GeForce RTX 3080 Ti, công bố ngày 31/05, bán ra trong tháng 6"
              author={{
                avatar: '/assets/img/users/thViet.jpg',
                name: 'Trần Hoàng Việt',
              }}
              createAt="04/05/2021"
            />
            <PostItem
              href="/"
              imageURL="/assets/img/news/5456237_Cover_Nvidia.jpg"
              title="Lộ thông tin GeForce RTX 3080 Ti, công bố ngày 31/05, bán ra trong tháng 6"
              author={{
                avatar: '/assets/img/users/thViet.jpg',
                name: 'Trần Hoàng Việt',
              }}
              createAt="04/05/2021"
            />
            <PostItem
              href="/"
              imageURL="/assets/img/news/5456237_Cover_Nvidia.jpg"
              title="Lộ thông tin GeForce RTX 3080 Ti, công bố ngày 31/05, bán ra trong tháng 6"
              author={{
                avatar: '/assets/img/users/thViet.jpg',
                name: 'Trần Hoàng Việt',
              }}
              createAt="04/05/2021"
            />
            <PostItem
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
            <Pagination defaultCurrent={1} total={100} />
          </div>
        </Container>
      </section>
    </article>
  )
}

const NewPost = (props) => (
  <div className="grid lg:grid-cols-2 gap-0  grid-cols-1 mt-10 ">
    <img
      src={props.imageURL}
      alt="boss"
      className="object-cover lg:h-80 h-64 w-full rounded-lg  shadow-lg"
    />

    <div className="flex flex-col justify-center lg:p-8 p-0 py-8">
      <span className="text-gray-200 text-sm leading-5 font-medium mt-1">
        {props.createAt}
      </span>

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
  </div>
)

const PostItem = (props) => (
  <div>
    <img
      src={props.imageURL}
      alt="boss"
      className="object-cover h-40 w-full rounded-lg  shadow-lg"
    />

    <div className="flex flex-col justify-center lg:py-0 p-0 py-2">
      <div className="flex flex-row items-center lg:py-2 py-0 justify-between flex-wrap-reverse">
        <div className="flex flex-row items-center ">
          <img
            src={props.author.avatar}
            alt={props.author.name}
            className="object-cover h-8 w-8  rounded-full shadow-lg mr-2 border bg-blue-300"
          />
          <h3 className="text-gray-600 text-sm font-medium py-1">
            {props.author.name}
          </h3>
        </div>

        <span className="text-gray-500 text-xs leading-5 font-medium mt-1  lg:mb-0 mb-1">
          {props.createAt}
        </span>
      </div>
      <h1 className="text-black text-base leading-6 font-bold ">
        <Link href={props.href}>{props.title}</Link>
      </h1>
    </div>
  </div>
)

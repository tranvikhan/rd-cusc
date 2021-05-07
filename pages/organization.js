import React from 'react'
import Container from '../components/Layout/container'
import Header from '../components/Layout/header'
import Link from 'next/link'
import WebHead from '../components/Layout/head'

import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useTranslation } from 'next-i18next'

export const getStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, ['organization'])),
  },
})

export default function Home() {
  const { t } = useTranslation('organization')
  return (
    <article>
      <WebHead
        title={t('title')}
        pageTitle={t('title')}
        description={t('description')}
      />
      <Header>
        <Container>
          <div className="mt-10 lg:w-2/4 w-full lg:pr-20 pr-0">
            <h1 className=" mb-2 text-white text-2xl leading-8 font-extrabold">
              {t('session1.h1')}
            </h1>
            <p className="text-white text-base leading-6 font-normal ">
              {t('session1.p')}
            </p>
          </div>
          <div class="grid lg:grid-cols-3 gap-8 md:grid-cols-2  grid-cols-1 mt-10  lg:mb-20 mb-8">
            <CatoryView
              imageURL="/assets/img/svg_icons/Solution.svg"
              title={t('card1.h1')}
              content={t('card1.p')}
            />

            <CatoryView
              imageURL="/assets/img/svg_icons/React.svg"
              title={t('card2.h1')}
              content={t('card2.p')}
            />
            <CatoryView
              imageURL="/assets/img/svg_icons/Chart.svg"
              title={t('card3.h1')}
              content={t('card3.p')}
            />
          </div>
        </Container>
      </Header>
      <section className="bg-blue-100 py-10">
        <Container>
          <h1 className="text-2xl leading-8 font-extrabold text-black mb-1">
            {t('session2.h1')}
          </h1>
          <h3 className="text-base leading-6 font-semibold tracking-wide lg:w-2/4">
            {t('session2.p')}
          </h3>

          <CardBossView
            imageURL="/assets/img/users/thViet.jpg"
            name="Trần Hoàng Việt"
            role="Trưởng nhóm R&D"
            link={{ facebook: '/', linkedin: '/' }}
            introduce="Odio nisi, lectus dis nulla. Ultrices maecenas vitae rutrum
                dolor ultricies donec risus sodales. Tempus quis et. Odio nisi,
                lectus dis nulla. Ultrices maecenas vitae rutrum dolor ultricies
                donec risus sodales. Tempus quis et."
          />

          <div class="grid lg:grid-cols-3 gap-8  grid-cols-1 mt-10 ">
            <CardTeamView
              imageURL="/assets/img/users/lhPhat.jpg"
              name="Lê Hữu Phát "
              role="Thành viên phụ trách Server System"
              link={{ facebook: '/', linkedin: '/' }}
            />
            <CardTeamView
              imageURL="/assets/img/users/dhNghia.jpg"
              name="Đặng Hiếu Nghĩa"
              role="Thành viên phụ trách Ai, Big Data"
              link={{ facebook: '/', linkedin: '/' }}
            />

            <CardTeamView
              imageURL="/assets/img/users/tvKhan.jpg"
              name="Trần Vi Khan"
              role="Thành viên phụ trách IoT"
              link={{ facebook: '/', linkedin: '/' }}
            />
          </div>
        </Container>
      </section>
    </article>
  )
}

const CardBossView = (props) => (
  <div className="grid lg:grid-cols-2 gap-0  grid-cols-1 mt-10 ">
    <img
      src={props.imageURL}
      alt="boss"
      className="object-cover h-80 w-full rounded-lg  shadow-lg"
    />

    <div className="flex flex-col justify-center lg:p-8 p-0 py-8">
      <h1 className="text-black text-lg leading-7 font-bold">{props.name}</h1>
      <h1 className="text-indigo-600 text-base font-medium py-1">
        {props.role}
      </h1>
      <SocialLink
        facebook={props.link.facebook}
        linkedin={props.link.linkedin}
      />
      <p className="text-gray-800 text-sm leading-5 font-medium mt-1">
        {props.introduce}
      </p>
    </div>
  </div>
)

const SocialLink = (props) => (
  <div className="flex flex-row space-x-4 py-2">
    <Link href={props.facebook}>
      <img src="/assets/img/svg_icons/fbIcon.svg" className="cursor-pointer" />
    </Link>
    <Link href={props.linkedin}>
      <img
        src="/assets/img/svg_icons/linkedinIcon.svg"
        className="cursor-pointer"
      />
    </Link>
  </div>
)

const CardTeamView = (props) => (
  <div className="">
    <img
      src={props.imageURL}
      alt="team"
      className="object-cover h-60 w-full rounded-lg  shadow-lg"
    />
    <div className="py-8">
      <h1 className="text-black text-lg leading-7 font-bold">{props.name}</h1>
      <h1 className="text-indigo-600 text-base font-medium py-1">
        {props.role}
      </h1>
      <SocialLink
        facebook={props.link.facebook}
        linkedin={props.link.linkedin}
      />
    </div>
  </div>
)

const CatoryView = (props) => (
  <div className="rounded-lg p-4 border border-white cursor-pointer hover:bg-indigo-600 transition duration-500 ease-in-out ">
    <img src={props.imageURL} alt="catory" />
    <h1 className="my-2 text-white text-lg leading-7 font-bold">
      {props.title}
    </h1>
    <p className="text-white text-sm leading-5 font-medium ">{props.content}</p>
  </div>
)

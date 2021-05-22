import React from 'react'

import Container from '../../components/Layout/container'
import Header from '../../components/Layout/header'
import Link from 'next/link'
import WebHead from '../../components/Layout/head'

import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useTranslation } from 'next-i18next'
import {
  FiMap,
  FiPhoneCall,
  FiMail,
  FiCalendar,
  FiUser,
  FiGlobe,
  FiBriefcase,
} from 'react-icons/fi'
export const getServerSideProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, ['organization'])),
  },
})

export default function Home() {
  const { t } = useTranslation('organization')
  return (
    <article>
      <WebHead
        image="/assets/img/users/thViet.jpg"
        title="Trần Hoàng Việt"
        pageTitle="Trần Hoàng Việt"
        description="Trưởng nhóm R&D"
      />
      <Header className="transform  -translate-y-16">
        <Container className="transform  -translate-y-16 ">
          <div
            id="map"
            className="flex flex-row items-center justify-center space-x-8 rounded-lg   transform   xl:translate-y-32 lg:translate-y-44 translate-y-32 bg-transparent"
          >
            <div className="rounded-full  shadow-xl bg-white p-1">
              <img
                src="/assets/img/users/thViet.jpg"
                alt="Trần Hoàng Việt"
                className="rounded-full  h-40 w-40 object-cover"
              />
            </div>
          </div>
        </Container>
      </Header>
      <section className="bg-white-100 ">
        <Container>
          <div className="flex flex-col justify-center items-center">
            <h1 className="text-gray-800 text-3xl  font-bold">
              Trần Hoàng Việt
            </h1>
            <h3 className="text-blue-600  font-semibold text-lg">
              Trưởng nhóm R&D
            </h3>
            <p className="text-gray-600  font-semibold text-center lg:px-48 px-8">
              Odio nisi, lectus dis nulla. Ultrices maecenas vitae rutrum dolor
              ultricies donec risus sodales. Tempus quis et. Odio nisi, lectus
              dis nulla. Ultrices maecenas vitae rutrum dolor ultricies donec
              risus sodales. Tempus quis et.
            </p>
          </div>
        </Container>
      </section>
      <section className="bg-white-100  pb-20">
        <Container>
          <div className="grid lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-1 lg:gap-8 gap-4">
            <ContactItem icon={<FiUser size={30} />} text="Nam" />
            <ContactItem icon={<FiGlobe size={30} />} text="Viet Nam" />
            <ContactItem icon={<FiCalendar size={30} />} text="01/01/1990" />

            <ContactItem
              icon={<FiPhoneCall size={30} />}
              text="+84 939 0000 97"
              href="+84 939 0000 97"
            />

            <ContactItem
              icon={<FiMail size={30} />}
              text="thviet@ctu.edu.vn"
              href="thviet@ctu.edu.vn"
            />
            <ContactItem icon={<FiMap size={30} />} text="Cần thơ" />
            <ContactItem icon={<FiBriefcase size={30} />} text="CV" href="#" />
          </div>
        </Container>
      </section>
    </article>
  )
}
const ContactItem = (props) => (
  <div className="flex flex-row text-base font-normal text-gray-900 bg-blue-100 p-4 rounded space-x-4 items-center transition duration-200 ease-in-out hover:shadow-lg">
    <div className="flex"> {props.icon}</div>
    <div>
      {props.href ? (
        <Link href={props.href}>
          <span className="text-gray-900 cursor-pointer">{props.text}</span>
        </Link>
      ) : (
        props.text
      )}
    </div>
  </div>
)

import React from 'react'

import Container from '../components/Layout/container'
import Header from '../components/Layout/header'
import Link from 'next/link'
import WebHead from '../components/Layout/head'

import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useTranslation } from 'next-i18next'
import dynamic from 'next/dynamic'
import { FiMap, FiPhoneCall, FiMail } from 'react-icons/fi'
import { addFeedbackAPI } from '../axios/feedback'
import { message } from 'antd'
import { useRouter } from 'next/router'
const MapWithNoSSR = dynamic(() => import('../components/Map'), {
  ssr: false,
})

export const getServerSideProps = async (props) => ({
  props: {
    ...(await serverSideTranslations(props.locale, ['contact'])),
  },
})

export default function Contact() {
  const { t } = useTranslation('contact')

  return (
    <article>
      <WebHead
        title={t('title')}
        pageTitle={t('title')}
        description={t('description')}
      />
      <Header className="transform  -translate-y-16">
        <Container className="transform  -translate-y-16">
          <div
            id="map"
            className="lg:h-96 h-72  rounded-lg  shadow-xl  transform   xl:translate-y-32 lg:translate-y-44 translate-y-32 p-2 bg-white"
          >
            <MapWithNoSSR
              popupText={
                <>
                  <strong>{t('mapMaker.h1')}</strong>
                  <br /> {t('mapMaker.p')}
                </>
              }
            />
          </div>
        </Container>
      </Header>
      <section className="bg-white py-10">
        <Container>
          <div className="grid lg:grid-cols-2 gap-8 md:grid-cols-1  grid-cols-1 ">
            <div className="flex flex-col bg-blue-50 p-10 rounded space-y-6">
              <Heading1>{t('contact.h1')}</Heading1>

              <ContactItem
                icon={<FiPhoneCall size={20} />}
                text={t('contact.phone.text')}
                href={t('contact.phone.link')}
              />

              <ContactItem
                icon={<FiMail size={20} />}
                text={t('contact.email.text')}
                href={t('contact.email.link')}
              />
              <ContactItem
                icon={<FiMap size={20} />}
                text={t('contact.address.text')}
                href={t('contact.address.link')}
              />
            </div>
            <ContactForm
              title={t('contactForm.h1')}
              placeholderName={t('contactForm.name')}
              placeholderEmail={t('contactForm.email')}
              placeholderContent={t('contactForm.content')}
              sub={t('contactForm.sub')}
              btnSubmitText={t('contactForm.btnSubmitText')}
            />
          </div>
        </Container>
      </section>
    </article>
  )
}
const ContactItem = (props) => (
  <div className="flex flex-row text-base font-normal text-gray-900">
    <div className="flex pr-4"> {props.icon}</div>
    <div>
      <Link href={props.href}>
        <span className="text-gray-900 cursor-pointer">{props.text}</span>
      </Link>
    </div>
  </div>
)
const Heading1 = ({ children }) => (
  <h1 className="text-xl font-bold text-black mb-4">{children}</h1>
)

const ContactForm = (props) => {
  const [name, setName] = React.useState('')
  const [email, setEmail] = React.useState('')
  const [content, setContent] = React.useState('')
  const [loading, setLoading] = React.useState(false)
  const router = useRouter()
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        setLoading(true)
        addFeedbackAPI({
          name: name,
          type: 'contact',
          content: content,
          email: email,
        })
          .then((res) => {
            setLoading(false)
            message.success(
              router.locale === 'vi'
                ? res.message
                : 'Send message successfully',
              2
            )
            setEmail('')
            setName('')
            setContent('')
          })
          .catch((err) => {
            setLoading(false)
            message.error(
              router.locale === 'vi'
                ? err.info
                : 'You have submitted this form before',
              2
            )
          })
      }}
    >
      <div className="flex flex-col bg-white p-10 rounded shadow space-y-6">
        <h1 className="text-xl font-bold text-black "> {props.title}</h1>

        <div className="flex flex-col space-y-1">
          <input
            type="text"
            name="name"
            id="name"
            required
            value={name}
            onChange={(e) => {
              setName(e.target.value)
              e.preventDefault()
            }}
            className="border-2 rounded px-3 py-2 w-full focus:outline-none focus:border-blue-400 focus:shadow"
            placeholder={props.placeholderName}
          />
        </div>

        <div className="flex flex-col space-y-1">
          <input
            type="email"
            name="email"
            id="email"
            required
            value={email}
            onChange={(e) => {
              setEmail(e.target.value)
              e.preventDefault()
            }}
            className="border-2 rounded px-3 py-2 w-full focus:outline-none focus:border-blue-400 focus:shadow"
            placeholder={props.placeholderEmail}
          />
        </div>
        <div className="flex flex-col space-y-1">
          <textarea
            name="content"
            id="content"
            value={content}
            onChange={(e) => {
              setContent(e.target.value)
              e.preventDefault()
            }}
            className="border-2 rounded px-3 py-2 w-full focus:outline-none focus:border-indigo-500 focus:shadow"
            placeholder={props.placeholderContent}
          />
        </div>

        <div className="flex flex-col-reverse sm:flex-row sm:justify-between items-center">
          <span
            href="#"
            className="text-sm inline-block text-gray-500 lg:w-3/5  lg:mt-0 mt-2"
          >
            {props.sub}
          </span>
          <button
            type="submit"
            className="inline-flex lg:w-auto w-full bg-indigo-600 text-white font-bold px-4 py-2 rounded focus:outline-none shadow hover:bg-blue-700 transition-colors"
          >
            {loading && (
              <svg
                class="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  class="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  stroke-width="4"
                ></circle>
                <path
                  class="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
            )}
            {props.btnSubmitText}
          </button>
        </div>
      </div>
    </form>
  )
}

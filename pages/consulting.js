import React from 'react'

import Container from '../components/Layout/container'
import Header from '../components/Layout/header'

import WebHead from '../components/Layout/head'

import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
import { addFeedbackAPI } from '../axios/feedback'
import { message } from 'antd'

export const getServerSideProps = async (props) => ({
  props: {
    ...(await serverSideTranslations(props.locale, ['consulting'])),
  },
})

export default function Contact() {
  const { t } = useTranslation('consulting')

  return (
    <article>
      <WebHead
        title={t('title')}
        pageTitle={t('title')}
        description={t('description')}
      />
      <Header className="transform  -translate-y-16">
        <Container className="transform  -translate-y-16">
          <div className="w-full p-2 rounded-lg  shadow-xl  transform   xl:translate-y-32 lg:translate-y-44 translate-y-32  bg-white grid lg:grid-cols-2 grid-cols-1 gap-8 ">
            <div>
              <ContactForm
                title={t('contactForm.h1')}
                placeholderName={t('contactForm.name')}
                placeholderEmail={t('contactForm.email')}
                placeholderContent={t('contactForm.content')}
                sub={t('contactForm.sub')}
                btnSubmitText={t('contactForm.btnSubmitText')}
              />
            </div>
            <div className="lg:flex hidden justify-center items-center  rounded">
              <img
                className="w-4/5"
                src="assets/img/undraw_Live_collaboration_re_60ha.svg"
                alt="Heading image"
              />
            </div>
          </div>
        </Container>
      </Header>
      <section className="bg-white py-10">
        <Container>
          <h1 className="text-2xl leading-8 font-extrabold text-black mb-1">
            {t('session1.h1')}
          </h1>
          <h3 className="text-base leading-6 font-semibold tracking-wide lg:w-2/4 mb-8">
            {t('session1.description')}
          </h3>
          <div className="grid lg:grid-cols-4 md:grid-cols-2  grid-cols-1 gap-8">
            <ConsultingItem
              title={t('session1.card1')}
              imageURL="/assets/img/svg_icons/chip 1.svg"
            />
            <ConsultingItem
              title={t('session1.card2')}
              imageURL="/assets/img/svg_icons/exchange 1.svg"
            />
            <ConsultingItem
              title={t('session1.card3')}
              imageURL="/assets/img/svg_icons/link 1.svg"
            />
            <ConsultingItem
              title={t('session1.card4')}
              imageURL="/assets/img/svg_icons/server 1.svg"
            />
          </div>
        </Container>
      </section>
    </article>
  )
}

const ConsultingItem = (props) => (
  <div className="flex flex-row items-center space-x-4 p-4 rounded  bg-gray-500 hover:bg-indigo-800 hover:shadow-lg cursor-pointer transition duration-400 ease-in-out">
    <img src={props.imageURL} alt="catory" />
    <h1 className="my-2 text-white text-lg leading-7 font-bold">
      {props.title}
    </h1>
  </div>
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
          type: 'advisory',
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
      <div className="flex flex-col bg-white p-10  space-y-6">
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
            className="inline-flex lg:w-auto w-full bg-indigo-600 text-white font-bold px-2 py-2 rounded focus:outline-none shadow hover:bg-blue-700 transition-colors"
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

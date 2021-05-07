import React from 'react'
import Container from '../components/Layout/container'
import Header from '../components/Layout/header'
import WebHead from '../components/Layout/head'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useTranslation } from 'next-i18next'
import Link from 'next/link'
import ReactTooltip from 'react-tooltip'

export const getStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, ['home'])),
  },
})

export default function Home() {
  const { t } = useTranslation('home')
  return (
    <article>
      <WebHead
        title={t('title')}
        pageTitle={t('title')}
        description={t('description')}
      />
      <Header>
        <Container>
          <div className="flex flex-row justify-between pt-10">
            <div className="lg:pt-10 pt-0">
              <div className="flex flex-row">
                <CallOutAndText text={t('heading.btnBeauty')} />
              </div>

              <div className="pt-10 lg:pr-20 pr-0 ">
                <h1 className="text-white text-5xl font-extrabold tracking-wide leading-tight">
                  {t('heading.h1')}
                </h1>
                <p className="text-base text-blue-200 font-normal mt-5 border-0">
                  {t('heading.sub')}
                </p>
                <ContactForm
                  placeholder={t('heading.contactForm.placeholder')}
                  btnText={t('heading.contactForm.btnSubmit')}
                  sub={t('heading.contactForm.sub')}
                />
              </div>
            </div>
            <img
              className="mix-blend-luminosity xl:flex hidden"
              src="/assets/img/Illustration 2.svg"
            />
          </div>
          <div className="mt-10 lg:w-2/4 w-full lg:pr-20 pr-0">
            <h1 className=" mb-2 text-white text-2xl leading-8 font-extrabold">
              {t('heading.researchArea.h1')}
            </h1>
            <p className="text-white text-base leading-6 font-normal ">
              {t('heading.researchArea.p')}
            </p>
          </div>
          <div class="grid lg:grid-cols-4 gap-8 md:grid-cols-2  grid-cols-1 mt-10  lg:mb-20 mb-8">
            <CatoryView
              imageURL="/assets/img/svg_icons/chip 1.svg"
              title={t('heading.researchArea.card1.h1')}
              content={t('heading.researchArea.card1.p')}
            />

            <CatoryView
              imageURL="/assets/img/svg_icons/exchange 1.svg"
              title={t('heading.researchArea.card2.h1')}
              content={t('heading.researchArea.card2.p')}
            />
            <CatoryView
              imageURL="/assets/img/svg_icons/link 1.svg"
              title={t('heading.researchArea.card3.h1')}
              content={t('heading.researchArea.card3.p')}
            />
            <CatoryView
              imageURL="/assets/img/svg_icons/server 1.svg"
              title={t('heading.researchArea.card4.h1')}
              content={t('heading.researchArea.card4.p')}
            />
          </div>
        </Container>
      </Header>
      <section className="py-10 bg-blue-100">
        <Container>
          <div className="bg-white rounded-lg p-8 shadow-lg flex flex-row justify-between space-x-8">
            <div className="flex-1">
              <h3 className="text-base leading-6 tracking-wide uppercase mb-1">
                {t('session1.h3')}
              </h3>
              <h1 className="text-2xl leading-8 font-extrabold text-black">
                {t('session1.h1')}
              </h1>
              <p className="font-normal py-5 border-0 text-gray-800">
                {t('session1.p')}
              </p>
              <button className="bg-indigo-600 text-white font-bold px-5 py-2 rounded focus:outline-none shadow hover:bg-blue-700 transition-colors">
                {t('session1.btn')}
              </button>
            </div>
            <img
              src="/assets/img/Image Trailling.svg"
              alt="image"
              className="lg:flex-1 lg:flex hidden"
            />
          </div>
        </Container>
      </section>
      <section className="bg-blue-100 pb-10">
        <Container>
          <h3 className="text-base leading-6 font-semibold tracking-wide uppercase mb-1">
            {t('session2.h3')}
          </h3>
          <h1 className="text-2xl leading-8 font-extrabold text-black">
            {t('session2.h1')}
          </h1>
          <div class="grid lg:grid-cols-3 gap-8  grid-cols-1 mt-10 ">
            <CatoryViewStudy
              imageURL="/assets/img/png_icons/For Product Marketers 1.png"
              title={t('session2.card1.h1')}
              content={t('session2.card1.p')}
            />
            <CatoryViewStudy
              imageURL="/assets/img/png_icons/For Product Designers 1.png"
              title={t('session2.card2.h1')}
              content={t('session2.card2.p')}
            />

            <CatoryViewStudy
              imageURL="/assets/img/png_icons/For Product Managers 1.png"
              title={t('session2.card3.h1')}
              content={t('session2.card3.p')}
            />
          </div>
        </Container>
      </section>
      <section className="bg-white py-14">
        <Container>
          <h3 className="text-base leading-6 font-semibold tracking-wide uppercase mb-1">
            {t('session3.h3')}
          </h3>
          <h1 className="text-2xl leading-8 font-extrabold text-black mb-10">
            {t('session3.h1')}
          </h1>
          <div className="grid grid-rows-2  lg:grid-cols-2 grid-cols-1 gap-8">
            <div className="row-span-2">
              <CatoryViewProject
                isMain
                imageURL="/assets/img/famer.jpg"
                enTitle="SMART GARDENT"
                viTitle="GIẢI PHÁP NÔNG NGHIỆP THÔNG MINH"
                content="We build innovative systems and processes that allow
                      farmers to streamline operations and increase food
                      production efficiency."
              />
            </div>
            {/*  Right Box */}
            <div className="lg:flex lg:col-span-1 hidden ">
              <CatoryViewProject
                imageURL="/assets/img/school.jpg"
                enTitle="SMART school"
                viTitle="GIẢI PHÁP TRƯỜNG HỌC THÔNG MINH"
                content="We build innovative systems and processes that allow
                      farmers to streamline operations and increase food
                      production efficiency."
              />
            </div>
            <div className="lg:flex lg:col-span-1 hidden ">
              <CatoryViewProject
                imageURL="/assets/img/datatranf.jpg"
                enTitle="Digital Transformation"
                viTitle="Chuyển đổi số"
                content="We build innovative systems and processes that allow
                      farmers to streamline operations and increase food
                      production efficiency."
              />
            </div>
          </div>
        </Container>
      </section>
      <section className="bg-gradient-to-br from-blue-800  to-blue-500 py-14">
        <Container>
          <h3 className="text-base text-white leading-6 font-semibold tracking-wide uppercase mb-1">
            {t('session4.h3')}
          </h3>
          <h1 className="text-2xl leading-8 font-extrabold text-white mb-10 uppercase">
            {t('session4.h1')}
          </h1>
          <div class="grid lg:grid-cols-3 gap-8  grid-cols-1 mt-10 ">
            <CatoryViewSolution
              title="One powerful platform"
              content="Streamline your payments through one unified API that evolves with you and responds to change as it happens."
            />
            <CatoryViewSolution
              title="One powerful platform"
              content="Streamline your payments through one unified API that evolves with you and responds to change as it happens."
            />
            <CatoryViewSolution
              title="One powerful platform"
              content="Streamline your payments through one unified API that evolves with you and responds to change as it happens."
            />
          </div>
        </Container>
      </section>
      <section className="bg-white py-14">
        <Container>
          <h3 className="text-gray-800 text-base leading-6 font-semibold tracking-wide uppercase mb-1 text-center">
            {t('session5.h1')}
          </h3>
          <div class="grid lg:grid-cols-5 gap-1  grid-cols-3 mt-10 ">
            <PartnerView
              imageURL="/assets/img/doitac/aptech.png"
              link="/"
              name="Aptech"
            />
            <PartnerView
              imageURL="/assets/img/doitac/Arena.png"
              link="/"
              name="Arena"
            />
            <PartnerView
              imageURL="/assets/img/doitac/Vuon Uom CN Viet Nam.png"
              link="/"
              name="Vườn Ươm Công Nghệ Việt Nam"
            />
            <PartnerView
              imageURL="/assets/img/doitac/Kobe Digital Labo.png"
              link="/"
              name="Kobe Digital Labo"
            />
            <PartnerView
              imageURL="/assets/img/doitac/Mankichi Software.png"
              link="/"
              name="Mankichi Software"
            />
            <PartnerView
              imageURL="/assets/img/doitac/NLU.png"
              link="/"
              name="Đại Học Nông Lâm"
            />
            <PartnerView
              imageURL="/assets/img/doitac/CTU.png"
              link="/"
              name="Đại học Cần Thờ"
            />
            <PartnerView
              imageURL="/assets/img/doitac/CTUMP.png"
              link="/"
              name="Đại học Y Dược Cần Thơ"
            />
            <PartnerView
              imageURL="/assets/img/doitac/HG HPT.png"
              link="/"
              name="Bệnh viện đa khoa Tỉnh Hậu Giang"
            />
            <div className="hidden lg:block">
              <PartnerView
                imageURL="/assets/img/doitac/vitec.png"
                link="/"
                name="VITEC"
              />
            </div>
          </div>
        </Container>
      </section>
    </article>
  )
}

const PartnerView = (props) => (
  <>
    <div
      data-tip={props.name}
      data-for="doitac"
      className="bg-gray-50 flex justify-center items-center p-6"
    >
      <Link href={props.link ? props.link : '/'}>
        <img
          src={props.imageURL}
          alt={props.name ? props.name : 'Đối tác của R&D CUSC'}
          className="w-20 h-20 filter  transition duration-300 ease-in-out grayscale brightness-95 contrast-125 cursor-pointer partnerIcon"
        />
      </Link>
    </div>
    <ReactTooltip id="doitac" type="info"></ReactTooltip>
  </>
)

const CatoryViewSolution = (props) => (
  <div className="hover:shadow-2xl rounded-lg p-8 border shadow-lg cursor-pointer  transition duration-300 ease-in-out bg-white ">
    <h1 className="text-blue-800 text-lg leading-7 font-bold">{props.title}</h1>
    <p className="text-gray-800 text-sm leading-5 font-medium py-2">
      {props.content}
    </p>
  </div>
)

const CatoryViewProject = (props) => (
  <div
    className="rounded-lg bg-center bg-cover  bg-no-repeat flex-1 cursor-pointer"
    style={{ backgroundImage: `url(${props.imageURL})` }}
  >
    <div
      className={`hover:shadow-2xl shadow-lg rounded-lg bg-gradient-to-b from-transparent to-blue-900 p-8  h-full flex flex-col justify-end ${
        props.isMain ? 'pt-40' : ''
      }`}
    >
      <div className={props.isMain ? 'lg:pt-60 pt-0' : 'pt-0'}>
        <h3 className="text-sm text-white leading-6 font-normal tracking-wide uppercase mb-1">
          {props.enTitle}
        </h3>
        <h1 className="my-2 text-white text-xl   leading-7 font-bold uppercase">
          {props.viTitle}
        </h1>
        <p className=" text-sm text-white leading-5 font-normal ">
          {props.content}
        </p>
      </div>
    </div>
  </div>
)

const CatoryViewStudy = (props) => (
  <div className="hover:shadow-2xl rounded-lg p-8 border shadow-lg cursor-pointer  transition duration-300 ease-in-out bg-white ">
    <img src={props.imageURL} alt="catory" />
    <h1 className="text-black text-lg leading-7 font-bold py-6">
      {props.title}
    </h1>
    <p className="text-gray-800 text-sm leading-5 font-medium ">
      {props.content}
    </p>
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

const ContactForm = (props) => (
  <div className="text-sm text-gray-700 font-light mt-5 max-w-lg">
    <from className="flex flex-row space-x-2">
      <input
        type="text"
        placeholder={props.placeholder}
        className="flex-grow border-2 rounded px-3 py-1 w-full focus:outline-none focus:border-indigo-500 focus:shadow"
      />
      <div className="flex-none">
        <button className="bg-indigo-600 text-white font-bold px-5 py-2 rounded focus:outline-none shadow hover:bg-blue-700 transition-colors">
          {props.btnText}
        </button>
      </div>
    </from>
    <p className="text-xs text-blue-300 font-light mt-5">{props.sub}</p>
  </div>
)

const CallOutAndText = (props) => (
  <div className="bg-white bg-opacity-10 cursor-pointer rounded backdrop-blur-2xl px-2 py-2 flex flex-none flex-row text-blue-50 space-x-4 items-center hover:bg-opacity-5 transform  ease-in-out">
    <div className="bg-white bg-opacity-30 px-2 leading-relaxed rounded ">
      CUSC SOFTWARE
    </div>
    <div>{props.text}</div>
    <div>
      <svg
        width="20"
        height="20"
        fill="none"
        viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill="#ffffff"
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M7.29295 14.7071C6.90243 14.3166 6.90243 13.6834 7.29295 13.2929L10.5858 10L7.29295 6.70711C6.90243 6.31658 6.90243 5.68342 7.29295 5.29289C7.68348 4.90237 8.31664 4.90237 8.70717 5.29289L12.7072 9.29289C13.0977 9.68342 13.0977 10.3166 12.7072 10.7071L8.70717 14.7071C8.31664 15.0976 7.68348 15.0976 7.29295 14.7071Z"
        />
      </svg>
    </div>
  </div>
)

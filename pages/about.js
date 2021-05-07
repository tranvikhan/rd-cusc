import React from 'react'
import Container from '../components/Layout/container'
import Header from '../components/Layout/header'
import Link from 'next/link'
import WebHead from '../components/Layout/head'

import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useTranslation } from 'next-i18next'

export const getStaticProps = async (props) => ({
  props: {
    ...(await serverSideTranslations(props.locale, ['about'])),
  },
})

export default function About() {
  const { t } = useTranslation('about')
  return (
    <article>
      <WebHead
        image="/assets/img/cuscsoft-small.jpg"
        title={t('title')}
        pageTitle={t('title')}
        description={t('description')}
      />
      <Header className="transform  -translate-y-16">
        <Container className="transform  -translate-y-16">
          <img
            src="/assets/img/cuscsoft2.jpg"
            alt="Ảnh tập thể nhóm R&D"
            className="object-cover  w-full rounded-lg  shadow-xl  transform  xl:translate-y-32 lg:translate-y-44 translate-y-32"
          />
        </Container>
      </Header>
      <section className="bg-white py-10">
        <Container>
          <div className="grid lg:grid-cols-2 gap-16 md:grid-cols-2  grid-cols-1 lg:mt-8 mt-0">
            <div>
              <section>
                <Heading1>{t('session1.h1')}</Heading1>
                <Paragraph>{t('session1.p')}</Paragraph>
              </section>
              <section>
                <Heading1>{t('session2.h1')}</Heading1>
                <Paragraph>
                  {t('session2.g.p')}
                  <ul class="list-disc list-outside pl-8 pt-2">
                    <ListItem>{t('session2.g.li1')}</ListItem>
                    <ListItem>{t('session2.g.li2')}</ListItem>
                    <ListItem>{t('session2.g.li3')}</ListItem>
                  </ul>
                </Paragraph>
              </section>
              <section>
                <Heading1>{t('session3.h1')}</Heading1>
                <Paragraph>{t('session3.p')}</Paragraph>
              </section>
            </div>
            <div>
              <img
                src="/assets/img/QD thanh lap nhom R&D-1.jpg"
                alt="Quyết định thành lập nhóm R&D"
                className="object-cover  w-full rounded-lg  shadow-lg"
              />
            </div>
          </div>
        </Container>
      </section>
    </article>
  )
}

const Paragraph = ({ children }) => (
  <p className="text-base font-normal text-gray-900 mb-8">{children}</p>
)
const Heading1 = ({ children }) => (
  <h1 className="text-xl font-bold text-black mb-2">{children}</h1>
)
const ListItem = ({ children }) => (
  <li className="text-base font-normal text-gray-900 pt-1">{children}</li>
)

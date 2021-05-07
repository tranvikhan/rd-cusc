import Link from 'next/link'
import React from 'react'
import Container from './container'
import { useRouter } from 'next/router'

export default function Footer() {
  const router = useRouter()
  return (
    <div className="bg-indigo-800 pt-14 text-indigo-200 ">
      <Container>
        <div class="grid lg:grid-cols-6 gap-8  grid-cols-2 ">
          <div class="col-span-2">
            <Link href="/">
              <img
                src="/assets/img/logoCuscRD2.svg"
                alt="logo"
                className="cursor-pointer h-20"
              />
            </Link>
            <p className="py-4">
              {router.locale === 'vi' ? (
                <>
                  Trung tâm công nghệ phần mềm Đại học Cần Thơ <br />
                  Can Tho University Software Center (CUSC) <br />
                  Nhóm nghiên cứu và phát triển (R&D)
                </>
              ) : (
                <>
                  Can Tho University Software Center (CUSC) <br />
                  Research And Development Department (R&D)
                </>
              )}
            </p>
            <p className="py-4">
              {router.locale === 'vi' ? (
                <Link href="https://goo.gl/maps/Sz9AFegMoxuRU5mXA">
                  Địa chỉ: 01 Lý Tự Trọng, Phường An Phú, Quận Ninh Kiều, Tp.
                  Cần Thơ, Việt Nam.
                </Link>
              ) : (
                <Link href="https://goo.gl/maps/Sz9AFegMoxuRU5mXA">
                  Address: 01 Ly Tu Trong, An Phu ward, Ninh Kieu district, Can
                  Tho city, Vietnam.
                </Link>
              )}
            </p>
          </div>
          <div>
            <CustomTitle>Website</CustomTitle>
            <CustomLink
              text={router.locale === 'vi' ? 'Giới thiệu' : 'About'}
              href="/"
            />
            <CustomLink
              text={
                router.locale === 'vi'
                  ? 'Dự án nghiên cứu'
                  : 'Research Projects'
              }
              href="/projects"
            />
            <CustomLink
              text={router.locale === 'vi' ? 'Tin tức' : 'News'}
              href="/news"
            />
            <CustomLink
              text={router.locale === 'vi' ? 'Tổ chức nhân sự' : 'Organization'}
              href="/organization"
            />
          </div>
          <div>
            <CustomTitle>
              {router.locale === 'vi' ? 'Liên kết' : 'Links'}
            </CustomTitle>

            <CustomLink href="/" text="CUSC" />
            <CustomLink
              href="/"
              text={
                router.locale === 'vi' ? 'Hệ thống ISO điện tủ' : 'ISO System'
              }
            />
          </div>
          <div>
            <CustomTitle>
              {router.locale === 'vi' ? 'Dự án' : 'Projects'}
            </CustomTitle>

            <CustomLink href="/" text="Smart Garden" />
            <CustomLink href="/" text="Smart School" />
          </div>
          <div>
            <CustomTitle>
              {router.locale === 'vi' ? 'Liên hệ' : 'Contact'}
            </CustomTitle>

            <CustomLink
              href="tel:+84 939 0000 97"
              text="Tel: +84 939 0000 97"
            />
            <CustomLink
              href="mailto:thviet@ctu.edu.vn"
              text="Email: thviet@ctu.edu.vn"
            />
            <CustomLink
              href="/"
              text={router.locale === 'vi' ? 'Tuyển dụng' : 'Recruitment'}
            />
          </div>
        </div>
        <div className="border-t-2 border-indigo-400 mt-8 text-center text-indigo-400 pt-4">
          © 2021 CUSC Software. All rights reserved.
        </div>
      </Container>
    </div>
  )
}

const CustomTitle = ({ children }) => (
  <h6 className="text-indigo-100 text-sm leading-5 font-semibold tracking-wider uppercase mb-4">
    {children}
  </h6>
)

const CustomLink = (props) => (
  <div className="py-2">
    <Link {...props}>
      <span className="hover:text-white cursor-pointer">{props.text}</span>
    </Link>
  </div>
)

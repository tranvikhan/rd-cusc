import React from 'react'
import Link from 'next/link'
import Container from '../Layout/container'
import NavItem from './nav_item'
import NavChangeLang from './nav_changeLang'
import { FiMenu, FiX } from 'react-icons/fi'

import { useRouter } from 'next/router'

function TopNavigation() {
  const [opacity, setOpacity] = React.useState(0)
  const [btnTogle, setBtnToggle] = React.useState(false)
  const router = useRouter()
  React.useEffect(() => {
    let lastKnownScrollPosition = 0
    let ticking = false

    function doSomething(scrollPos) {
      if (scrollPos <= 100) {
        setOpacity(scrollPos / 100)
      } else {
        setOpacity(0.9)
      }
    }
    document.addEventListener('scroll', function (e) {
      lastKnownScrollPosition = window.scrollY

      if (!ticking) {
        window.requestAnimationFrame(function () {
          doSomething(lastKnownScrollPosition)
          ticking = false
        })

        ticking = true
      }
    })
  }, [])

  return (
    <header
      className={`backdrop-filter backdrop-blur-lg fixed top-0 left-0 right-0 z-50 ${
        opacity > 0.5 && 'lg:shadow-lg shadow-none'
      }`}
      style={{ backgroundColor: `rgba(30, 64, 175, ${opacity})` }}
    >
      <Container>
        <div className="flex flex-wrap items-center">
          <div className="flex lg:flex-none flex-1 items-center">
            <Link href="/">
              <img
                className="h-16 cursor-pointer"
                src="/assets/img/logoCuscRD2.svg"
                alt="Logo Nhóm R&D CUSC"
                onClick={() => {
                  setBtnToggle(false)
                }}
              />
            </Link>
          </div>
          <label
            htmlFor="menu-toggle"
            className={`cursor-pointer lg:hidden block text-white rounded-lg`}
          >
            <div className="bg-white bg-opacity-20 p-2 rounded-lg transition delay-150 duration-300 ease-in-out">
              {btnTogle ? <FiX size={24} /> : <FiMenu size={24} />}
            </div>
          </label>
          <input
            className="hidden rounded-lg"
            type="checkbox"
            id="menu-toggle"
            checked={btnTogle}
            onChange={() => {
              setBtnToggle(!btnTogle)
            }}
          />

          <div
            className="hidden lg:flex lg:flex-grow xl:mt-0 lg:mt-2 mt-4 xl:pl-6 pl-0 lg:shadow-none lg:justify-between lg:items-center lg:w-auto lg:bg-transparent lg:p-0 lg:rounded-none w-full shadow-lg bg-blue-800 rounded-xl p-4 lg:mb-0 mb-96"
            id="menu"
          >
            <nav>
              <ul className="lg:flex items-center text-base text-white font-medium lg:space-x-4 lg:pt-0 lg:pl-0 pl-4">
                <li
                  onClick={() => {
                    setBtnToggle(false)
                  }}
                >
                  <NavItem
                    text={router.locale === 'vi' ? 'Giới thiệu' : 'About'}
                    href="/about"
                    active={router.pathname === '/about'}
                  />
                </li>
                <li
                  onClick={() => {
                    setBtnToggle(false)
                  }}
                >
                  <NavItem
                    text={
                      router.locale === 'vi'
                        ? 'Dự án nghiên cứu'
                        : 'Research Projects'
                    }
                    href="/projects"
                    active={router.asPath.split('/')[1] === 'projects'}
                  />
                </li>
                <li
                  onClick={() => {
                    setBtnToggle(false)
                  }}
                >
                  <NavItem
                    text={router.locale === 'vi' ? 'Tin tức' : 'News'}
                    href="/news"
                    active={router.asPath.split('/')[1] === 'news'}
                  />
                </li>
                <li
                  onClick={() => {
                    setBtnToggle(false)
                  }}
                >
                  <NavItem
                    text={
                      router.locale === 'vi'
                        ? 'Tổ chức nhân sự'
                        : 'Organization'
                    }
                    href="/organization"
                    active={router.pathname === '/organization'}
                  />
                </li>
              </ul>
            </nav>
            <ul className="lg:flex items-center text-base text-white font-medium lg:space-x-4 lg:pt-0 lg:pl-0 pl-4 lg:mt-0 mt-8">
              <li
                onClick={() => {
                  setBtnToggle(false)
                }}
              >
                <NavItem
                  text={router.locale === 'vi' ? 'Liên hệ' : 'Contact'}
                  href="/contact"
                  active={router.pathname === '/contact'}
                />
              </li>
              <li
                onClick={() => {
                  setBtnToggle(false)
                }}
              >
                <NavItem
                  text={
                    router.locale === 'vi'
                      ? 'Tư vấn giải pháp'
                      : 'Solution consulting'
                  }
                  href="/consulting"
                  endLeft
                  active={router.pathname === '/consulting'}
                />
              </li>
              <li
                onClick={() => {
                  setBtnToggle(false)
                }}
              >
                <NavChangeLang
                  lang={router.locale}
                  href={router.asPath}
                  locale={router.locale === 'en' ? 'vi' : 'en'}
                />
              </li>
            </ul>
          </div>
        </div>
      </Container>
    </header>
  )
}

export default TopNavigation

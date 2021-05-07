import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
export default function NavChangeLang(props) {
  return (
    <Link {...props}>
      <div
        className={`lg:block inline-block  hover:bg-white hover:bg-opacity-80 cursor-pointer lg:mt-0 mt-4 rounded backdrop-blur-2xl p-1 transition duration-500 ease-in-out bg-blue-100 bg-opacity-40`}
      >
        {props.lang === 'vi' ? (
          <div className="relative h-8  rounded w-8  shadow-lg ">
            <Image
              layout="fill"
              src="/assets/img/flat/Vietnam.svg"
              alt="Tiếng Việt"
              objectFit="cover"
            />
          </div>
        ) : (
          <div className="relative h-8 rounded w-8  shadow-lg ">
            <Image
              layout="fill"
              src="/assets/img/flat/United_Kingdom.svg"
              alt="Tiếng Anh"
              objectFit="cover"
            />
          </div>
        )}
      </div>
    </Link>
  )
}

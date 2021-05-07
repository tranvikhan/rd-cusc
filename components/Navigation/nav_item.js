import React from 'react'
import Link from 'next/link'
export default function NavItem(props) {
  return (
    <Link {...props}>
      <div
        className={`cursor-pointer lg:mb-0 mb-2 rounded backdrop-blur-2xl px-4 py-2 transition duration-500 ease-in-out  ${
          props.endLeft
            ? 'bg-white text-blue-800 bg-opacity-90'
            : ' bg-transparent '
        }        ${
          props.active
            ? 'bg-white bg-opacity-20 hover:bg-opacity-40'
            : ' bg-transparent  hover:bg-white hover:bg-opacity-20'
        }`}
      >
        {props.text}
      </div>
    </Link>
  )
}

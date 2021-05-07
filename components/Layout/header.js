export default function Header({ children, className }) {
  return (
    <div
      className={`pt-20 bg-gradient-to-br from-blue-900 via-blue-900 to-blue-700 ${
        className ? className : ''
      }`}
    >
      {children}
    </div>
  )
}

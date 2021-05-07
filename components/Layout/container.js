export default function Container({ children, className }) {
  return (
    <div
      className={`container mx-auto xl:px-10 lg:px-6 px-4 py-2 ${
        className ? className : ''
      }`}
    >
      {children}
    </div>
  )
}


const PageWrapper = ({children}) => {
  return (
    <div className="flex flex-1 h-screen flex-col content-center items-center justify-center">
    <div className="max-w-md w-full flex justify-center">{children}</div>
    </div>
  )
}

export default PageWrapper
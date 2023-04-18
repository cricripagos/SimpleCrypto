
const PageWrapper = ({children}) => {
  return (
    <div className="flex flex-1 h-screen flex-col items-center">
    <div className="max-w-md w-full">{children}</div>
    </div>
  )
}

export default PageWrapper
import useWindowDimensions from "@/helpers/hooks/useWindowDimensions";
import { Spinner } from "../components";

const PageWrapper = ({children}) => {
  const { height } = useWindowDimensions();  

  return height ? (
    <div className="flex flex-col content-center items-center justify-center" style={{height: height}}>
    <div className="max-w-md h-full w-full flex justify-center">{children}</div>
    </div>
  ) : (
    <Spinner />
  )
}

export default PageWrapper
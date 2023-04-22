import { useSelector } from "react-redux"
import Stepper from "../Stepper/Stepper"

const Header = () => {
  const {name} = useSelector((state) => state.merchant)
  return (
    <div className="w-full">
        <p className="self-start py-3 text-white text-lg">Estas pagando en: {name}</p>
    <Stepper />
    </div>
  )
}

export default Header
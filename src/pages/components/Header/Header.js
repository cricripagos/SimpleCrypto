import { useSelector } from "react-redux"

const Header = () => {
  const {name} = useSelector((state) => state.merchant)
  return (
    <div className="w-full">
        <p className="self-start py-3 text-white text-lg">Estas pagando en: {name}</p>
    <div className="w-full bg-stone-300 p-6">TAB BAR</div>
    </div>
  )
}

export default Header
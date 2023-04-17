import { setStepForward } from "@/pages/store/reducers/interactions"
import { useDispatch, useSelector } from "react-redux"

const Button = ({text}) => {
  const {btn_disabled, step} = useSelector(state => state.interactions)
  const dispatch = useDispatch()

  const handleClick = () => {
    if(step !== 3){
      dispatch(setStepForward())
    }

  }

  return (
    <button className={`px-10 text-white font-semibold rounded-md ${btn_disabled ? 'bg-stone-400' : 'bg-green-1'}`} disabled={btn_disabled} onClick={handleClick}>
      {text}
    </button>
  )
}

export default Button
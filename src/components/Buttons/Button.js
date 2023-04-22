import { setStepBackward, setStepForward } from "@/store/reducers/interactions"
import { useDispatch, useSelector } from "react-redux"

const Button = ({ text, filled, action }) => {
  const { btn_disabled, step } = useSelector(state => state.interactions)
  const dispatch = useDispatch()

  const handleClick = () => {
    if (action === 'forward') {
      if (step !== 3) {
        dispatch(setStepForward())
      }
    } else {
      dispatch(setStepBackward())
    }
  }

  return (
    <button className={`${filled ? 'text-white px-7' : 'text-black px-3'} font-semibold rounded-md ${filled ? btn_disabled ? 'bg-stone-400' : 'bg-green-1' : 'bg-transparent'}`} disabled={action !== 'forward' ? null : btn_disabled} onClick={handleClick}>
      {text}
    </button>
  )
}

export default Button
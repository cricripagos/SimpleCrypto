import usePayBTC from "@/helpers/hooks/usePayBTC"
import { setStepBackward, setStepForward } from "@/store/reducers/interactions"
import { useDispatch, useSelector } from "react-redux"

const Button = ({ text, filled, action }) => {
  const { btn_disabled, btn_loading } = useSelector(state => state.interactions)
  const {payment_method} = useSelector(state => state.order)
  const {payment} = useSelector(state => state.options)
  const payment_selected = payment[payment_method - 1]
  const {generateAttempt} = usePayBTC()

  console.log('Method', payment[payment_method - 1])

  const dispatch = useDispatch()

  const handleClick = () => {
    if (action === 'forward') {
      if (text !== 'Pagar') {
        dispatch(setStepForward())
      } else {
        //Run PAGAR functions - para que diga pagar tiene que haber una payment option seleccionada
        if (payment_selected.evm){
          //RUN EVM functions
        } else {
          //RUN NON-EVM functions
          if(payment_selected.symbol === 'BTC') {
            generateAttempt()
          }
          
          console.log('Its non- evm')
        }
      }
    } else {
      dispatch(setStepBackward())
    }
  }

  return (
    <button className={`${filled ? 'text-white px-7' : 'text-black px-3'} font-semibold rounded-md ${filled ? (btn_disabled || btn_loading) ? 'bg-stone-400' : 'bg-green-1' : 'bg-transparent'}`} disabled={action !== 'forward' ? null : (btn_disabled || btn_loading)} onClick={handleClick}>
      
      {text}
    </button>
  )
}

export default Button
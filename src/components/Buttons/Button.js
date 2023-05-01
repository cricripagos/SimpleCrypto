import usePayBTC from "@/helpers/hooks/usePayBTC"
import { setStepBackward, setStepForward } from "@/store/reducers/interactions"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"

const Button = ({ text, filled, action }) => {
  const { btn_disabled, btn_loading } = useSelector(state => state.interactions)
  const {payment_method} = useSelector(state => state.order)
  const {payment} = useSelector(state => state.options)
  const payment_selected = payment[payment_method]
  const [paymentSelected, setPaymentSelected] = useState(null)
  const {generateAttempt} = usePayBTC()

  const dispatch = useDispatch()

  useEffect(() => {
    setPaymentSelected(payment.find(item => item.id === payment_method))
  }, [payment_method])

  const handleClick = () => {
    console.log('Clicked on button')
    if (action === 'forward') {
      if (text !== 'Pagar') {
        dispatch(setStepForward())
      } else {
        console.log('Pagar con,', paymentSelected)
        //Run PAGAR functions - para que diga pagar tiene que haber una payment option seleccionada
        if (paymentSelected.evm){
          //RUN EVM functions
        } else {
          //RUN NON-EVM functions
          if(paymentSelected.symbol === 'BTC') {
            console.log('Its BTC')
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
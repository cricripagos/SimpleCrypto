import { setCryptoAmount, setSelectedPaymentMethod } from "@/pages/store/reducers/order"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"

const CryptoCard = ({logo_url, name, symbol, network, id, contract, balance, price}) => {
  const {payment_method, fiat_amount} = useSelector(state => state.order)
  const dispatch = useDispatch()
  const [disabled, setDisabled] = useState(false)
  const {networks} = useSelector(state => state.options)

  
  const handleClick = () => {
    if(disabled) return
    if(payment_method === id){
    dispatch(setSelectedPaymentMethod(null))
  } else {
    dispatch(setSelectedPaymentMethod(id))
    dispatch(setCryptoAmount(fiat_amount/price))
  }
  }

  useEffect(() => {
    if(balance < fiat_amount/price){
      setDisabled(true)
    } else {
      setDisabled(false)
    }
  }, [])

  return (
    <div className={`flex shadow-md ${disabled && 'opacity-60'} rounded-md p-5 flex-row justify-between ring-2 my-3 w-full ${payment_method === id ? 'ring-gray-400 bg-gray-100' : 'ring-2 ring-gray-100'}`} onClick={handleClick}>
      <div className="flex flex-row">
        <div className="bg-gray-200 h-12 w-12 rounded-md p-1">
          <img className="inline-block h-10 w-10 rounded-md"  src={logo_url} />
        </div>
        <div className="ml-3">
            <p>{name} ({symbol})</p>
            <p className="text-gray-400 ">{(fiat_amount/price).toFixed(10)}</p>
        </div>
        </div>
        <div>
          {network && network !== undefined && 
            <p>{network}</p>
            }
        </div>
        
    </div>
  )
}

export default CryptoCard
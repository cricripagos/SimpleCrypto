import { setSelectedPaymentMethod } from "@/pages/store/reducers/order"
import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"

const CryptoCard = ({logo_url, name, symbol, network, id}) => {
  console.log('CARD', logo_url)
  const {payment_method} = useSelector(state => state.order)
  const dispatch = useDispatch()

  const handleClick = () => {
    if(payment_method === id){
    dispatch(setSelectedPaymentMethod(null))
  } else {
    dispatch(setSelectedPaymentMethod(id))
  }
  }

  return (
    <div className={`flex shadow-md rounded-md p-5 flex-row justify-between ring-2 my-3 w-full ${payment_method === id ? 'ring-gray-400 bg-gray-100' : 'ring-2 ring-gray-100'}`} onClick={handleClick}>
      <div className="flex flex-row">
        <div className="bg-gray-200 h-12 w-12 rounded-md p-1">
          <img className="inline-block h-10 w-10 rounded-md"  src={logo_url} />
        </div>
        <div className="ml-3">
            <p>{name} ({symbol})</p>
            <p>0000.9</p>
        </div>
        </div>
        <div>
          {network && 
            <p>Network</p>
            }
        </div>
        
    </div>
  )
}

export default CryptoCard
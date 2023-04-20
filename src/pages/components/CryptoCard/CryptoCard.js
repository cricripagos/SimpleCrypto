import { setChosenNetwork, setCryptoAmount, setSelectedPaymentMethod } from "@/pages/store/reducers/order"
import { BigNumber } from "ethers"
import { formatEther } from "ethers/lib/utils.js"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"

const CryptoCard = ({logo_url, name, symbol, network, chain_id, id, contract, balance, price}) => {
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
    // if (chain_id){
    //   dispatch(setChosenNetwork(chain_id))
    // }
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
      <div className="flex flex-row items-center">
        <div className="bg-gray-200 h-12 w-12 rounded-md p-1">
          <img className="inline-block h-10 w-10 rounded-md"  src={logo_url} />
        </div>
        <div className="ml-3">
            <p>{name}</p>
            <p className="text-sm text-gray-400">{symbol}</p>
        </div>
        </div>
        <div>
        <p className="text-gray-400 text-sm">{(fiat_amount/price).toFixed(10)}</p>
           {balance && <p className="text-xs">Balance: {formatEther(balance).slice(0,10)}</p>}
        </div>
        {/* <div>
          {network && network !== undefined && 
            <p>{network}</p>
            }
        </div> */}
        
    </div>
  )
}

export default CryptoCard
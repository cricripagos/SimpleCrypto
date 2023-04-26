import { setChosenNetwork, setCryptoAmount, setSelectedPaymentMethod } from "@/store/reducers/order"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import Balance from "./Balance"

const CryptoCard = ({ logo_url, name, symbol, network, chain_id, id, contract, balance, price, evm, enough_balance }) => {
  const { payment_method, fiat_amount } = useSelector(state => state.order)
  const dispatch = useDispatch()
  const { networks } = useSelector(state => state.options)
  const [comingSoon, setComingSoon] = useState(false)

  const handleClick = () => {
    if ((evm && !enough_balance) || comingSoon) return
    if (payment_method === id) {
      dispatch(setSelectedPaymentMethod(null))
    } else {
      dispatch(setSelectedPaymentMethod(id))
      dispatch(setCryptoAmount(fiat_amount / price))
      if (network) {
        dispatch(setChosenNetwork(network))
      }
    }
  }
  

  useEffect(() => {
    if (symbol === 'BCH'){
      console.log('BCH')
      setComingSoon(true)
    }
  }, [])


  return (
    <div className="relative w-full my-3">
      {comingSoon && 
      <div className="bg-green-2 absolute z-20 top-1 left-0.5 p-2 w-1/3 rounded-full drop-shadow-sm">
          <p className="text-sm text-white leading-3 font-semibold h-full text-center">Coming soon</p>
          </div>
          }
    <div className={`flex shadow-md ${(evm && !enough_balance) || comingSoon && 'opacity-60'} rounded-md p-5 flex-row justify-between ring-2 w-full ${payment_method === id ? 'ring-gray-400 bg-gray-100' : 'ring-2 ring-gray-100'}`} onClick={handleClick}>
      <div className="flex flex-row items-center relative">
        <div className="bg-gray-200 h-12 w-12 rounded-md p-1">
          <img className="inline-block h-10 w-10 rounded-md" src={logo_url} />
        </div>
        <div className="absolute -top-1 -left-2">
          {network && <img className="w-5 h-5" src={network && networks.find((net) => net.id === network).logo_url} />}
        </div>
        <div className="ml-3">
          <p>{name}</p>
          <p className="text-sm text-gray-400">{symbol}</p>
        </div>
      </div>
      <div className="flex w-1/4 flex-col items-end">
        <p className="text-gray-400 text-sm">{(fiat_amount / price).toFixed(evm ? 2 : 10)}</p>
        {balance && <Balance balance={enough_balance} />}
      </div>

    </div>
    </div>
  )
}

export default CryptoCard
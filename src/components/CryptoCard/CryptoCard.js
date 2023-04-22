import { setChosenNetwork, setCryptoAmount, setSelectedPaymentMethod } from "@/store/reducers/order"
import { BigNumber } from "ethers"
import { formatEther } from "ethers/lib/utils.js"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import Balance from "./Balance"

const CryptoCard = ({ logo_url, name, symbol, network, chain_id, id, contract, balance, price, evm }) => {
  const { payment_method, fiat_amount } = useSelector(state => state.order)
  const dispatch = useDispatch()
  const [disabled, setDisabled] = useState(false)
  const { networks } = useSelector(state => state.options)

  const handleClick = () => {
    if (disabled) return
    if (payment_method === id) {
      dispatch(setSelectedPaymentMethod(null))
    } else {
      dispatch(setSelectedPaymentMethod(id))
      dispatch(setCryptoAmount(fiat_amount / price))
      // if (chain_id){
      //   dispatch(setChosenNetwork(chain_id))
      // }
    }
  }

  useEffect(() => {
    if (!balance) return
    if (formatEther(balance) < fiat_amount / price) {
      setDisabled(true)
    } else {
      setDisabled(false)
    }
  }, [])

  return (
    <div className={`flex shadow-md ${disabled && 'opacity-60'} rounded-md p-5 flex-row justify-between ring-2 my-3 w-full ${payment_method === id ? 'ring-gray-400 bg-gray-100' : 'ring-2 ring-gray-100'}`} onClick={handleClick}>
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
        {balance && <Balance balance={balance > fiat_amount / price} />}
      </div>

    </div>
  )
}

export default CryptoCard
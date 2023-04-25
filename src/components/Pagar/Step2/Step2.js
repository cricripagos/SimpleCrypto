import Header from "@components/Header/Header"
import { CryptoCard, Footer, Layout, WalletConnect } from "@components/components"
import { Web3Button } from "@web3modal/react";
import { useAccount } from "wagmi";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { setBtnDisabled, setStepBackward, setStepForward } from "@/store/reducers/interactions"

const Step2 = () => {
  const { address, isConnecting, isDisconnected } = useAccount();
  const dispatch = useDispatch()
  const { payment } = useSelector(state => state.options)
  const { payment_method } = useSelector(state => state.order)
  const [autoRedirect, setAutoRedirect] = useState(false)
  useEffect(() => {
    if (address == undefined) setAutoRedirect(true)
    if (address !== undefined) {
      if (autoRedirect) dispatch(setStepForward())
    }
  }, [address])

  useEffect(() => {
    if (address !== undefined || payment_method !== null) {
      dispatch(setBtnDisabled(false))
    } else {
      dispatch(setBtnDisabled(true))
    }
  }, [payment_method, address])

  return (
    <Layout>
      <div className="flex flex-col h-screen ">
        <div className="flex bg-green-1 rounded-b-lg justify-center items-center flex-col pb-5 px-7">
          <Header />
        </div>
        <div className="px-7 flex flex-col items-center w-full">
          <p className="text-lg font-semibold py-3">Connect your wallet</p>
          <Web3Button balance="show" icon="show" />
          <p className="text-lg font-semibold py-3">Or pay with</p>
          {payment.map((item, index) => {
            return item.evm === false && <CryptoCard {...item} />
          })}

        </div>
        <Footer btn_msg='Continuar' />
      </div>
    </Layout>
  )
}

export default Step2
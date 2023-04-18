import Header from "@/pages/components/Header/Header"
import { CryptoCard, Footer, Layout, WalletConnect } from "@/pages/components/components"
import { Web3Button } from "@web3modal/react";
import { useAccount } from "wagmi";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux"
import { setStepBackward, setStepForward } from "@/pages/store/reducers/interactions"

const Step2 = () => {
  const { address, isConnecting, isDisconnected } = useAccount();
  const dispatch = useDispatch()
  // Este booleano lo uso para que si vos ya tenes la wallet conectada de antes, 
  // no te pase al paso 3 de una, y que te de a vos la oportunidad para hacer click en continuar
  const [autoRedirect, setAutoRedirect] = useState(false)

  useEffect(() => {
    if (address == undefined) setAutoRedirect(true)
    if (address !== undefined) {
      console.log('Se conecto la wallet con address:', address)
      if (autoRedirect) dispatch(setStepForward())
    }
  }, [address])

  return (
    <Layout>
      <div className="flex flex-col h-screen justify-between">
        <div className="flex bg-green-1 rounded-b-lg justify-center items-center flex-col pb-5 px-7">
          <Header />
        </div>
        <div className="px-7 flex flex-col items-center w-full">
          <p className="text-lg font-semibold py-3">Connect your wallet</p>
          <Web3Button balance="show" icon="show" />
          <p className="text-lg font-semibold py-3">Or pay with</p>
          <CryptoCard />
          <CryptoCard />

        </div>
        <Footer btn_msg='Continuar' />
      </div>
    </Layout>
  )
}

export default Step2
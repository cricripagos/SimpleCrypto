import Header from "@/pages/components/Header/Header"
import { CryptoCard, Footer, Layout, WalletConnect } from "@/pages/components/components"

const Step2 = () => {
  return (
    <Layout>
    <div className="flex flex-col h-screen justify-between">
        <div className="flex bg-green-1 rounded-b-lg justify-center items-center flex-col pb-5 px-7">
            <Header/>
        </div>
        <div className="px-7 flex flex-col items-center w-full">
          <p className="text-lg font-semibold py-3">Connect your wallet</p>
        <WalletConnect />
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
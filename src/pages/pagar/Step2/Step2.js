import Header from "@/pages/components/Header/Header"
import { CryptoCard, Footer, Layout, WalletConnect } from "@/pages/components/components"

const Step2 = () => {
  return (
    <Layout>
    <div className="flex flex-col h-screen justify-between">
        <div className="flex bg-green-1 rounded-b-lg justify-center items-center flex-col py-7 px-7">
            <Header/>
        </div>
        <div className="px-7">
        <WalletConnect />
        <CryptoCard />
        </div>
        <Footer btn_msg='Continuar' />
    </div>
    </Layout>
  )
}

export default Step2
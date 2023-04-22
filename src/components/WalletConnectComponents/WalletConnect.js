import useWagmiClient from "@/helpers/hooks/useWagmi"
import { Web3Button, Web3Modal } from "@web3modal/react"
import { useEffect } from "react"
import { WagmiConfig, useAccount } from "wagmi"

const WalletConnect = () => {
    const { wagmiClient, ethereumClient, projectId } = useWagmiClient()
    const {address} = useAccount()

    useEffect(() => {
        console.log('Address is...', address)
    }, [address])


  return (
    <div>
        <WagmiConfig client={wagmiClient}>
        <Web3Button balance='show' icon='show' />
        </WagmiConfig>
        <Web3Modal projectId={projectId} ethereumClient={ethereumClient} />
    </div>
  )
}

export default WalletConnect
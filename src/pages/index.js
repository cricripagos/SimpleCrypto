import { EthereumClient, w3mConnectors, w3mProvider } from '@web3modal/ethereum'
import { Web3Modal } from '@web3modal/react'
import { configureChains, createClient, WagmiConfig } from 'wagmi'
import { arbitrum, mainnet, polygon } from 'wagmi/chains'
import { Web3Button } from '@web3modal/react'
import { useAccount } from 'wagmi'


const chains = [arbitrum, mainnet, polygon]
const projectId = '8579dab459fd9bbe2b74a2a67b2ae920'
const { provider } = configureChains(chains, [w3mProvider({ projectId })])
const wagmiClient = createClient({
  autoConnect: true,
  connectors: w3mConnectors({ projectId, version: 1, chains }),
  provider
})
const ethereumClient = new EthereumClient(wagmiClient, chains)

import React from 'react'

export const Address = () => {
  const { address, isConnecting, isDisconnected } = useAccount()
  if (isConnecting) return <div>Connecting…</div>
  if (isDisconnected) return <div>Disconnected</div>
  return <div>{address}</div>
}


export const Erc20 = ({ address }) => {
  return (
    <div>Erc20 </div>
  )
}



const Pagar = () => {
  return (
    <div>index</div>
  )
}

export default function App() {
  return (
    <>
      <WagmiConfig client={wagmiClient}>
        {/*<HomePage />*/}
        lala
        return <Web3Button balance='show' icon='show' />
        <Pagar />
        <Address />
      </WagmiConfig>



      <Web3Modal projectId={projectId} ethereumClient={ethereumClient} />
    </>
  )
}


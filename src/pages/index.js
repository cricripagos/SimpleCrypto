import { EthereumClient, w3mConnectors, w3mProvider } from '@web3modal/ethereum'
import { Web3Modal } from '@web3modal/react'
import { configureChains, createClient, WagmiConfig } from 'wagmi'
import { arbitrum, mainnet, polygon, polygonMumbai, bsc } from 'wagmi/chains'
import { Web3Button } from '@web3modal/react'
import { useNetwork, useAccount } from 'wagmi'
import EvmFlowDemo from '@/components/EvmFlowDemo'

const chains = [arbitrum, mainnet, polygon, polygonMumbai, bsc]
const projectId = '8579dab459fd9bbe2b74a2a67b2ae920'
const { provider } = configureChains(chains, [w3mProvider({ projectId })])
const wagmiClient = createClient({
  autoConnect: true,
  connectors: w3mConnectors({ projectId, version: 1, chains }),
  provider
})
const ethereumClient = new EthereumClient(wagmiClient, chains)

import React, { useEffect } from 'react'


export default function App() {
  const current_blockchain = useNetwork('loading')
  const { address, isConnecting, isDisconnected } = useAccount()
  useEffect(() => {
    if (current_blockchain.chain !== undefined) {
      console.log('elnetwork es', current_blockchain.chain.name)
    }
  }, [current_blockchain])
  return (
    <>
      <WagmiConfig client={wagmiClient}>
      <EvmFlowDemo 
        token='LINK'
        contract_address='0x326C977E6efc84E512bB9C30f76E30c160eD06FB'
        payer_address={address}
        amount={1}
        beneficiary_address={'0x92045e398081D9D54532088D7A8e18a2559C0085'}
        current_blockchain={current_blockchain.chain?.id}
      />
        <Web3Button balance='show' icon='show' />
      </WagmiConfig>



      <Web3Modal projectId={projectId} ethereumClient={ethereumClient} />
    </>
  )
}


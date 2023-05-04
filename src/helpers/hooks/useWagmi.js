import { EthereumClient, w3mConnectors, w3mProvider } from '@web3modal/ethereum'
import { configureChains, createClient } from 'wagmi'
import { bsc, polygon, polygonMumbai } from 'wagmi/chains'

export default function useWagmiClient() {
    const chains = [ polygon, polygonMumbai, bsc]
    const projectId = '8579dab459fd9bbe2b74a2a67b2ae920'
    const { provider } = configureChains(chains, [w3mProvider({ projectId })])
    const wagmiClient = createClient({
        autoConnect: true,
        connectors: w3mConnectors({ projectId, version: 1, chains }),
        provider
    })

  const ethereumClient = new EthereumClient(wagmiClient, chains)

  return {
    wagmiClient,
    ethereumClient,
    projectId
  }
}
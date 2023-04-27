import { EthereumClient, w3mConnectors, w3mProvider } from "@web3modal/ethereum";
import { Web3Modal } from "@web3modal/react";
import {
  WagmiConfig,
  configureChains, createClient
} from "wagmi";
import { arbitrum, bsc, mainnet, polygon, polygonMumbai } from "wagmi/chains";
const chains = [arbitrum, mainnet, polygon, polygonMumbai, bsc];
const projectId = "8579dab459fd9bbe2b74a2a67b2ae920";
const { provider } = configureChains(chains, [w3mProvider({ projectId })]);
const wagmiClient = createClient({
  autoConnect: true,
  connectors: w3mConnectors({ projectId, version: 1, chains }),
  provider,
});
const ethereumClient = new EthereumClient(wagmiClient, chains);


const WagmiWrapper = ({ children }) => {
  return (
    <>
      <WagmiConfig client={wagmiClient}>
        {children}
        {/*<Web3Button balance="show" icon="show" />*/}
      </WagmiConfig>
      <Web3Modal projectId={projectId} ethereumClient={ethereumClient} />
    </>
  )


};

export default WagmiWrapper;

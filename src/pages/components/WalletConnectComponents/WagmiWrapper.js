import { EthereumClient, w3mConnectors, w3mProvider } from "@web3modal/ethereum";
import { Web3Button, Web3Modal } from "@web3modal/react";
import { useEffect } from "react";
import {
  configureChains, createClient,
  useAccount, useNetwork,
  WagmiConfig
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
  {/*const current_blockchain = useNetwork("loading");
  const { address, isConnecting, isDisconnected } = useAccount();
  useEffect(() => {
    if (current_blockchain.chain !== undefined) {
      console.log("elnetwork es", current_blockchain.chain.name);
    }
  }, [current_blockchain]);*/}


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

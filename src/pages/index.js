import {
  EthereumClient,
  w3mConnectors,
  w3mProvider,
} from "@web3modal/ethereum";
import { Web3Button, Web3Modal } from "@web3modal/react";
import { Provider } from 'react-redux';
import { WagmiConfig, configureChains, createClient, useAccount } from "wagmi";
import { arbitrum, mainnet, polygon } from "wagmi/chains";
import { store } from "./store/store";

const chains = [arbitrum, mainnet, polygon];
const projectId = "8579dab459fd9bbe2b74a2a67b2ae920";
const { provider } = configureChains(chains, [w3mProvider({ projectId })]);
const wagmiClient = createClient({
  autoConnect: true,
  connectors: w3mConnectors({ projectId, version: 1, chains }),
  provider,
});
const ethereumClient = new EthereumClient(wagmiClient, chains);

export const Erc20 = ({ address }) => {
  return <div>Erc20 </div>;
};

const Pagar = () => {
  return <div>index</div>;
};

export const Address = () => {
  const { address, isConnecting, isDisconnected } = useAccount();
  if (isConnecting) return <div>Connecting…</div>;
  if (isDisconnected) return <div>Disconnected</div>;
  return <div>{address}</div>;
};

export default function App() {
  return (
    <>
    <Provider store={store}>
      <WagmiConfig client={wagmiClient}>
        lala return <Web3Button balance="show" icon="show" />
        <Pagar />
        <Address />
      </WagmiConfig>

      <Web3Modal projectId={projectId} ethereumClient={ethereumClient} />
    </Provider>
    </>
  );
}

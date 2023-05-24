import Stablecoins from "@/components/WalletConnectComponents/Stablecoins";
import WagmiWrapper from "@components/WalletConnectComponents/WagmiWrapper";
import { Web3Button } from "@web3modal/react";
import { useEffect, useState } from "react";
import { useAccount } from "wagmi";

const UserTransactions = () => {
  const { address } = useAccount();
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const fetchAndUpdateUUIDs = async () => {
      const response = fetch("/api/transactions");
      if (response.ok) {
        const data = await response.json();
        setTransactions(data);
      } else {
        console.error("HTTP response not OK");
      }
    };

    fetchAndUpdateUUIDs();
  }, []);

  return (
    <WagmiWrapper>
      <div
        className="px-7 flex flex-col items-center w-full flex-1/4 overflow-scroll
    overflow-x-hidden scrollbox"
      >
        <p className="text-lg font-semibold pt-3 text-center">
          Conecta tu wallet para ver tu historial de transacciones
        </p>
        <Stablecoins />
        {/* AQUI NO MOSTRAMOS EL BALANCE PARA NO CONFUNDIR CON EL TOTAL DE LAS TRANSACCIONES */}
        <Web3Button balance="hide" icon="show" />
      </div>
      {address && transactions && (
        <div
          className="px-7 flex flex-col items-center w-full flex-1/4 overflow-scroll
    overflow-x-hidden scrollbox"
        >
          <br />
          <br />
          <ul>
            {transactions.map((transaction, index) => (
              <li key={index}>
                {transaction.id} <p>{transaction.fiat_total_amount}</p>|{" "}
                {transaction.created_at}
              </li>
            ))}
          </ul>
        </div>
      )}
    </WagmiWrapper>
  );
};

export default UserTransactions;

import { useEffect, useState } from "react";
import { erc20ABI, useAccount, useContractReads } from "wagmi";

const useCustomRead = (evm_contracts, address) => {
  const [res, setRes] = useState({
    data: undefined,
    isError: undefined,
    isLoading: undefined,
  });

  const contracts_to_read = evm_contracts.map((contract) => {
    return {
      address: contract.contract_address,
      abi: erc20ABI,
      functionName: "balanceOf",
      args: [address],
      chainId: contract.chain_id,
    };
  });
  const { data, isError, isLoading } = useContractReads({
    contracts: contracts_to_read,
  });
  useEffect(() => {
    if (data !== undefined) {
      const dataWithId = data.map((item, index) => [
        item,
        evm_contracts[index].id,
      ]);
      setRes({ dataWithId, isError, isLoading });
    }
  }, [data, isError, isLoading]);
  return res;
};

export const useGetBalances = (contracts) => {
  let evm_contracts = contracts.filter((contract) => contract.evm == true);

  //TODO cambiar estos 2 hooks de abajo por parametros, para optimizar (no es urgente)
  const { address } = useAccount();
  const r = useCustomRead(evm_contracts, address);

  console.log("getbalances", r);

  return r;
};

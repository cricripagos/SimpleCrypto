import AdminConsole from "@/components/AdminConsole/AdminConsole";
import WagmiWrapper from "@/components/WalletConnectComponents/WagmiWrapper";
import { PageWrapper } from "@/components/components";
import useSupabase, { supabase } from "@/helpers/hooks/useSupabase";
import { setMerchant } from "@/store/reducers/merchant";
import { Web3Button } from "@web3modal/react";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useAccount, useDisconnect } from "wagmi";

const AdminScreens = ({paymentOptions, merchants}) => {
    const { address } = useAccount();
    const { disconnect } = useDisconnect()
    const [activeMerchant, setActiveMerchant] = useState(null)
    const dispatch = useDispatch()
    const { getNetworks, getPaymentOptions } = useSupabase();
    

    useEffect(() => {
        getNetworks()
        getPaymentOptions()
      }, []);


    useEffect(() => {
        setActiveMerchant(merchants.find(merchant => merchant.key_evm == address))
    }, [address])

    useEffect(() => {
        if (activeMerchant !== undefined && activeMerchant !== null) {
            console.log('active', activeMerchant)
            dispatch(setMerchant(activeMerchant))
        } else {
            console.log('no active merchant', disconnect(), activeMerchant)
            //TODO, no esta funcionando
            disconnect()
        }
    }, [activeMerchant])



    return (
        <div className="w-full flex items-center justify-center">
        {!activeMerchant ? 
        <div className="flex flex-col items-center">
    <p className="text-lg font-semibold pt-3 text-center mb-5">Conectá tu wallet para ver tu historial de transacciones</p>
    <Web3Button balance="show" icon="show" />
        </div>
        :
        <AdminConsole />
        }
    </div>
    )
}

const AdminContent = ({merchants}) => {
    

  return (
    <WagmiWrapper>
        <PageWrapper>
            <AdminScreens merchants={merchants} />
        </PageWrapper>
    </WagmiWrapper>
  )
}

export default AdminContent

export async function getServerSideProps(context) {
    let merchants = await supabase.from("merchants").select();

    return {
      props: {
        merchants: merchants.data,
      },
    };
  }
import { Web3Button, Web3NetworkSwitch } from "@web3modal/react";
import { useSelector } from "react-redux";
import StepWrapper from "../Wrappers/StepWrapper";

const AdminConsole = () => {
    const {name} = useSelector(state => state.merchant)
  return (
    <StepWrapper style={{width: '100%', height: '100%',}}>
        <div className="bg-walletconnect-blue py-10 px-5 rounded-b-lg flex-1/3">
        <div className="flex flex-row justify-between items-center">
        <p className="text-xl text-white font-medium">Hola {name}</p>
        <Web3Button balance="hide" icon="show" />
        </div>
        <Web3NetworkSwitch />
        <div className="flex flex-col items-center pt-10">
        <p className="text-4xl text-white font-medium">100.000 ARS</p>
        <p className="text-2xl text-white">300 USD</p>
        </div>
        </div>
        <div className="flex-2/3">

        </div>
 
    </StepWrapper>
  )
}

export default AdminConsole
import { useSelector } from "react-redux";
import useSupabase from "./useSupabase";

export default function usePayBTC() { 
    const {createPayment} = useSupabase()
    const {crypto_amount, payment_method} = useSelector(state => state.order)

    const generateInvoice = async () => {
        console.log('Generating invoice........', crypto_amount, payment_method)
        const attempt = await createPayment({crypto_amount: crypto_amount, payment_option: payment_method})
        console.log('Payment attempt created........', attempt[0])
        if (!attempt[0].uuid) {
            alert("Hubo un error al generar tu pago, vuelve a intentar.");
            return;
          }

    }


    return {
        generateInvoice
    }
}
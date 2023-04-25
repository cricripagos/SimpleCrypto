import { useState } from "react";
import { useSelector } from "react-redux";
import { requestProvider } from "webln";
import useSupabase from "./useSupabase";

export default function usePayBTC() { 
    const {createPayment} = useSupabase()
    const {crypto_amount, payment_method} = useSelector(state => state.order)
    const {name} = useSelector(state => state.merchant)
    const [webln, setWebln] = useState()

    const generateInvoice = async () => {
        const promise = await fetch("/api/btcGenerateInvoice", {
            method: "POST",
            headers: {
              "Access-Control-Allow-Origin": "*",
              "Access-Control-Allow-Credentials": true,
              "Content-Type": "aplication/json",
            },
            body: JSON.stringify({ 
                crypto_amount: crypto_amount,
                merchant: name
            }),
        })
        .then((res) => res.json())
        .then((data) => {
          try {
            const inv = {
              invoice: data.payment_request,
              hash: Buffer.from(data.r_hash).toString("hex"),
            };
            return inv;
          } catch (e) {
            return console.log(e);
          }
        });
        return promise
    }

    const generateAttempt = async () => {
        console.log('Generating invoice........', crypto_amount, payment_method)
        const attempt = await createPayment({crypto_amount: crypto_amount, payment_option: payment_method})
        const invoice = await generateInvoice()

        console.log(attempt, invoice)
        
        if (!attempt[0].uuid) {
            alert("Hubo un error al generar tu pago, vuelve a intentar.");
            return;
          } else {
            return attempt[0].uuid
          }

    }

    const getWalletProvider = async () => {
        try {
            const provider = requestProvider()
            return provider
        } catch (err) {
            console.log(err.message)
        }
        
    }


    return {
        generateAttempt
    }
}
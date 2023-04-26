import { setInvoice } from "@/store/reducers/interactions";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { requestProvider } from "webln";
import useSupabase from "./useSupabase";

export default function usePayBTC() { 
    const {createPayment, updatePayment} = useSupabase()
    const {crypto_amount, payment_method} = useSelector(state => state.order)
    const {name} = useSelector(state => state.merchant)
    const dispatch = useDispatch()
    const [webln, setWebln] = useState()
    const [userId, setUserId] = useState(false)

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

    const getWalletProvider = async () => {
        try {
            const provider = requestProvider()
            return provider
        } catch (err) {
            console.log(err.message)
            return err.message
        }
    }

    const generateAttempt = async () => {
        console.log('Generating invoice........', crypto_amount, payment_method)
        const {uuid} = await createPayment({crypto_amount: crypto_amount, payment_option: payment_method})
        const invoice = await generateInvoice()

        console.log(uuid, invoice)
        


        // ERROR HANDLERS
        if (!uuid) {
            //ERROR: en la creacion de la DB
            alert("Hubo un error al generar tu pago, vuelve a intentar.");
            return;
        }
        if (!invoice.invoice || !invoice.hash) {
            //ERROR: en la creaction de un invoice
            const update = updatePayment({
                attempt: uuid,
                status: 'failed'
            })
            console.log(update)
            alert("Hubo un error al generar tu pago, vuelve a intentar.");
            return;
        } else {
            const wallet = await getWalletProvider()
            // const wallet = false
            console.log('WALLET IS', wallet)
            if(wallet){
                try {
                    const sendPaymentResponse = await wallet.sendPayment(invoice.invoice);
                    console.log(sendPaymentResponse);
                } catch (e){
                    alert('Error', e)
                }
            } else {
                dispatch(setInvoice(invoice))
            }
        }
    }


    return {
        generateAttempt
    }
}
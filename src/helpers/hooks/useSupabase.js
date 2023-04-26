import { setMerchant } from "@/store/reducers/merchant";
import { setNetworksOptions, setPaymentOptions } from "@/store/reducers/options";
import { createClient } from "@supabase/supabase-js";
import { useDispatch, useSelector } from "react-redux";
import { useAccount } from "wagmi";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);


export default function useSupabase() {
    const dispatch = useDispatch()
    const {id} = useSelector(state => state.merchant)
    const {fiat_amount} = useSelector(state => state.order)
    const {payment} = useSelector(state => state.options)
    const {address} = useAccount()

    const getMerchant = async (merchant) => {
        const promise = await supabase.from('merchants').select().eq('slug', merchant).then(({ data, error }) => {
            if (data) {
                dispatch(setMerchant(data))
                return data[0]
            } else {
                console.log('Error is...', error)
                return error
            }
        })
        return promise
    }

    const getPaymentMethods = async (merchant) => {
        const promise = await supabase.from('payment_options').select().then(({ data, error }) => {
            if (data) {
                dispatch(setPaymentOptions(data))
                return data
            } else {
                return error
            }
        })
        return promise
    }

    const getNetworks = async () => {
        const promise = await supabase.from('networks').select().then(({ data, error }) => {
            if (data) {
                dispatch(setNetworksOptions(data))
                return data
            } else {
                return error
            }
        })
        return promise
    }

    const createPayment = async ({crypto_amount, payment_option, transaction_hash}) => {
        const option = payment.find((option) => option.id === payment_option)
        const promise = await fetch('/api/createPaymentAttempt', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                crypto_amount: crypto_amount,
                fiat_amount: fiat_amount,
                merchant: id,
                payment_option: payment_option,
                user_address: option.evm ? address : null,
                transaction_hash: transaction_hash,
            })
        }).then((res) => { 
            console.log('Response is...', res)
            return res.json()
        }).catch(err => {
            console.log('Error is...', err)
        })
        console.log('Payment Promise is...', promise)
        return promise[0]
    }

    const updatePayment = async (payload) => {
        // const payload = {
        //     attempt: uuid,
        //     status: status,
        //     txHash: attempt.transactionHash,
        //     userAddress: attempt.userAddress,
        //   };

          const promise = await fetch("/api/updatePaymentAttempt", {
            method: "POST",
            headers: {
              "Access-Control-Allow-Origin": "*",
              "Access-Control-Allow-Credentials": true,
              "Content-Type": "aplication/json",
            },
            body: JSON.stringify(payload),
          })
          return promise
    }


    return {
        getMerchant,
        getPaymentMethods,
        getNetworks,
        createPayment,
        updatePayment
    }
}
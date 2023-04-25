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
        console.log('Creating payment attempt........', crypto_amount, fiat_amount, id, payment_option, address, transaction_hash)
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
                user_address: address,
                transaction_hash: transaction_hash,
            })
        }).then(res => { 
            console.log('Response is...', res)
            return res.json()
        }).catch(err => {
            console.log('Error is...', err)
        })
        console.log('Promise is...', promise)
        return promise
    }


    return {
        getMerchant,
        getPaymentMethods,
        getNetworks,
        createPayment
    }
}
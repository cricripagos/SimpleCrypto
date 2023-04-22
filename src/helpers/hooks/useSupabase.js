import { setMerchant } from "@/store/reducers/merchant";
import { setNetworksOptions, setPaymentOptions } from "@/store/reducers/options";
import { createClient } from "@supabase/supabase-js";
import { useDispatch } from "react-redux";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);


export default function useSupabase() {
    const dispatch = useDispatch()

    const getMerchant = async (merchant) => {
        console.log('Getting merchant', merchant, supabase)
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


    return {
        getMerchant,
        getPaymentMethods,
        getNetworks
    }
}
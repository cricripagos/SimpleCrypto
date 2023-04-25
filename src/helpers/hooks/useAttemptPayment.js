import React from 'react'
import { useState } from 'react'
import { useNetwork } from 'wagmi'

const useAttemptPayment = () => {
    const [validNetwork, setValidNetwork] = useState(false)
    const chosen_network = 80001
    const chosen_contract = ''
    const { chain, chains } = useNetwork()
    return { data: undefined }
}

export default useAttemptPayment
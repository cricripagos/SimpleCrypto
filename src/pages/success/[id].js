import React, { useEffect, useState } from 'react'
import { PageWrapper, Spinner } from '@components/components'
import Lottie from 'react-lottie';
import animationData from '../../../public/lotties/check.json'
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';

const Success = () => {
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const { id } = router.query
  const order = useSelector((state) => state.order)
  const { payment, networks } = useSelector((state) => state.options)
  const [network, setNetwork] = useState(null)


  const defaultOptions = {
    loop: false,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice"
    }
  };
  {/*}
  useEffect(() => {
    if (!method_chosen || !network_chosen) {
      router.push('/pagar/rochi')
    }
  }, [])
*/}

// useEffect(() => {
//   const chosen_network = networks ?? networks.find((network) => network?.id === order?.chosen_network)
//   setNetwork(chosen_network)
// }, [order.chosen_network])

  const navigateToExplorer = () => {
    const chosen_network = networks ? networks?.find((network) => network?.id === order?.chosen_network) : ''
    if(chosen_network?.explorer){
    router.push(`${chosen_network.explorer}${id}`)
  }
  }



  return (
    <PageWrapper>
      <div className='bg-green-1 flex w-full h-screen flex-col items-center justify-center px-10'>
        {loading ? <Spinner /> :
          <div className='bg-white p-8 rounded-lg shadow-md flex flex-col'>
            <Lottie
              options={defaultOptions}
              height={160}
              width={160}
            />
            <p className='font-bold text-center'>Gracias por tu pago!</p>
            <p className='text-center mb-2'>Puedes ver tu transaccion en el escaner de la blockchain  </p>
            <button onClick={navigateToExplorer} className='bg-green-1 text-white p-2 rounded-md shadow-sm'  >
              Link al Scanner
            </button>
          </div>
        }
      </div>
    </PageWrapper>
  )
}

export default Success
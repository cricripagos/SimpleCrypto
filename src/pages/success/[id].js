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

  {/*const method_chosen = payment?.find((method) => method.id === order.payment_method)
  const network_chosen = networks?.find((network) => network.id === method_chosen.network)

  console.log('order', order, method_chosen, network_chosen)
console.log('slug', id)*/}

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

  {/*const navigateToExplorer = () => {
    router.push(`${network_chosen.explorer}${id}`)
  }*/}

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
            <button className='bg-green-1 text-white p-2 rounded-md shadow-sm'  >
              Link al Scanner
            </button>
          </div>
        }
      </div>
    </PageWrapper>
  )
}

export default Success
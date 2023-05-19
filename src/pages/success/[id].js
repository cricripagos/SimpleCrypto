import { PageWrapper, Spinner } from '@components/components';
import { useRouter } from 'next/router';
import { useState } from 'react';
import Lottie from 'react-lottie';
import { useSelector } from 'react-redux';
import animationData from '../../../public/lotties/check.json';

const Success = () => {
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const { id } = router.query
  const order = useSelector((state) => state.order)
  const { networks } = useSelector((state) => state.options)
  const { crypto_amount, fiat_amount, payment_method } = useSelector((state) => state.order);
  const { payment } = useSelector((state) => state.options);
  const selectedMethod = payment ? payment?.find((item) => item.id === payment_method) : false


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

  console.log(selectedMethod, 'method')

  const navigateToSurvey = () => {
    window.open('https://us10.list-manage.com/survey?u=4674bdae73bef9d75729857e0&id=0cc1f6f521&attribution=false', '_blank')
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
            <p className='font-bold text-center text-lg'>Gracias por tu pago!</p>
            <p className='mb-4 text-center'>Pagaste {String(crypto_amount).slice(0,4)} {selectedMethod?.symbol}, es decir {fiat_amount} ARS</p>
            <p className='text-center mb-2'>Puedes ver tu transaccion en el escaner de la blockchain  </p>
            <button onClick={navigateToExplorer} className='bg-green-1 text-white p-2 rounded-md shadow-sm'  >
              Link al Scanner
            </button>
            <a onClick={navigateToSurvey} className='p-2 mt-4 cursor-pointer' >
              <p className='text-green-1 hover:text-gray-500 hover:underline font-semibold text-center'>
              ¡Ayudanos a mejorar!
              </p>
            </a>
          </div>
        }
      </div>
    </PageWrapper>
  )
}

export default Success
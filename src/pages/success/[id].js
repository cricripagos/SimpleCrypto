import React, { useState } from 'react'
import { PageWrapper, Spinner } from '../components/components'
import Lottie from 'react-lottie';
import animationData from '../../../public/lotties/check.json'

const Success = () => {
  const [loading, setLoading] = useState(false)
  const defaultOptions = {
    loop: false,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice"
    }
  };

  return (
    <PageWrapper>
      <div className='bg-green-1 flex w-full h-screen flex-col items-center justify-center'>
      {loading ? <Spinner /> :
      <div className='bg-white p-8 rounded-lg shadow-md flex flex-col'>
              <Lottie 
	    options={defaultOptions}
        height={160}
        width={160}
      />
      <p><b>Gracias por tu pago!</b> Se ha procesado correctamente</p>
        
        </div>
      }
      </div>

    </PageWrapper>
  )
}

export default Success
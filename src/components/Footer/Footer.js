import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import Button from '../Buttons/Button'

const Footer = () => {
  const { fiat_amount, payment_method } = useSelector(state => state.order)
  const { step, btn_loading } = useSelector(state => state.interactions)
  const [continueText, setContinueText] = useState('Continuar')

  useEffect(() => {
    if(payment_method){
      if(btn_loading){
        setContinueText('Cargando...')
      } else {
      setContinueText('Pagar')
      }
    } else {
      setContinueText('Continuar')
    }
  }, [payment_method, btn_loading])

  return (
    <div className='bg-stone-100 py-5 px-7 flex flex-row justify-between fixed bottom-0 w-full max-w-md'>
      <div>
        <p className='font-bold'>Orden: #001</p>
        <p>{fiat_amount} ARS($)</p>
      </div>
      <div className='flex'>
        {step === 2 &&
          <Button filled={false} text='Volver' action='back' />}
        <Button filled={true} text={continueText} action='forward' />
      </div>
    </div>
  )
}

export default Footer
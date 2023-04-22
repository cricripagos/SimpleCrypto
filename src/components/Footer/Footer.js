import { useSelector } from 'react-redux'
import Button from '../Buttons/Button'

const Footer = ({ btn_msg }) => {
  const { fiat_amount } = useSelector(state => state.order)
  const { step } = useSelector(state => state.interactions)
  return (
    <div className='bg-stone-100 py-5 px-7 flex flex-row justify-between'>
      <div>
        <p className='font-bold'>Orden: #001</p>
        <p>{fiat_amount} ARS($)</p>
      </div>
      <div className='flex'>
        {step === 2 &&
          <Button filled={false} text='Volver' action='back' />}
        <Button filled={true} text={btn_msg} action='forward' />
      </div>
    </div>
  )
}

export default Footer
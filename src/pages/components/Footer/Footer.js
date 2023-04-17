import { useSelector } from 'react-redux'
import Button from '../Buttons/Button'

const Footer = ({btn_msg}) => {
    const {fiat_amount} = useSelector(state => state.order)
  return (
    <div className='bg-stone-100 py-8 px-7 flex flex-row justify-between'>
        <div>
            <p className='font-bold'>Orden: #001</p>
            <p>{fiat_amount} ARS($)</p>
        </div>
        <Button text={btn_msg}/>
        </div>
  )
}

export default Footer
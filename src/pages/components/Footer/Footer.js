import Button from '../Buttons/Button'

const Footer = () => {
  return (
    <div className='bg-stone-100 py-8 px-7 flex flex-row justify-between'>
        <div>
            <p className='font-bold'>Orden: #001</p>
            <p>200 ARS($)</p>
        </div>
        <Button />
        </div>
  )
}

export default Footer
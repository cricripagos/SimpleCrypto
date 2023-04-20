import React from 'react'
import { useSelector } from 'react-redux'

const Step = (item) => {
    const {step} = useSelector(state => state.interactions)

    console.log('step', step, step >= item.step)
  return (
    <div className='relative'>
    <div className='flex flex-col items-center px-4'>
        <div className={`border-2 ${step >= item.step ? 'text-green-1 bg-white' : 'text-white'} p-1 rounded-full `}>
        {item.svg}
        </div>
        <p className='text-white text-center text-sm mt-2 leading-tight'>{item.name}</p>
    </div>
    {item.step < 3 &&
    <div className='h-0.5 w-20 bg-white absolute -right-9 top-4' />
    }
    </ div>
  )
}

export default Step
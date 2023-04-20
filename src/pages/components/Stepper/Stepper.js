import React from 'react'
import Step from './Step'
import { steps } from './steps'

const Stepper = () => {

    console.log('Passing down step...', steps[0])

  return (
    <div className='flex'>
        {steps.map((step, index) => {
            return <Step {...step} index={index}/>
        })}
    </div>
  )
}

export default Stepper
import React from 'react'
import Step from './Step'
import steps from './steps'

const Stepper = () => {

  return (
    <div className='flex'>
      {steps.map((step, index) => {
        return <Step key={index} {...step} index={index} />
      })}
    </div>
  )
}

export default Stepper

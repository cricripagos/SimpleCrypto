import React from 'react'

const Balance = ({balance}) => {
  return (
    <div className='flex flex-row items-center'>
        <p className="text-xs mr-2 text-right">Balance {balance ? 'suficiente' : 'insuficiente'}</p>
        {balance ? 
        <img src='https://www.pngmart.com/files/16/Green-Check-Mark-Transparent-Background.png' className='h-3 w-3'/> :
        <img src='https://img.freepik.com/free-icon/multiply_318-350486.jpg' className='h-3 w-3' /> }
    </div>
  )
}

export default Balance
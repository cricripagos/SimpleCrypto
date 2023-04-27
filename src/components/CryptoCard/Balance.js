
const Balance = ({balance}) => {
  return (
    <div className='flex flex-row items-center'>
        <p className="text-xs mr-2 text-right">Balance {balance ? 'suficiente' : 'insuficiente'}</p>
        {balance ? 
        <img src='https://www.pngmart.com/files/16/Green-Check-Mark-Transparent-Background.png' width={12} height={12} alt='Balance OK'/> :
        <img src='https://img.freepik.com/free-icon/multiply_318-350486.jpg' width={12} height={12} alt='Balance insufficient' /> }
    </div>
  )
}

export default Balance
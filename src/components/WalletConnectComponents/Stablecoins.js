import Image from "next/image"
import BSC from '../../../public/images/stablecoins/BSC.png'
import BUSD from '../../../public/images/stablecoins/BUSD.png'
import DAI from '../../../public/images/stablecoins/DAI.svg'
import MATIC from '../../../public/images/stablecoins/MATIC.png'
import USDC from '../../../public/images/stablecoins/USDC.svg'
import USDT from '../../../public/images/stablecoins/USDT.svg'




const Stablecoins = () => {
  return (
    <div className="flex flex-row py-2">
        <Image src={BUSD} 
              width={22}
              height={22}
              alt="Picture of the author"
              className="mx-1"
        />
                <Image src={DAI} 
              width={22}
              height={22}
              alt="Picture of the author"
              className="mx-1"
        />
                        <Image src={USDC} 
              width={22}
              height={22}
              alt="Picture of the author"
              className="mx-1"
        />
                                <Image src={USDT} 
              width={22}
              height={22}
              alt="Picture of the author"
              className="mx-1"
        />
                        <Image src={MATIC} 
              width={22}
              height={22}
              alt="Picture of the author"
              className="mx-1"
        />
                                <Image src={BSC} 
              width={22}
              height={22}
              alt="Picture of the author"
              className="mx-1"
        />
    </div>
  )
}

export default Stablecoins
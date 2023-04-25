import { Footer, InputComponent, Layout } from "@components/components"
import { setBtnDisabled } from "@/store/reducers/interactions"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"

function Step1() {
  const [disabled, setDisabled] = useState(true)
  const { fiat_amount } = useSelector(state => state.order)
  const dispatch = useDispatch()

  useEffect(() => {
    const amount = parseFloat(fiat_amount)
    if (fiat_amount !== '' && fiat_amount !== 0) {
      dispatch(setBtnDisabled(false))
    } else {
      dispatch(setBtnDisabled(true))
    }
  }, [fiat_amount])

  return (
    <Layout>
      <div className="flex flex-col h-screen relative">
        <InputComponent />
        <Footer />
      </div>
    </Layout>
  )
}

export default Step1
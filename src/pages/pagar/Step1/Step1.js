import { Footer, InputComponent, Layout } from "@/pages/components/components"
import { setBtnDisabled } from "@/pages/store/reducers/interactions"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"

function Step1() {
  const [disabled, setDisabled] = useState(true)
  const { fiat_amount } = useSelector(state => state.order)
  // const { btn_disabled } = useSelector(state => state.interactions)
  // console.log('btn_disabled', btn_disabled)
  const dispatch = useDispatch()

  useEffect(() => {
    console.log('fiat_amount', fiat_amount !== '')
    if (fiat_amount !== '') {
      dispatch(setBtnDisabled(false))
    } else {
      dispatch(setBtnDisabled(true))
    }
  })

  return (
    <Layout>
    <div className="flex flex-col h-screen justify-between">
    <InputComponent />
    <Footer btn_msg='Continuar'/>
    </div>
    </Layout>
  )
}

export default Step1
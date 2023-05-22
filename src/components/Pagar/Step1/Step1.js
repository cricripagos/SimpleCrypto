import StepWrapper from "@/components/Wrappers/StepWrapper"
import { setBtnDisabled } from "@/store/reducers/interactions"
import { Footer, InputComponent } from "@components/components"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"

function Step1() {
  const { fiat_amount } = useSelector(state => state.order)
  const dispatch = useDispatch()

  useEffect(() => {
    if (fiat_amount !== '' && fiat_amount !== 0) {
      dispatch(setBtnDisabled(false))
    } else {
      dispatch(setBtnDisabled(true))
    }
  }, [fiat_amount])


  return (
    <StepWrapper>
        <InputComponent />
        <Footer />
    </StepWrapper>
  )
}

export default Step1
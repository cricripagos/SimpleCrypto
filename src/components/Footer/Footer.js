import {
  resetBtnText,
  resetToast,
  setBtnDisabled,
  setBtnLoading,
  setBtnText,
} from "@/store/reducers/interactions";
import { resetOrder } from "@/store/reducers/order";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Button from "../Buttons/Button";

const Footer = () => {
  const { fiat_amount, payment_method } = useSelector((state) => state.order);
  const { step, btn_loading } = useSelector((state) => state.interactions);
  const [continueText, setContinueText] = useState("Continuar");
  const {btn_text} = useSelector((state) => state.interactions);
  const dispatch = useDispatch();

  // Revisa que el monto sea mayor a 0 para habilitar el boton o no venga vacío
  useEffect(() => {
    if (fiat_amount != "" && fiat_amount > 0) {
      dispatch(setBtnDisabled(false));
    } else {
      dispatch(setBtnDisabled(true));
    }
  }, [fiat_amount]);

  useEffect(() => {
    if (step === 1) {
      dispatch(resetBtnText())
      dispatch(resetToast());
      dispatch(resetOrder());
      dispatch(setBtnLoading(false));
    } else {
      if (payment_method || step === 3) {
        if (btn_loading) {
          dispatch(setBtnText("Cargando..."))
        } else {
          dispatch(setBtnText("Pagar"))
        }
      } else {
        dispatch(resetBtnText())
      }
    }

    if(!payment_method){
      dispatch(setBtnDisabled(true))
    }
  }, [payment_method, btn_loading]);


  return (
    <div className="bg-stone-100 py-5 px-7 flex flex-row justify-between w-full max-w-md flex-1/3 ">
      <div>
        <p className="font-bold">Orden: #001</p>
        <p>{fiat_amount} ARS($)</p>
      </div>
      <div className="flex flex-row">
        {step >= 2 && <Button filled={false} text="Volver" action="back" />}
        <Button filled={true} text={btn_text} action="forward" />
      </div>
    </div>
  );
};

export default Footer;

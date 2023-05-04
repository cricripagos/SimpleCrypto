import { setBtnDisabled, setBtnLoading } from "@/store/reducers/interactions";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Button from "../Buttons/Button";

const Footer = () => {
  const { fiat_amount, payment_method } = useSelector((state) => state.order);
  const { step, btn_loading } = useSelector((state) => state.interactions);
  const [continueText, setContinueText] = useState("Continuar");
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
      setContinueText("Continuar");
      dispatch(setBtnLoading(false));
    } else {
      if (payment_method) {
        if (btn_loading) {
          setContinueText("Cargando...");
        } else {
          setContinueText("Pagar");
        }
      }
    }
  }, [payment_method, btn_loading]);

  /* Fix temporal: si el payment method es BTC, el texto del boton es pagar, sino es continuar */
  /// El fix esta mal pq no debería estar hardcodeado BTC
  useEffect(() => {
    if (step >= 2 && payment_method == 2) {
      setContinueText("Pagar");
    } else {
      setContinueText("Continuar");
    }
  }, [step]);

  return (
    <div className="bg-stone-100 py-5 px-7 flex flex-row justify-between fixed bottom-0 w-full max-w-md">
      <div>
        <p className="font-bold">Orden: #001</p>
        <p>{fiat_amount} ARS($)</p>
      </div>
      <div className="flex">
        {step === 2 && <Button filled={false} text="Volver" action="back" />}
        <Button filled={true} text={continueText} action="forward" />
      </div>
    </div>
  );
};

export default Footer;

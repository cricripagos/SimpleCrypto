import { setFiatAmount } from "@/store/reducers/order";
import { useDispatch, useSelector } from "react-redux";
import Header from "../Header/Header";

const InputComponent = () => {
  const { fiat_amount } = useSelector((state) => state.order);
  const dispatch = useDispatch();

  const onChange = (e) => {
    const regex = /^\d+$/;

    if (e.target.value === "" || regex.test(e.target.value)) {
      if (e.target.value === "") {
        dispatch(setFiatAmount(""));
      } else {
        dispatch(setFiatAmount(parseFloat(e.target.value)));
      }

    }
  };

  return (
    <div className="flex flex-2/3 bg-green-1 rounded-b-lg justify-center items-center flex-col pb-5 px-7">
      <Header />
      <p className="text-stone-200 pt-10">
        Ingresar monto en pesos argentinos ($ARS)
      </p>
      <div className="flex flex-row content-center items-center py-3">
        <p className="text-4xl pr-5 text-stone-200">ARS</p>
        <input
          id="amount"
          placeholder="0000"
          value={fiat_amount}
          type="number"
          className="bg-transparent text-stone-200 placeholder:text-stone-400 text-6xl focus:border-transparent mt-3 focus:outline-none w-full"
          onChange={onChange}
          autoFocus={true}
        />
      </div>
    </div>
  );
};

export default InputComponent;

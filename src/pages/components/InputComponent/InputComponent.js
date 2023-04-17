
const InputComponent = () => {
  return (
    <div className="flex bg-green-1 rounded-b-lg justify-center items-center flex-col py-7 px-7">
      <p className="self-start py-3 text-white text-lg">Estas pagando en: Rochi Personal</p>
      <div className="w-full bg-stone-300 p-6">TAB BAR</div>
      <p className="text-stone-200 pt-10">Ingresar monto en pesos argentinos ($ARS)</p>
      <div className="flex flex-row content-center items-center py-3">
        <p className="text-4xl pr-5 text-stone-200">ARS</p>
        <input placeholder="0000.00" type='number' className="bg-transparent text-stone-200 placeholder:text-stone-400 text-6xl focus:border-transparent mt-3 focus:outline-none w-full" />
        </div>
    </div> 
  )
}

export default InputComponent
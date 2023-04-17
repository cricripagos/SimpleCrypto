import { useState } from "react";

const App = () => {
  const [value, setValue] = useState("");

  const handleChange = (event) => {
    const result = event.target.value.replace(/\D/g, "");

    setValue(result);
  };

  console.log(value);
  console.log(typeof value);
  console.log(Number(value));

  return (
    <div>
      <div>
        <h1>Cantidad en satoshis a pagar:</h1>
      </div>
      <input
        type="text"
        placeholder="Your fav number"
        value={value}
        onChange={handleChange}
      />
    </div>
  );
};

export default App;

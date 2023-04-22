import { supabase } from "@/helpers/hooks/useSupabase";
import { avgPrice } from "@/helpers/quotes";

function App({ payment_options }) {
  return (
    <>
      <div>
        <ul>
          {payment_options.map((payment_option) => (
            <li key={payment_option.id}>
              {payment_option.name}: ${payment_option.price}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default App;

export async function getServerSideProps() {
  // Traemos los datos de la tabla payment_options
  let { data } = await supabase.from("payment_options").select();

  // Iteramos sobre los datos y agregamos el precio promedio sobre las cotizaciones de criptoya.com

  for (const [idx, coin] of data.entries()) {
    data[idx].price = await avgPrice(coin.symbol);
  }

  return {
    props: {
      payment_options: data,
    },
  };
}

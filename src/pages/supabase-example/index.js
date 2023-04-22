//import { supabase } from "@lib/hooks/useSupabase";

import { supabase } from "@/helpers/hooks/useSupabase";

function Page({ networks, merchants }) {
  return (
    <>
      <div>
        <ul>
          {networks.map((network) => (
            <li key={network.id}>{network.name}</li>
          ))}
        </ul>
      </div>
      <div>
        <ul>
          {merchants.map((merchant) => (
            <li key={merchant.id}>{merchant.name}</li>
          ))}
        </ul>
      </div>
    </>
  );
}

export async function getServerSideProps() {
  let { data } = await supabase.from("networks").select();

  return {
    props: {
      networks: data,
      merchants: data,
    },
  };
}

export default Page;

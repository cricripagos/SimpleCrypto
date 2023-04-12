import { supabase } from "@lib/supabaseClient";

function Page({ networks }) {
  return (
    <ul>
      {networks.map((network) => (
        <li key={network.id}>{network.name}</li>
      ))}
    </ul>
  );
}

export async function getServerSideProps() {
  let { data } = await supabase.from("networks").select();
  return {
    props: {
      networks: data,
    },
  };
}

export default Page;

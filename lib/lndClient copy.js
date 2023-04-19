import { createLnRpc } from "@radar/lnrpc";

export const lndClient = await createLnRpc({
  server: process.env.NEXT_PUBLIC_HOST_PORT,
  tls: false,
  macaroon: process.env.NEXT_PUBLIC_MACAROON,
});

import { lndClient } from "@lib/lndClient";
import WeakSet from "@ungap/weakset";

const getCircularReplacer = () => {
  const seen = new WeakSet();
  return (key, value) => {
    if (typeof value === "object" && value !== null) {
      if (seen.has(value)) {
        return;
      }
      seen.add(value);
    }
    return value;
  };
};

export default async function getNodeInfo(req, res) {
  //const merchant = JSON.parse(req.body).merchant;
  //const input = JSON.parse(req.body).amount;

  //console.log("Procesando ", input, " satoshis");

  const resp = await lndClient.getInfo({}, function (err, response) {
    if (err) {
      console.log("Error: " + err);
    }
    response;
  });

  const info = JSON.stringify(await resp, getCircularReplacer());

  res.status(200).json(info);
}

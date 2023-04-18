// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default function handler(req, res) {
  const input = JSON.parse(req.body).amount;

  console.log("Procesando ", input, " satoshis");

  res.status(200).json({ name: "John Doe" });
}

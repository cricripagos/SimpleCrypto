const createPayment = async (req, res) => {
  const fiat_amount = JSON.parse(req.body).fiat_amount;

  const payload = {
    data: {
      type: "Payment",
      attributes: {
        amount: parseInt(fiat_amount),
      },
      relationships: {
        paymentMethod: {
          data: {
            id: "5",
            type: "PaymentMethod",
          },
        },
        sale: {
          data: {
            id: "1",
            type: "Sale",
          },
        },
      },
    },
  };

  // Add fetch request to Hugging Face
  const response = await fetch(`https://api.fu.do/v1alpha1/payments`, {
    headers: {
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_FUDO}`,
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify(payload),
  });

  console.log(response);

  // Check for different statuses to send proper payload
  if (response.ok) {
    res.status(200).json(response);
  } else if (response.status === 503) {
    const json = await response.json();
    res.status(503).json(json);
  } else {
    const json = await response.json();
    res.status(response.status).json({ error: response.statusText });
  }
};

export default createPayment;

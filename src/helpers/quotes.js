const url_base_criptoya = "https://criptoya.com/api/";

export const avgPrice = async (symbol) => {
  const pair = symbol + "/ars/1";

  const quote = await fetch(url_base_criptoya + pair)
    .then((response) => response.json())
    .then((data) => {
      const keys = Object.keys(data);
      const trustedKeys = [
        "bitex",
        "ripio",
        "satoshiTango",
        "buenbit",
        "bitso",
        "fiwind",
        "binance",
        "lemoncash",
        "belo",
        "letsbit",
        "kriptonmarket",
      ];
      let sumAsk = 0;
      let trustedExchanges = 0;

      for (const key of keys) {
        if (trustedKeys.includes(key)) {
          sumAsk += data[key].ask;
          trustedExchanges += 1;
        }
      }

      const averageAsk = sumAsk / trustedExchanges;
      return averageAsk;
    });
  return quote;
};

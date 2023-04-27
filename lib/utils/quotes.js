const url_base_criptoya = "https://criptoya.com/api/";

const avgPrice = async (symbol) => {
  const pair = symbol + "/ars/1";

  const quote = await fetch(url_base_criptoya + pair)
    .then((response) => response.json())
    .then((data) => {
      const keys = Object.keys(data);
      console.log(keys);
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
      ];
      let sumAsk = 0;
      let trustedExchanges = 0;

      for (const key of keys) {
        console.log(data[key]);
        if (trustedKeys.includes(data[key])) {
          sumAsk += data[key].ask;
          trustedExchanges += 1;
        }
      }

      const averageAsk = sumAsk / trustedExchanges;
      return averageAsk;
    });
  return quote;
};

avgPrice("btc").then((data) => console.log(data));

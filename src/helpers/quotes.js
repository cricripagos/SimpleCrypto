const url_base_criptoya = "https://criptoya.com/api/";

export const avgPrice = async (symbol) => {
  const pair = symbol + "/ars/1";

  const quote = await fetch(url_base_criptoya + pair)
    .then((response) => response.json())
    .then((data) => {
      const keys = Object.keys(data);
      let sumAsk = 0;

      for (const key of keys) {
        sumAsk += data[key].ask;
      }

      const averageAsk = sumAsk / keys.length;
      return averageAsk;
    });
  return quote;
};
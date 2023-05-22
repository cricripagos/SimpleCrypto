import { parseEther, parseUnits } from "ethers/lib/utils.js";
var Promise = require("promise");
export const ethToWei = () => {
  return parseEther("1");
};

export const asyncCallWithTimeout = async (asyncPromise, timeLimit) => {
  let timeoutHandle;

  const timeoutPromise = new Promise((_resolve, reject) => {
    timeoutHandle = setTimeout(
      () =>
        reject(
          new Error("Te has exedido del tiempo para realizar tu transacción")
        ),
      timeLimit
    );
  });

  return Promise.race([asyncPromise, timeoutPromise]).then((result) => {
    // clearTimeout(timeoutHandle);
    return result;
  });
};

export function numberWithCommas(x) {
    x = x.toFixed(0)
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export function formatAmountParse (amount, decimals) {
  if (decimals){
    const is_scientific_notation = /[eE]/.test(amount?.toString());
  
    const formated_amount = amount && !is_scientific_notation ? parseUnits(
      amount.toString().slice(0, decimals),
      decimals
    ) : 0
  
    return formated_amount
  } else {
    return amount
  }

}

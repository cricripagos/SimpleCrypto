import { parseEther } from "ethers/lib/utils.js";
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
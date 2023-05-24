// pages/transactions/index.js
import useMerchantTransactions from "@/helpers/hooks/useMerchantTransactions";

const MerchantTransactions = () => {
  const merchantId = 3; // Replace with the merchantId you want to monitor
  const { transactions, totalFiatAmount, totalCryptoAmount } =
    useMerchantTransactions(merchantId);

  return (
    <div>
      <h1>Transactions for Merchant {merchantId}</h1>
      <h2>Total Fiat Amount: {totalFiatAmount}</h2>
      <h2>Total Crypto Amount: {totalCryptoAmount}</h2>
      <ul>
        {transactions.map((transaction, index) => (
          <li key={index}>
            <p>Transaction ID: {transaction.id}</p>
            <p>Fiat Amount: {transaction.fiat_total_amount}</p>
            <p>Crypto Amount: {transaction.crypto_total_amount}</p>
            <p>Status: {transaction.payment_status}</p>
            {/* Add more details here as needed */}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MerchantTransactions;

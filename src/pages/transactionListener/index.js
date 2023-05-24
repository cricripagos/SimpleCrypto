import useMerchantTransactions from "@/helpers/hooks/useMerchantTransactions";

const MerchantTransactions = () => {
  const merchantId = 3; // replace with the ID of the merchant you want to query
  const { transactions } = useMerchantTransactions(merchantId);

  return (
    <div>
      <h1>Transactions for Merchant {merchantId}</h1>
      <ul>
        {transactions.map((transaction, index) => (
          <li key={index}>
            Transaction ID: {transaction.id} - Status:{" "}
            {transaction.payment_status}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MerchantTransactions;

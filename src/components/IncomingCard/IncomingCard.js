import { useSelector } from "react-redux"

const IncomingCard = ({transaction}) => {
  const {payment} = useSelector(state => state.options)
  const method = payment?.find((method) => method.id === transaction?.payment_option)
  const transaction_date = new Date(transaction?.created_at)
  console.log('transaction date', transaction)

  return (
        <div className="flex m-5 p-5 rounded-md drop-shadow-sm ring-2 ring-gray-100 justify-between">
          <div className="flex flex-row">
            <div className="flex items-center justify-center">
            <img
              className="inline-block h-10 w-10 rounded-md"
              src={method?.logo_url}
              alt="Logo"
            />
            </div>
            <div className="ml-3">
              <p className="text-lg font-semibold">{method?.symbol}</p>
              <p className="text-sm text-gray-400">{transaction_date.toLocaleDateString()}</p>
            </div>
            </div>
            <div className="flex flex-col items-end">
              <p className="text-base">{transaction?.fiat_total_amount
} {transaction?.fiat_currency}</p>
</div>
        </div>
  )
}

export default IncomingCard
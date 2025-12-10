const { Parser } = require('json2csv')

function exportTransactionsToCSV(transactions) {
  const formattedTransactions = transactions.map((tx) => ({
    // Format date as dd/mm/yyyy
    date: new Date(tx.date).toLocaleDateString('en-GB', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    }),
    merchant: tx.merchant,
    'category.categoryName': tx.category.categoryName,

    // Format amount with EUR
    amount: `${tx.amount < 0 ? '-' : ''}${Math.abs(tx.amount).toFixed(2)} EUR`,
  }))

  const fields = [
    { label: 'Date', value: 'date' },
    { label: 'Merchant', value: 'merchant' },
    { label: 'Category Name', value: 'category.categoryName' },
    { label: 'Amount', value: 'amount' },
  ]

  const parser = new Parser({ fields })
  return parser.parse(formattedTransactions)
}

module.exports = exportTransactionsToCSV

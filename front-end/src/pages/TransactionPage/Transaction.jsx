import * as React from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select'
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableCell,
  TableBody,
} from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'

import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog'
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from '@/components/ui/dropdown-menu'

import { Calendar } from '@/components/ui/calendar'

import {
  ChartPie,
  ChevronLeft,
  ChevronRight,
  Download,
  Plus,
  Sparkles,
} from 'lucide-react'

import { Legend, Pie, PieChart } from 'recharts'
import ReactPaginate from 'react-paginate'
import { useState } from 'react'
import { List } from 'lucide-react'
import { useEffect } from 'react'
import NewTransactionDialog from './NewTransactionDialog'
import useWastefulCategoryData from '@/hooks/useWastefulCategoryData'
import useWastefulTransactions from '@/hooks/useWastefulTransactions'
import useAISuggestion from '@/hooks/useAISuggestion'

function Transaction() {
  const [date, setDate] = useState()
  const [transactionListOffset, setTransactionListOffset] = useState(0)
  const [wasteSpendingListOffset, setWasteSpendingListOffset] = useState(0)
  const [transactions, setTransactions] = useState([])
  const [transactionsLoading, setTransactionsLoading] = useState(false)
  const [transactionsError, setTransactionsError] = useState(null)
  const [newTransactionName, setNewTransactionName] = useState('')
  const [newTransactionAmount, setNewTransactionAmount] = useState('')
  const [newTransactionCategory, setNewTransactionCategory] = useState('')
  const [newTransactionDate, setNewTransactionDate] = useState(new Date())
  const [isAddTransactionDialogOpen, setIsAddTransactionDialogOpen] =
    useState(false)
  const [duplicatePercentage, setDuplicatePercentage] = useState(0)
  const [inefficentPercentage, setInefficentPercentage] = useState(0)
  const [totalSpending, setTotalSpending] = useState(0)
  const { data: chartData, loading } = useWastefulCategoryData()
  const { transactions: wasteChartData, loading: wasteLoading } =
    useWastefulTransactions()
  const [addTransactionLoading, setAddTransactionLoading] = useState(false)

  const { data: aiText, loading: aiLoading, error: aiError } = useAISuggestion()

  useEffect(() => {
    const fetchData = async () => {
      try {
        setTransactionsLoading(true)
        const token = sessionStorage.getItem('token')
        if (!token) {
          throw new Error('Token not found')
        }
        const response = await fetch('/api/transactions', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        if (!response.ok) {
          throw new Error(
            `Response Status ${response.status}: ${response.statusText}`
          )
        }
        const data = await response.json()
        setTransactions(data)
      } catch (err) {
        setTransactionsError(err.message)
      } finally {
        setTransactionsLoading(false)
      }
    }
    fetchData()
  }, [])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = sessionStorage.getItem('token')
        if (!token) {
          throw new Error('Token not found')
        }
        const response = await fetch('/api/llm/percentage', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        if (!response.ok) {
          throw new Error('Failed to fetch analysis percentages')
        }
        const data = await response.json()
        setDuplicatePercentage(data.duplicatePercentage)
        setInefficentPercentage(data.inefficentPercentage)
        setTotalSpending(data.totalSpendings)
      } catch (err) {
        console.error(err)
        alert(err.message)
      }
    }
    fetchData()
  }, [])

  const addTransaction = async (e) => {
    e.preventDefault()
    setAddTransactionLoading(true)
    const token = sessionStorage.getItem('token')
    if (!token) {
      alert('User not authenticated')
      return
    }
    try {
      const response = await fetch('/api/transactions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          date: newTransactionDate,
          merchant: newTransactionName,
          category: {
            categoryName:
              newTransactionAmount >= 0 ? 'Income' : newTransactionCategory,
            categoryColor: 'null', // hardcoded for now
          },
          amount: newTransactionAmount,
        }),
      })
      const data = await response.json()
      if (!response.ok) {
        throw new Error(
          `Failed to add transaction ${response.status}: ${response.statusText}`
        )
      }
      setTransactions((prev) => [...prev, data])
      setIsAddTransactionDialogOpen(false)
      window.location.reload()
    } catch (err) {
      alert(`Error adding transaction: ${err.message}`)
    } finally {
      setAddTransactionLoading(false)
    }
  }

  const handleDeleteTransaction = async (transactionId) => {
    const token = sessionStorage.getItem('token')
    if (!token) {
      alert('User not authenticated')
      return
    }
    try {
      const response = await fetch(`/api/transactions/${transactionId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      if (!response.ok) {
        throw new Error(
          `Failed to delete transaction ${response.status}: ${response.statusText}`
        )
      }
      setTransactions((prev) => prev.filter((tx) => tx._id !== transactionId))
      window.location.reload()
    } catch (err) {
      alert(`Error deleting transaction: ${err.message}`)
    }
  }

  return (
    <div className='p-6 flex gap-6 flex-col bg-gray-50 dark:bg-gray-900'>
      {/* Header Card */}

      {/* Filters */}
      <div className='flex items-center justify-between'>
        <h1 className='text-2xl font-bold'>Transactions</h1>
        {/* Add Transaction Dialog */}
        <div className='flex gap-4'>
          <NewTransactionDialog
            isAddTransactionDialogOpen={isAddTransactionDialogOpen}
            setIsAddTransactionDialogOpen={setIsAddTransactionDialogOpen}
            newTransactionName={newTransactionName}
            setNewTransactionName={setNewTransactionName}
            newTransactionAmount={newTransactionAmount}
            setNewTransactionAmount={setNewTransactionAmount}
            newTransactionCategory={newTransactionCategory}
            setNewTransactionCategory={setNewTransactionCategory}
            newTransactionDate={newTransactionDate}
            setNewTransactionDate={setNewTransactionDate}
            addTransaction={addTransaction}
            addLoading={addTransactionLoading}></NewTransactionDialog>
          <Button
            variant='outline'
            onClick={async () => {
              const token = sessionStorage.getItem('token')
              if (!token) return alert('User not authenticated')
              try {
                const response = await fetch('/api/transactions/export/csv', {
                  headers: { Authorization: `Bearer ${token}` },
                })
                if (!response.ok) throw new Error('Failed to export CSV')
                const blob = await response.blob()
                const url = window.URL.createObjectURL(blob)
                const link = document.createElement('a')
                link.href = url
                link.setAttribute(
                  'download',
                  `transactions_${new Date().toISOString().slice(0, 10)}.csv`
                )
                document.body.appendChild(link)
                link.click()
                link.remove()
              } catch (err) {
                alert(err.message)
              }
            }}>
            Download CSV
            <Download />
          </Button>
        </div>
      </div>

      {/* Transaction Table */}
      <div className='rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700'>
        <Table>
          <TableHeader className='bg-[#f4f4f4] dark:bg-gray-700'>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className='dark:bg-gray-800'>
            {transactions
              .sort((a, b) => new Date(b.date) - new Date(a.date))
              .slice(0 + transactionListOffset, 5 + transactionListOffset)
              .map((tx, index) => (
                <TableRow key={index}>
                  <TableCell>
                    {new Date(tx.date).toLocaleDateString('en-GB', {
                      day: '2-digit',
                      month: 'short',
                      year: 'numeric',
                    })}
                  </TableCell>
                  <TableCell>{tx.merchant}</TableCell>
                  <TableCell>
                    <Badge>{tx.category.categoryName}</Badge>
                  </TableCell>
                  <TableCell>{tx.amount}</TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant='ghost'>⋮</Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <DropdownMenuItem
                          onClick={() => {
                            handleDeleteTransaction(tx._id)
                          }}>
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
        <div className='flex justify-between items-center border-t border-gray-300 dark:border-gray-700 dark:bg-gray-800'>
          <div className='p-5 text-gray-600 dark:text-gray-400'>
            {transactions.length <= 0 ? (
              <>{'No data'}</>
            ) : (
              <>
                Showing{' '}
                <span className='font-bold'>
                  {1 + transactionListOffset}-
                  {transactions.slice(
                    0 + transactionListOffset,
                    5 + transactionListOffset
                  ).length + transactionListOffset}
                </span>{' '}
                of <span className='font-bold'>{transactions.length}</span> data
              </>
            )}
          </div>
          <ReactPaginate
            pageCount={Math.ceil(transactions.length / 5)}
            onPageChange={(e) => {
              console.log(e.selected * 5)
              setTransactionListOffset(e.selected * 5)
            }}
            forcePage={0}
            previousLabel={<ChevronLeft className='inline-block' />}
            nextLabel={<ChevronRight className='inline-block' />}
            breakLabel='…'
            pageRangeDisplayed={5}
            containerClassName='flex items-center rounded-sm m-5 overflow-hidden shadow-xs'
            previousClassName='p-2 rounded-l-sm hover:bg-gray-100 border-y border-l border-gray-300'
            nextClassName='p-2 rounded-r-sm border border-gray-300 hover:bg-gray-100'
            pageClassName='p-2 px-4 border-y border-l font-medium'
            pageLinkClassName=''
            activeClassName='bg-blue-600 text-white border-blue-600'
            activeLinkClassName=''
            disabledClassName='opacity-50 pointer-events-none'
          />
        </div>
      </div>
      <div className='flex flex-col gap-3'>
        <span className='font-medium'>Transaction Overview</span>
        <div className='rounded-xl border border-gray-300 shadow-xs overflow-hidden dark:bg-gray-800 dark:border-gray-700'>
          <div className='text-gray-500 p-3 flex gap-3 items-center text-sm font-medium border-b border-gray-300 dark:border-gray-700'>
            <ChartPie size={16} />
            Spending Analysis
          </div>
          <div className='flex sm:flex-row flex-col w-full overflow-hidden'>
            <div className='h-40 flex-1 relative border-b sm:border-r p-7 border-gray-100 dark:border-gray-700 flex flex-col justify-center items-center overflow-hidden'>
              <div className='w-[64%] h-72 left-0 top-[100px] absolute bg-[conic-gradient(from_12deg_at_50.00%_50.00%,rgba(72.16,255,84.35,0.25)_0deg,rgba(202.75,255,235.84,0.25)_360deg)] rounded-full blur-2xl' />
              <div className='flex py-1.5 flex-row w-full items-center justify-between'>
                <span className='text-gray-500 dark:text-gray-300 text-sm font-medium'>
                  Total Spendings
                </span>
                <span className='text-red-500 text-sm font-medium'></span>
              </div>
              <div className='text-black dark:text-gray-100 text-3xl font-medium self-start'>
                €{totalSpending?.toFixed(2) || 0}
              </div>
            </div>
            <div className='h-40 flex-1 relative border-b sm:border-r p-7 border-gray-100 dark:border-gray-700 flex flex-col justify-center items-center overflow-hidden'>
              <div className='w-[64%] h-72 left-0 top-[100px] absolute bg-[conic-gradient(from_12deg_at_50.00%_50.00%,rgba(72.16,215.38,255,0.25)_0deg,rgba(202.75,255,235.84,0.25)_360deg)] rounded-full blur-2xl' />
              <div className='flex py-1.5 flex-row w-full items-center justify-between'>
                <span className='text-gray-500 dark:text-gray-300 text-sm font-medium'>
                  Duplicates
                </span>
                <span className='text-gray-500 text-sm font-medium'>
                  {/* {duplicatePercentage}% */}
                </span>
              </div>
              <div className='text-black dark:text-gray-100 text-3xl font-medium self-start'>
                {duplicatePercentage && duplicatePercentage !== 0
                  ? duplicatePercentage?.toFixed(2)
                  : 0}
                %
              </div>
            </div>
            <div className='h-40 flex-1 relative border-b p-7 border-gray-100 dark:border-gray-700 flex flex-col justify-center items-center overflow-hidden'>
              <div className='w-[64%] h-72 left-0 top-[100px] absolute bg-[conic-gradient(from_12deg_at_50.00%_50.00%,rgba(255,166.63,72.16,0.25)_0deg,rgba(251,181.70,152,0.25)_360deg)] rounded-full blur-2xl' />
              <div className='flex py-1.5 flex-row w-full items-center justify-between'>
                <span className='text-gray-500 dark:text-gray-300 text-sm font-medium'>
                  Inefficients
                </span>
                <span className='text-red-500 text-sm font-medium'></span>
              </div>
              <div className='text-black dark:text-gray-100 text-3xl font-medium self-start'>
                {inefficentPercentage && inefficentPercentage !== 0
                  ? inefficentPercentage?.toFixed(2)
                  : 0}
                %
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='flex flex-col gap-3'>
        <span className='font-medium'>Suggestions</span>
        <div className='rounded-xl border border-gray-300 dark:border-gray-700 shadow-xs overflow-hidden dark:bg-gray-800'>
          <div className='text-gray-500 p-3 flex gap-3 items-center text-sm font-medium border-b border-gray-300 dark:border-gray-700'>
            <Sparkles size={16} />
            AI Generated
          </div>
          <div className='flex flex-row w-full overflow-hidden'>
            <div className='flex-1 relative p-7 border-gray-100 flex flex-col justify-center items-center overflow-hidden'>
              <div className='w-[127%] h-[400px] left-0 top-[43px] absolute bg-[conic-gradient(from_334deg_at_50.00%_50.00%,rgba(120.92,72.16,255,0.15)_48deg,rgba(243.68,202.75,255,0.15)_360deg)] rounded-full blur-2xl' />
              {aiLoading ? (
                <div>Loading...</div>
              ) : aiError ? (
                <div>Error loading suggestions.</div>
              ) : (
                <div>{aiText}</div>
              )}
            </div>
          </div>
        </div>
      </div>
      {/* Spending Analysis Chart & Table */}
      <div className='flex flex-col md:flex-row w-full gap-4'>
        <div className='flex flex-col flex-1 gap-3'>
          <div className='rounded-xl border border-gray-300 dark:border-gray-700 shadow-xs overflow-hidden dark:bg-gray-800'>
            <div className='text-gray-500 p-3 flex gap-3 items-center text-sm font-medium border-b border-gray-300 dark:border-gray-700'>
              <ChartPie size={16} />
              Spending Analysis
            </div>
            <div className='flex flex-row w-full'>
              <div className='flex-1 relative p-7 border-gray-100 flex flex-col justify-center items-center'>
                <h1 className='font-semibold'>Spending Analysis</h1>
                <h2 className='text-sm text-[#60646C] pt-[0.313rem]'>
                  {/* November 2025 */}
                  {/* Get current month and year */}
                  {new Date().toLocaleString('default', { month: 'long' })}{' '}
                  {new Date().getFullYear()}
                </h2>
                <PieChart
                  style={{
                    width: '100%',
                    aspectRatio: 1,
                  }}
                  margin={{ top: 20, right: 30, bottom: 20, left: 30 }}
                  responsive
                  className='pointer-events-none select-none touch-none'>
                  <Pie
                    data={chartData}
                    dataKey='percentage'
                    labelLine={true}
                    outerRadius='75%'
                    // FIX 3: Ensure the label function returns clean text
                    // isAnimationActive={false}
                    label={({ name, percent }) =>
                      `${(percent * 100)?.toFixed(0)}%`
                    }
                    nameKey='category'
                  />
                  <Legend
                    layout='horizontal' // or "vertical"
                    align='center'
                    wrapperStyle={{ padding: '10px 0' }}
                  />
                </PieChart>
              </div>
            </div>
          </div>
        </div>
        <div className='flex flex-row flex-2 gap-4'>
          <div className='flex w-full flex-col gap-3'>
            <div className='rounded-xl border w-full border-gray-300 dark:border-gray-700 dark:bg-gray-800 shadow-xs overflow-hidden'>
              <div className='text-gray-500 p-3 flex gap-3 items-center text-sm font-medium border-b border-gray-300 dark:border-gray-700'>
                <List size={16} />
                Wasteful Spendings
              </div>
              <div className='flex flex-row w-full overflow-hidden'>
                <div className='overflow-hidden w-full'>
                  <Table>
                    <TableHeader className='bg-[#f4f4f4] hidden'>
                      <TableRow>
                        <TableHead>Date</TableHead>
                        <TableHead>Title</TableHead>
                        <TableHead>Category</TableHead>
                        <TableHead>Amount</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody className='dark:bg-gray-800'>
                      {wasteChartData &&
                        wasteChartData
                          .slice(
                            0 + wasteSpendingListOffset,
                            5 + wasteSpendingListOffset
                          )
                          .map((tx, index) => (
                            <TableRow
                              key={index}
                              className='dark:border-gray-600'>
                              <TableCell>{tx.date}</TableCell>
                              <TableCell>{tx.merchant}</TableCell>
                              <TableCell>
                                <Badge>{tx.category}</Badge>
                              </TableCell>
                              <TableCell>{tx.amount}</TableCell>
                            </TableRow>
                          ))}
                    </TableBody>
                  </Table>
                  <div className='flex justify-between items-center border-t border-gray-300 dark:border-gray-700'>
                    <div className='p-5 text-gray-600 dark:text-gray-400'>
                      Showing{' '}
                      <span className='font-bold'>
                        {1 + wasteSpendingListOffset}-
                        {wasteChartData.slice(
                          0 + wasteSpendingListOffset,
                          5 + wasteSpendingListOffset
                        ).length + wasteSpendingListOffset}
                      </span>{' '}
                      of{' '}
                      <span className='font-bold'>{wasteChartData.length}</span>{' '}
                      data
                    </div>
                    <ReactPaginate
                      pageCount={Math.ceil(wasteChartData.length / 5)}
                      onPageChange={(e) => {
                        console.log(e.selected * 5)
                        setWasteSpendingListOffset(e.selected * 5)
                      }}
                      forcePage={0}
                      previousLabel={<ChevronLeft className='inline-block' />}
                      nextLabel={<ChevronRight className='inline-block' />}
                      breakLabel='…'
                      pageRangeDisplayed={5}
                      containerClassName='flex items-center rounded-sm m-5 overflow-hidden shadow-xs'
                      previousClassName='p-2 rounded-l-sm hover:bg-gray-100 border-y border-l border-gray-300'
                      nextClassName='p-2 rounded-r-sm border border-gray-300 hover:bg-gray-100'
                      pageClassName='p-2 px-4 border-y border-l font-medium'
                      pageLinkClassName=''
                      activeClassName='bg-blue-600 text-white border-blue-600'
                      activeLinkClassName=''
                      disabledClassName='opacity-50 pointer-events-none'
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Transaction

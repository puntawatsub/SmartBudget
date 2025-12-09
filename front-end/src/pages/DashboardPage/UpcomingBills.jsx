import React, { useState, useEffect } from 'react'
import { getUpcomingBills } from '../../api/upcomingBillsApi' // adjust path

const UpcomingBillsCard = () => {
  const [bills, setBills] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const getDaysLeft = (dueDate) => {
    const today = new Date()
    const due = new Date(dueDate)
    const diffTime = due - today
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays
  }

  const formatDeadline = (dueDate) => {
    const daysLeft = getDaysLeft(dueDate)
    if (daysLeft < 0) return `Late by ${Math.abs(daysLeft)} day(s)`
    if (daysLeft === 0) return 'Due today'
    return `${daysLeft} day(s) left`
  }

  useEffect(() => {
    const fetchBills = async () => {
      try {
        setLoading(true)
        const data = await getUpcomingBills()
        setBills(data)
      } catch (err) {
        setError('Failed to fetch bills')
      } finally {
        setLoading(false)
      }
    }

    fetchBills()
  }, [])

  if (loading) return <p className='p-4'>Loading upcoming bills...</p>
  if (error) return <p className='p-4 text-red-500'>{error}</p>

  return (
    <div className='w-full lg:w-[90%] xl:w-[1168px] 2xl:w-[1500px] bg-white dark:bg-gray-800 rounded-[10px] shadow p-4 gap-4 flex flex-col transition-transform duration-300 hover:shadow-lg hover:scale-105 mx-auto'>
      {/* Header */}
      <div className='flex items-center gap-2'>
        <h3 className='font-semibold text-lg text-gray-800 dark:text-gray-100'>
          Upcoming Bills
        </h3>
      </div>

      {/* Table */}
      <table className='w-full text-sm text-gray-800 dark:text-gray-200'>
        <thead>
          <tr className='text-gray-400 dark:text-gray-500 text-left'>
            <th>Deadline</th>
            <th>Date</th>
            <th>Name</th>
            <th className='text-right'>Due</th>
          </tr>
        </thead>

        <tbody>
          {bills.map((b, i) => (
            <tr
              key={b._id || i}
              className='border-t border-gray-200 dark:border-gray-700'>
              <td className='py-2 text-xs font-medium'>
                {getDaysLeft(b.date) < 0 ? (
                  <span className='px-2 py-0.5 bg-red-50 dark:bg-red-900 rounded-full outline outline-[0.5px] outline-offset-[-0.5px] outline-red-500 dark:outline-red-400 inline-flex justify-center items-center text-red-700 dark:text-red-300'>
                    {formatDeadline(b.date)}
                  </span>
                ) : (
                  <span className='text-gray-800 dark:text-gray-100'>
                    {formatDeadline(b.date)}
                  </span>
                )}
              </td>
              <td className='text-gray-700 dark:text-gray-300'>
                {new Date(b.date).toLocaleDateString('en-GB')}
              </td>
              <td className='text-gray-700 dark:text-gray-300'>{b.name}</td>
              <td className='text-right font-medium text-gray-800 dark:text-gray-100'>
                €{b.due}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default UpcomingBillsCard

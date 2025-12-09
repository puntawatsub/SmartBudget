// import React, { useState } from 'react'

// const UpcomingBills = () => {
//   const [period, setPeriod] = useState('week') // <- track selected period

//   const bills = [
//     {
//       deadline: '3 days',
//       date: '18.11.2025',
//       name: 'Spotify',
//       due: '€5.85',
//       status: 'ok',
//     },
//     {
//       deadline: '1 day',
//       date: '14.11.2025',
//       name: 'Netflix',
//       due: '€13.50',
//       status: 'ok',
//     },
//     {
//       deadline: '1 day ago',
//       date: '14.11.2025',
//       name: 'Laundromat',
//       due: '€2.87',
//       status: 'late',
//     },
//   ]

//   return (
//     <div className='w-full max-w-[700px] bg-white rounded-[10px] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] outline outline-1 outline-offset-[-1px] outline-gray-200 flex flex-col p-4 gap-4 transition-transform duration-300 hover:shadow-lg hover:scale-105 cursor-pointer'>
//       {/* Header */}
//       <div className='flex items-center justify-between'>
//         <div className='flex items-center gap-2'>
//           <svg
//             width='16'
//             height='16'
//             viewBox='0 0 16 16'
//             fill='none'
//             xmlns='http://www.w3.org/2000/svg'>
//             {/* ... SVG path ... */}
//           </svg>
//           <h3 className='font-semibold'>Upcoming Bills</h3>
//         </div>

//         {/* Dropdown */}
//         <div className='w-24 h-7 p-2.5 bg-white rounded-md shadow-inner outline outline-1 outline-gray-300 flex justify-between items-center cursor-pointer'>
//           <select
//             value={period}
//             onChange={(e) => setPeriod(e.target.value)}
//             className='bg-white text-xs font-normal outline-none'>
//             <option value='week'>This week</option>
//             <option value='month'>This month</option>
//             <option value='year'>This year</option>
//           </select>
//         </div>
//       </div>

//       {/* Table */}
//       <table className='w-full text-sm'>
//         <thead>
//           <tr className='text-gray-400 text-left'>
//             <th>Deadline</th>
//             <th>Date</th>
//             <th>Name</th>
//             <th className='text-right'>Due</th>
//           </tr>
//         </thead>

//         <tbody>
//           {bills.map((b, i) => (
//             <tr key={i} className='border-t'>
//               <td className='py-2'>
//                 {b.status === 'late' ? (
//                   <div className='px-2 py-0.5 bg-red-50 rounded-full outline outline-[0.5px] outline-offset-[-0.5px] outline-red-500 inline-flex justify-center items-center'>
//                     <div className='text-red-700 text-xs font-medium'>
//                       {b.deadline}
//                     </div>
//                   </div>
//                 ) : (
//                   <div className='text-black text-xs font-medium'>
//                     {b.deadline}
//                   </div>
//                 )}
//               </td>
//               <td>{b.date}</td>
//               <td>{b.name}</td>
//               <td className='text-right font-medium'>{b.due}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   )
// }

// export default UpcomingBills

import React, { useState, useEffect } from 'react'
import { getUpcomingBills } from '../../api/upcomingBillsApi' // adjust path

const UpcomingBillsCard = () => {
  const [bills, setBills] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // Helper to calculate days left
  const getDaysLeft = (dueDate) => {
    const today = new Date()
    const due = new Date(dueDate)
    const diffTime = due - today
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays
  }

  // Format the deadline string
  const formatDeadline = (dueDate) => {
    const daysLeft = getDaysLeft(dueDate)
    if (daysLeft < 0) return `Late by ${Math.abs(daysLeft)} day(s)`
    if (daysLeft === 0) return 'Due today'
    return `${daysLeft} day(s) left`
  }

  // Fetch upcoming bills
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

  if (loading) return <p>Loading upcoming bills...</p>
  if (error) return <p>{error}</p>

  return (
    <div className='w-full max-w-[700px] bg-white rounded-[10px] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] outline outline-1 outline-offset-[-1px] outline-gray-200 flex flex-col p-4 gap-4 transition-transform duration-300 hover:shadow-lg hover:scale-105'>
      {/* Header */}
      <div className='flex items-center gap-2'>
        <h3 className='font-semibold text-lg'>Upcoming Bills</h3>
      </div>

      {/* Table */}
      <table className='w-full text-sm'>
        <thead>
          <tr className='text-gray-400 text-left'>
            <th>Deadline</th>
            <th>Date</th>
            <th>Name</th>
            <th className='text-right'>Due</th>
          </tr>
        </thead>

        <tbody>
          {bills.map((b, i) => (
            <tr key={b._id || i} className='border-t'>
              {/* Deadline */}
              <td className='py-2'>
                {getDaysLeft(b.date) < 0 ? (
                  <div className='px-2 py-0.5 bg-red-50 rounded-full outline outline-[0.5px] outline-offset-[-0.5px] outline-red-500 inline-flex justify-center items-center'>
                    <div className='text-red-700 text-xs font-medium'>
                      {formatDeadline(b.date)}
                    </div>
                  </div>
                ) : (
                  <div className='text-black text-xs font-medium'>
                    {formatDeadline(b.date)}
                  </div>
                )}
              </td>

              {/* Formatted due date */}
              <td>{new Date(b.date).toLocaleDateString('en-GB')}</td>

              {/* Name */}
              <td>{b.name}</td>

              {/* Amount */}
              <td className='text-right font-medium'>€{b.due}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default UpcomingBillsCard

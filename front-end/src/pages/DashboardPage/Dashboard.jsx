// import React from 'react'
// import AnalyticalOverview from './AnalyticalOverview.jsx'
// import ExpenditureOverview from '../DashboardPage/ExpenditureOverview.jsx'
// import GoalCard from '../DashboardPage/GoalCard'
// import UpcomingBills from '../DashboardPage/UpcomingBills'

// const Dashboard = () => {
//   const userName = 'User'

//   return (
//     <div className='p-6 flex flex-col gap-6'>
//       {/* Top: Greeting */}
//       <div className='text-2xl font-semibold text-gray-800'>
//         Hi, {userName} 👋
//       </div>

//       {/* Analytical Overview (full width) */}
//       <div className='transition-transform duration-300 hover:shadow-lg hover:scale-105 cursor-pointer'>
//         <AnalyticalOverview />
//       </div>

//       {/* Middle Section: Expenditure left, Right stack */}
//       <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
//         {/* Left: Expenditure Overview */}
//         <div className='transition-transform duration-300 hover:shadow-lg hover:scale-105 cursor-pointer'>
//           <ExpenditureOverview />
//         </div>

//         {/* Right: Goal & Upcoming Bills stacked */}
//         <div className='flex flex-col gap-6'>
//           <div className='transition-transform duration-300 hover:shadow-lg hover:scale-105 cursor-pointer'>
//             <GoalCard />
//           </div>
//           <div className='transition-transform duration-300 hover:shadow-lg hover:scale-105 cursor-pointer'>
//             <UpcomingBills />
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default Dashboard
import React, { useEffect, useState } from 'react'
import AnalyticalOverview from './AnalyticalOverview.jsx'
import ExpenditureOverview from '../DashboardPage/ExpenditureOverview.jsx'
import GoalCard from '../DashboardPage/GoalCard'
import UpcomingBills from '../DashboardPage/UpcomingBills'

const Dashboard = () => {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const res = await fetch('http://localhost:3000/api/dashboard')
        const json = await res.json()
        setData(json)
      } catch (err) {
        setError('Failed to load dashboard data')
      } finally {
        setLoading(false)
      }
    }

    fetchDashboard()
  }, [])

  if (loading) return <p className='p-6'>Loading dashboard...</p>
  if (error) return <p className='p-6 text-red-500'>{error}</p>

  return (
    <div className='p-6 flex flex-col gap-6'>
      <div className='text-2xl font-semibold text-gray-800'>Hi, User 👋</div>

      {/* Now pass data down if needed */}
      <AnalyticalOverview data={data} />
      <ExpenditureOverview data={data.expenditureOverview} />

      <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
        <GoalCard data={data.goals[0]} />
        <UpcomingBills data={data.upcomingBills} />
      </div>
      <button
        className='p-2 bg-blue-500 text-white rounded'
        onClick={async () => {
          setLoading(true)
          setError(null)
          try {
            const res = await fetch('http://localhost:3000/api/dashboard', {
              cache: 'no-store',
            })
            const json = await res.json()
            setData(json)
          } catch (err) {
            setError('Failed to load dashboard data')
          } finally {
            setLoading(false)
          }
        }}>
        Refresh Dashboard
      </button>
    </div>
  )
}

export default Dashboard

// import React from 'react'
// import { Link } from 'react-router-dom'
// import Input from '../../components/Input'
// import StatCard from '../DashboardPage/StatCard.jsx'
// import ExpenditureOverview from '../DashboardPage/ExpenditureOverview.jsx'
// import GoalCard from '../DashboardPage/GoalCard'
// import UpcomingBills from '../DashboardPage/UpcomingBills'

// const Dashboard = () => {
//   // Replace with actual user logic (from auth / token) when available
//   const userName = 'User'

//   return (
//     <div className='p-8 bg-gray-50 min-h-screen'>
//       {/* Header */}
//       <div className='mb-8'>
//         <h1 className='text-4xl font-extrabold'>Hello, {userName}</h1>
//         <p className='text-gray-500 mt-2'>Analytics Overview</p>
//       </div>
//       {/* Analytics cards */}
//       <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10'>
//         <StatCard
//           title='Income'
//           value='€100 000'
//           accent='from-green-50 to-green-100'
//         />
//         <StatCard
//           title='Expenses'
//           value='€100 000'
//           accent='from-red-50 to-red-100'
//         />
//         <StatCard
//           title='Balance'
//           value='€100 000'
//           accent='from-orange-50 to-orange-100'
//         />
//         <StatCard
//           title='Savings'
//           value='€100 000'
//           accent='from-blue-50 to-blue-100'
//         />
//       </div>
//       {/* Main grid: left (expenditure) and right (goal + bills) */}
//       <div className='grid grid-cols-1 lg:grid-cols-3 gap-6'>
//         <div className='lg:col-span-2'>
//           <ExpenditureOverview />
//         </div>

//         <div className='flex flex-col gap-6'>
//           <GoalCard />
//           <UpcomingBills />
//         </div>
//       </div>
//     </div>
//   )
// }

// export default Dashboard

// import React from 'react'
// import { Link } from 'react-router-dom'
// import Input from '../../components/Input'
// import StatCard from '../DashboardPage/StatCard.jsx'
// import ExpenditureOverview from '../DashboardPage/ExpenditureOverview.jsx'
// import GoalCard from '../DashboardPage/GoalCard'
// import UpcomingBills from '../DashboardPage/UpcomingBills'

// const Dashboard = () => {

//   return (
//     <div className='p-6 space-y-6'>
//       {/* Stats */}
//       <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
//         <StatCard title='Income' value='€100,000' />
//         <StatCard title='Expenses' value='€42,500' />
//         <StatCard title='Savings' value='€57,500' />
//       </div>

//       {/* Bottom Section */}
//       <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
//         <GoalCard />
//         <UpcomingBills />
//       </div>
//     </div>
//   )
// }

// export default Dashboard
import React from 'react'
import AnalyticalOverview from './AnalyticalOverview.jsx'
import ExpenditureOverview from '../DashboardPage/ExpenditureOverview.jsx'
import GoalCard from '../DashboardPage/GoalCard'
import UpcomingBills from '../DashboardPage/UpcomingBills'

const Dashboard = () => {
  const userName = 'User'

  return (
    <div className='p-6 flex flex-col gap-6'>
      {/* Top: Greeting */}
      <div className='text-2xl font-semibold text-gray-800'>
        Hi, {userName} 👋
      </div>

      {/* Analytical Overview (full width) */}
      <AnalyticalOverview />

      {/* Middle Section: Expenditure left, Right stack */}
      <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
        {/* Left: Expenditure Overview */}
        <ExpenditureOverview />

        {/* Right: Goal & Upcoming Bills stacked */}
        <div className='flex flex-col gap-6'>
          <GoalCard />
          <UpcomingBills />
        </div>
      </div>
    </div>
  )
}

export default Dashboard

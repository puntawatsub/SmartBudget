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

//       <AnalyticalOverview />

//       {/* Middle Section: Expenditure left, Right stack */}
//       <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
//         {/* Left: Expenditure Overview */}
//         <ExpenditureOverview />

//         {/* Right: Goal & Upcoming Bills stacked */}
//         <div className='flex flex-col gap-6'>
//           <GoalCard />
//           <UpcomingBills />
//         </div>
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
      <div className='transition-transform duration-300 hover:shadow-lg hover:scale-105 cursor-pointer'>
        <AnalyticalOverview />
      </div>

      {/* Middle Section: Expenditure left, Right stack */}
      <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
        {/* Left: Expenditure Overview */}
        <div className='transition-transform duration-300 hover:shadow-lg hover:scale-105 cursor-pointer'>
          <ExpenditureOverview />
        </div>

        {/* Right: Goal & Upcoming Bills stacked */}
        <div className='flex flex-col gap-6'>
          <div className='transition-transform duration-300 hover:shadow-lg hover:scale-105 cursor-pointer'>
            <GoalCard />
          </div>
          <div className='transition-transform duration-300 hover:shadow-lg hover:scale-105 cursor-pointer'>
            <UpcomingBills />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard

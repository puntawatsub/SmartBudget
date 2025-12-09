// import React, { useState } from 'react'

// const GoalCard = () => {
//   const [period, setPeriod] = useState('month') // 'week', 'month', 'year'

//   const goalData = {
//     week: { progress: 500, target: 1000 },
//     month: { progress: 1500, target: 2000 },
//     year: { progress: 7000, target: 12000 },
//   }

//   const goal = {
//     title: 'Buy a car',
//     totalSaved: 3500,
//     totalTarget: 8000,
//     ...goalData[period],
//   }

//   const pct = Math.min(100, Math.round((goal.progress / goal.target) * 100))

//   return (
//     <div className='w-full max-w-[700px] bg-white rounded-[10px] shadow p-4 gap-4 flex flex-col'>
//       <div className='flex items-center gap-2'>
//         <h3 className='font-semibold'>Goal</h3>
//       </div>

//       {/* Dropdown  */}
//       <div className='w-full flex justify-end'>
//         <div className='w-24 h-7 p-2.5 bg-white rounded-md shadow-inner outline outline-1 outline-gray-300 flex justify-between items-center cursor-pointer'>
//           <select
//             value={period}
//             onChange={(e) => setPeriod(e.target.value)}
//             className='bg-white text-xs font-normal font-["Inter"] outline-none'>
//             <option value='week'>This week</option>
//             <option value='month'>This month</option>
//             <option value='year'>This year</option>
//           </select>
//         </div>
//       </div>

//       {/* Progress */}
//       <div className='flex flex-1 items-center gap-4 relative'>
//         {/* Circular progress */}
//         <div
//           className='w-14 h-14 rounded-full flex items-center justify-center'
//           style={{
//             background: `conic-gradient(#FFA500 0deg ${
//               (pct / 100) * 360
//             }deg, #FFD8A8 ${(pct / 100) * 360}deg 360deg)`,
//           }}>
//           <div className='w-10 h-10 rounded-full bg-orange-50 flex items-center justify-center'>
//             <span className='text-xl font-medium'>🚗</span>
//           </div>
//         </div>

//         {/* Goal info */}
//         <div className='flex flex-col justify-between'>
//           <span className='text-black text-base font-medium font-["Inter"]'>
//             {goal.title}
//           </span>

//           <div className='inline-flex bg-amber-50 rounded-full ring ring-amber-500 px-2 py-0.5'>
//             <span className='text-amber-700 text-[10px] font-normal font-["Inter"] truncate'>
//               {period.charAt(0).toUpperCase() + period.slice(1)}: €
//               {goal.progress}/€{goal.target}
//             </span>
//           </div>
//         </div>

//         {/* Total saved on right corner */}
//         <div className='absolute top-4 right-4 flex flex-col items-end gap-1'>
//           <span className='text-black text-base font-bold font-["Inter"]'>
//             €{goal.totalSaved}
//           </span>
//           <span className='text-black text-sm font-normal font-["Inter"]'>
//             of €{goal.totalTarget}
//           </span>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default GoalCard
import React, { useState } from "react";

const GoalCard = ({ data }) => {
  if (!data) return null; // wait for backend data

  const [period, setPeriod] = useState("month"); // 'week', 'month', 'year'

  // Safely get period progress & target from backend
  const periodInfo = data.periodData?.[period] || { progress: 0, target: 1 }; // avoid div by zero

  const pct = Math.min(
    100,
    Math.round((periodInfo.progress / periodInfo.target) * 100)
  );

  return (
    <div className="w-full max-w-[700px] bg-white rounded-[10px] shadow p-4 gap-4 flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h3 className="font-semibold">{data.title}</h3>

        {/* Period selector */}
        {/* <div className='w-28 h-7 p-2.5 bg-white rounded-md shadow-inner outline outline-1 outline-gray-300 flex justify-between items-center cursor-pointer'>
          <select
            value={period}
            onChange={(e) => setPeriod(e.target.value)}
            className='bg-white text-xs font-normal font-["Inter"] outline-none'>
            <option value='week'>This week</option>
            <option value='month'>This month</option>
            <option value='year'>This year</option>
          </select>
        </div> */}
      </div>

      {/* Progress section */}
      <div className="flex flex-1 items-center gap-4 relative">
        {/* Circular progress */}
        <div
          className="w-14 h-14 rounded-full flex items-center justify-center"
          style={{
            background: `conic-gradient(#FFA500 0deg ${(
              (pct / 100) *
              360
            ).toFixed(2)}deg, #FFD8A8 ${(pct / 100) * 360}deg 360deg)`,
          }}
        >
          <div className="w-10 h-10 rounded-full bg-orange-50 flex items-center justify-center">
            <span className="text-xl font-medium">🚗</span>
          </div>
        </div>

        {/* Goal info */}
        <div className="flex flex-col justify-between">
          <span className='text-black text-base font-medium font-["Inter"]'>
            {data.title}
          </span>

          <div className="inline-flex bg-amber-50 rounded-full ring ring-amber-500 px-2 py-0.5">
            <span className='text-amber-700 text-[10px] font-normal font-["Inter"] truncate'>
              {period.charAt(0).toUpperCase() + period.slice(1)}: €
              {periodInfo.progress}/€
              {periodInfo.target}
            </span>
          </div>
        </div>

        {/* Total saved on right corner */}
        <div className="absolute top-4 right-4 flex flex-col items-end gap-1">
          <span className='text-black text-base font-bold font-["Inter"]'>
            €{data.totalSaved}
          </span>
          <span className='text-black text-sm font-normal font-["Inter"]'>
            of €{data.totalTarget}
          </span>
        </div>
      </div>
    </div>
  );
};

export default GoalCard;

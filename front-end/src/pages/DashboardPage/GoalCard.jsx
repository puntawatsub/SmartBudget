// import React from 'react'

// const GoalCard = () => {
//   // static example values
//   const goal = {
//     title: 'Buy a car',
//     monthProgress: 1500,
//     monthTarget: 2000,
//     totalSaved: 3500,
//     totalTarget: 8000,
//   }

//   const monthPct = Math.min(
//     100,
//     Math.round((goal.monthProgress / goal.monthTarget) * 100)
//   )
//   const totalPct = Math.min(
//     100,
//     Math.round((goal.totalSaved / goal.totalTarget) * 100)
//   )

//   return (
//     <div className='bg-white rounded-xl shadow-sm p-6'>
//       <h3 className='font-semibold mb-4'>Goal</h3>

//       <div className='flex items-center gap-4'>
//         <div className='w-12 h-12 rounded-full bg-orange-50 border flex items-center justify-center text-xl'>
//           🚗
//         </div>

//         <div className='flex-1'>
//           <div className='flex items-center justify-between'>
//             <div>
//               <p className='font-medium'>{goal.title}</p>
//               <p className='text-sm text-orange-500 mt-1'>
//                 This month: €{goal.monthProgress} / €{goal.monthTarget}
//               </p>
//             </div>

//             <div className='text-right'>
//               <div className='font-bold text-lg'>€{goal.totalSaved}</div>
//               <div className='text-xs text-gray-400'>
//                 of €{goal.totalTarget}
//               </div>
//             </div>
//           </div>

//           <div className='mt-4'>
//             <div className='w-full bg-gray-100 rounded-full h-3'>
//               <div
//                 className='h-3 rounded-full bg-orange-400'
//                 style={{ width: `${totalPct}%` }}
//               />
//             </div>
//             <div className='text-xs text-gray-500 mt-2'>
//               {totalPct}% reached
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default GoalCard
// import React from 'react'

// const GoalCard = () => {
//   const goal = {
//     title: 'Buy a car',
//     monthProgress: 1500,
//     monthTarget: 2000,
//     totalSaved: 3500,
//     totalTarget: 8000,
//   }

//   const totalPct = Math.min(
//     100,
//     Math.round((goal.totalSaved / goal.totalTarget) * 100)
//   )

//   return (
//     <div className='bg-white rounded-xl shadow-sm p-6'>
//       <h3 className='font-semibold mb-4'>Goal</h3>

//       <div className='flex gap-4'>
//         <div className='w-12 h-12 rounded-full bg-orange-50 flex items-center justify-center text-xl'>
//           🚗
//         </div>

//         <div className='flex-1'>
//           <div className='flex justify-between'>
//             <div>
//               <p className='font-medium'>{goal.title}</p>
//               <p className='text-sm text-orange-500'>
//                 This month: €{goal.monthProgress} / €{goal.monthTarget}
//               </p>
//             </div>
//             <div className='text-right'>
//               <p className='font-bold'>€{goal.totalSaved}</p>
//               <span className='text-xs text-gray-400'>
//                 of €{goal.totalTarget}
//               </span>
//             </div>
//           </div>

//           <div className='mt-4'>
//             <div className='w-full bg-gray-100 rounded-full h-3'>
//               <div
//                 className='h-3 bg-orange-400 rounded-full'
//                 style={{ width: `${totalPct}%` }}
//               />
//             </div>
//             <p className='text-xs text-gray-500 mt-1'>{totalPct}% reached</p>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default GoalCard
// import React from 'react'

// const GoalCard = () => {
//   const goal = {
//     title: 'Buy a car',
//     monthProgress: 1500,
//     monthTarget: 2000,
//     totalSaved: 3500,
//     totalTarget: 8000,
//   }

//   const monthPct = Math.min(
//     100,
//     Math.round((goal.monthProgress / goal.monthTarget) * 100)
//   )
//   const totalPct = Math.min(
//     100,
//     Math.round((goal.totalSaved / goal.totalTarget) * 100)
//   )

//   return (
//     <div className='w-[700px] h-40 bg-white rounded-[10px] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] outline outline-1 outline-offset-[-1px] outline-gray-200 inline-flex flex-col justify-start items-start overflow-hidden'>
//       {/* Header */}
//       <div className='flex items-center gap-2'>
//         <div className='w-4 h-4 relative'>
//           <div className='w-3 h-2 absolute left-[1.5px] top-[1.33px] outline outline-[1.33px] outline-gray-500' />
//         </div>
//         <span className="text-gray-500 text-xs font-medium font-['Inter']">
//           Goal
//         </span>
//       </div>

//       {/* Dropdown */}
//       <div className='w-32 h-7 p-2.5 bg-white rounded-md shadow-inner outline outline-1 outline-gray-300 flex justify-between items-center'>
//         <span className="text-black text-xs font-normal font-['Inter'] leading-4 tracking-tight">
//           This month
//         </span>
//         <div className='w-4 h-4 flex items-center justify-center'>
//           <div className='w-0 h-0 border-l-[4px] border-l-transparent border-r-[4px] border-r-transparent border-t-[6px] border-t-gray-400' />
//         </div>
//       </div>

//       {/* Progress area */}
//       <div className='relative flex items-center gap-4'>
//         {/* Circular progress */}
//         <div
//           className='w-14 h-14 rounded-full flex items-center justify-center'
//           style={{
//             background: `conic-gradient(#FFA500 0deg ${
//               (monthPct / 100) * 360
//             }deg, #FFD8A8 ${(monthPct / 100) * 360}deg 360deg)`,
//           }}>
//           <div className='w-10 h-10 rounded-full bg-orange-50 flex items-center justify-center'>
//             <span className='text-xl font-medium'>🚗</span>
//           </div>
//         </div>

//         {/* Text area */}
//         <div className='flex flex-col justify-between'>
//           <span className="text-black text-base font-medium font-['Inter']">
//             {goal.title}
//           </span>

//           <div className='inline-flex bg-amber-50 rounded-full ring ring-amber-500'>
//             <span className="text-amber-700 text-[10px] font-normal font-['Inter'] px-1">
//               This month: €{goal.monthProgress}/€{goal.monthTarget}
//             </span>
//           </div>
//         </div>

//         {/* Total saved */}
//         <div className='absolute  right-0 flex items-baseline gap-1'>
//           <span className="text-black text-base font-bold font-['Inter']">
//             €{goal.totalSaved}
//           </span>
//           <span className="text-black text-sm font-normal font-['Inter']">
//             of €{goal.totalTarget}
//           </span>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default GoalCard
import React from 'react'

const GoalCard = () => {
  const goal = {
    title: 'Buy a car',
    monthProgress: 1500,
    monthTarget: 2000,
    totalSaved: 3500,
    totalTarget: 8000,
  }

  const monthPct = Math.min(
    100,
    Math.round((goal.monthProgress / goal.monthTarget) * 100)
  )

  return (
    <div className='w-full w-max-[700px] bg-white rounded-[10px] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] outline outline-1 outline-offset-[-1px] outline-gray-200 flex flex-col p-4 gap-4'>
      <div className='flex items-center gap-2'>
        {/* Little Figma-style icon as SVG */}
        <svg
          width='16'
          height='16'
          viewBox='0 0 16 16'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
          className='w-4 h-4'>
          <g clipPath='url(#clip0_116_198)'>
            <path
              d='M4.80631 10L1.77298 4.75999C1.64218 4.53391 1.58066 4.27439 1.59607 4.01365C1.61148 3.75291 1.70313 3.50244 1.85965 3.29333L2.93298 1.86666C3.05717 1.70107 3.21822 1.56666 3.40336 1.47409C3.5885 1.38152 3.79265 1.33333 3.99965 1.33333H11.9996C12.2066 1.33333 12.4108 1.38152 12.5959 1.47409C12.7811 1.56666 12.9421 1.70107 13.0663 1.86666L14.133 3.29333C14.2905 3.50176 14.3834 3.75189 14.4 4.01264C14.4166 4.27339 14.3562 4.53327 14.2263 4.75999L11.193 10'
              stroke='#6B7280'
              strokeWidth='1.33333'
              strokeLinecap='round'
              strokeLinejoin='round'
            />
            <path
              d='M7.33406 7.99996L3.41406 1.46663'
              stroke='#6B7280'
              strokeWidth='1.33333'
              strokeLinecap='round'
              strokeLinejoin='round'
            />
            <path
              d='M8.66602 7.99996L12.586 1.46663'
              stroke='#6B7280'
              strokeWidth='1.33333'
              strokeLinecap='round'
              strokeLinejoin='round'
            />
            <path
              d='M5.33398 4.66667H10.6673'
              stroke='#6B7280'
              strokeWidth='1.33333'
              strokeLinecap='round'
              strokeLinejoin='round'
            />
            <path
              d='M7.99935 14.6667C9.8403 14.6667 11.3327 13.1743 11.3327 11.3333C11.3327 9.49238 9.8403 8 7.99935 8C6.1584 8 4.66602 9.49238 4.66602 11.3333C4.66602 13.1743 6.1584 14.6667 7.99935 14.6667Z'
              stroke='#6B7280'
              strokeWidth='1.33333'
              strokeLinecap='round'
              strokeLinejoin='round'
            />
            <path
              d='M7.99935 12V10.6667H7.66602'
              stroke='#6B7280'
              strokeWidth='1.33333'
              strokeLinecap='round'
              strokeLinejoin='round'
            />
          </g>
          <defs>
            <clipPath id='clip0_116_198'>
              <rect width='16' height='16' fill='white' />
            </clipPath>
          </defs>
        </svg>

        <h3 className='font-semibold'>Goal</h3>
      </div>

      {/* Dropdown */}
      <div className='w-32 h-7 p-2.5 bg-white rounded-md shadow-inner outline outline-1 outline-gray-300 flex justify-between items-center'>
        <span className="text-black text-xs font-normal font-['Inter'] leading-4 tracking-tight">
          This month
        </span>
        <div className='w-4 h-4 flex items-center justify-center'>
          <div className='w-0 h-0 border-l-[4px] border-l-transparent border-r-[4px] border-r-transparent border-t-[6px] border-t-gray-400' />
        </div>
      </div>

      {/* Progress */}
      <div className='flex flex-1 items-center gap-4 relative'>
        {/* Circular progress */}
        <div
          className='w-14 h-14 rounded-full flex items-center justify-center'
          style={{
            background: `conic-gradient(#FFA500 0deg ${
              (monthPct / 100) * 360
            }deg, #FFD8A8 ${(monthPct / 100) * 360}deg 360deg)`,
          }}>
          <div className='w-10 h-10 rounded-full bg-orange-50 flex items-center justify-center'>
            <span className='text-xl font-medium'>🚗</span>
          </div>
        </div>

        {/* Goal info */}
        <div className='flex flex-col justify-between'>
          <span className="text-black text-base font-medium font-['Inter']">
            {goal.title}
          </span>

          <div className='inline-flex bg-amber-50 rounded-full ring ring-amber-500 px-2 py-0.5'>
            <span className="text-amber-700 text-[10px] font-normal font-['Inter'] truncate">
              This month: €{goal.monthProgress}/€{goal.monthTarget}
            </span>
          </div>
        </div>

        {/* Total saved on right corner */}
        <div className='absolute top-4 right-4 flex flex-col items-end gap-1'>
          <span className="text-black text-base font-bold font-['Inter']">
            €{goal.totalSaved}
          </span>
          <span className="text-black text-sm font-normal font-['Inter']">
            of €{goal.totalTarget}
          </span>
        </div>
      </div>
    </div>
  )
}

export default GoalCard

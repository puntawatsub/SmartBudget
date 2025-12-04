// import React from 'react'

// /**
//  * Simple horizontal bars showing previous vs current month.
//  * For improved visuals replace with Recharts/ChartJS if desired.
//  */
// const ExpenditureOverview = () => {
//   const data = [
//     { title: 'Groceries', previous: 300, current: 400, max: 500 },
//     { title: 'Transport', previous: 200, current: 300, max: 500 },
//     { title: 'Eating Out', previous: 250, current: 360, max: 500 },
//     { title: 'Shopping', previous: 180, current: 400, max: 500 },
//     { title: 'Subscriptions', previous: 100, current: 140, max: 500 },
//     { title: 'Utilities', previous: 220, current: 310, max: 500 },
//   ]

//   // helper to compute width percent
//   const pct = (value, max) => Math.min(100, Math.round((value / max) * 100))

//   return (
//     <div className='bg-white rounded-xl shadow-sm p-6'>
//       <div className='flex items-center justify-between mb-4'>
//         <h3 className='font-semibold text-lg'>Expenditure Overview</h3>
//       </div>

//       <div className='space-y-5'>
//         {data.map((row, i) => (
//           <div key={i} className='flex items-center gap-4'>
//             <div className='w-24 text-sm text-gray-600'>{row.title}</div>

//             <div className='flex-1'>
//               <div className='space-y-1'>
//                 {/* Previous month */}
//                 <div className='relative bg-gray-100 rounded-full h-2 overflow-hidden'>
//                   <div
//                     className='h-2 rounded-full bg-blue-300'
//                     style={{ width: `${pct(row.previous, row.max)}%` }}
//                   />
//                 </div>

//                 {/* Current month */}
//                 <div className='relative bg-gray-100 rounded-full h-3 overflow-hidden'>
//                   <div
//                     className='h-3 rounded-full bg-blue-600'
//                     style={{
//                       width: `${pct(row.current, row.max)}%`,
//                       boxShadow: '0 1px 6px rgba(0, 43, 233, 0.25)',
//                     }}
//                   />
//                 </div>
//               </div>
//             </div>

//             <div className='w-28 text-right text-sm'>
//               <div className='text-gray-500'>€{row.previous}</div>
//               <div className='font-medium'>€{row.current}</div>
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* legend */}
//       <div className='flex items-center gap-6 mt-6 text-sm text-gray-600'>
//         <div className='flex items-center gap-2'>
//           <span className='w-3 h-3 bg-blue-400 rounded' /> previous month
//         </div>
//         <div className='flex items-center gap-2'>
//           <span className='w-3 h-3 bg-blue-600 rounded' /> current month
//         </div>
//       </div>
//     </div>
//   )
// }

// export default ExpenditureOverview
import React from 'react'

/**
 * Simple horizontal bars showing previous vs current month.
 */
const ExpenditureOverview = ({ data }) => {
  if (!data) return null // handle loading

  // helper to compute width percent
  const pct = (value, max) => Math.min(100, Math.round((value / max) * 100))

  return (
    <div className='bg-white rounded-xl shadow-sm p-6'>
      <div className='flex items-center justify-between mb-4'>
        <h3 className='font-semibold text-lg'>Expenditure Overview</h3>
      </div>

      <div className='space-y-5'>
        {data.map((row, i) => (
          <div key={i} className='flex items-center gap-4'>
            <div className='w-24 text-sm text-gray-600'>{row.title}</div>

            <div className='flex-1'>
              <div className='space-y-1'>
                {/* Previous month */}
                <div className='relative bg-gray-100 rounded-full h-2 overflow-hidden'>
                  <div
                    className='h-2 rounded-full bg-blue-300'
                    style={{ width: `${pct(row.previous, row.max)}%` }}
                  />
                </div>

                {/* Current month */}
                <div className='relative bg-gray-100 rounded-full h-3 overflow-hidden'>
                  <div
                    className='h-3 rounded-full bg-blue-600'
                    style={{
                      width: `${pct(row.current, row.max)}%`,
                      boxShadow: '0 1px 6px rgba(0, 43, 233, 0.25)',
                    }}
                  />
                </div>
              </div>
            </div>

            <div className='w-28 text-right text-sm'>
              <div className='text-gray-500'>€{row.previous}</div>
              <div className='font-medium'>€{row.current}</div>
            </div>
          </div>
        ))}
      </div>

      {/* legend */}
      <div className='flex items-center gap-6 mt-6 text-sm text-gray-600'>
        <div className='flex items-center gap-2'>
          <span className='w-3 h-3 bg-blue-400 rounded' /> previous month
        </div>
        <div className='flex items-center gap-2'>
          <span className='w-3 h-3 bg-blue-600 rounded' /> current month
        </div>
      </div>
    </div>
  )
}

export default ExpenditureOverview

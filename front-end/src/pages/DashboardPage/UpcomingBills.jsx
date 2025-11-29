import React from 'react'

const UpcomingBills = () => {
  const bills = [
    {
      deadline: '3 days',
      date: '18.11.2025',
      name: 'Spotify',
      due: '€5.85',
      status: 'ok',
    },
    {
      deadline: '1 day ',
      date: '14.11.2025',
      name: 'Netflix',
      due: '€13.50',
      status: 'ok',
    },

    {
      deadline: '1 day ago',
      date: '14.11.2025',
      name: 'Laundromat',
      due: '€2.87',
      status: 'late',
    },
  ]

  return (
    <div className='w-full w-max-[700px] bg-white rounded-[10px] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] outline outline-1 outline-offset-[-1px] outline-gray-200 flex flex-col p-4 gap-4'>
      <div className='flex items-center gap-2'>
        <svg
          width='16'
          height='16'
          viewBox='0 0 16 16'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'>
          <path
            d='M8.66732 10.6667H5.33398'
            stroke='#6B7280'
            strokeWidth='1.33333'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
          <path
            d='M9.33398 5.33333H5.33398'
            stroke='#6B7280'
            strokeWidth='1.33333'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
          <path
            d='M10.6673 8H5.33398'
            stroke='#6B7280'
            strokeWidth='1.33333'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
          <path
            d='M2.66602 2.00003C2.66602 1.82321 2.73625 1.65365 2.86128 1.52862C2.9863 1.4036 3.15587 1.33336 3.33268 1.33336C3.49776 1.33245 3.65967 1.37871 3.79935 1.46669L4.42135 1.86669C4.56071 1.95574 4.72264 2.00306 4.88802 2.00306C5.0534 2.00306 5.21532 1.95574 5.35468 1.86669L5.97735 1.46669C6.11671 1.37764 6.27863 1.33032 6.44402 1.33032C6.6094 1.33032 6.77132 1.37764 6.91068 1.46669L7.53268 1.86669C7.67204 1.95574 7.83397 2.00306 7.99935 2.00306C8.16473 2.00306 8.32666 1.95574 8.46602 1.86669L9.08802 1.46669C9.22737 1.37764 9.3893 1.33032 9.55468 1.33032C9.72006 1.33032 9.88199 1.37764 10.0213 1.46669L10.644 1.86669C10.7834 1.95574 10.9453 2.00306 11.1107 2.00306C11.2761 2.00306 11.438 1.95574 11.5773 1.86669L12.1993 1.46669C12.339 1.37871 12.5009 1.33245 12.666 1.33336C12.8428 1.33336 13.0124 1.4036 13.1374 1.52862C13.2624 1.65365 13.3327 1.82321 13.3327 2.00003V14C13.3327 14.1768 13.2624 14.3464 13.1374 14.4714C13.0124 14.5965 12.8428 14.6667 12.666 14.6667C12.5009 14.6676 12.339 14.6213 12.1993 14.5334L11.5773 14.1334C11.438 14.0443 11.2761 13.997 11.1107 13.997C10.9453 13.997 10.7834 14.0443 10.644 14.1334L10.0213 14.5334C9.88199 14.6224 9.72006 14.6697 9.55468 14.6697C9.3893 14.6697 9.22737 14.6224 9.08802 14.5334L8.46602 14.1334C8.32666 14.0443 8.16473 13.997 7.99935 13.997C7.83397 13.997 7.67204 14.0443 7.53268 14.1334L6.91068 14.5334C6.77132 14.6224 6.6094 14.6697 6.44402 14.6697C6.27863 14.6697 6.11671 14.6224 5.97735 14.5334L5.35468 14.1334C5.21532 14.0443 5.0534 13.997 4.88802 13.997C4.72264 13.997 4.56071 14.0443 4.42135 14.1334L3.79935 14.5334C3.65967 14.6213 3.49776 14.6676 3.33268 14.6667C3.15587 14.6667 2.9863 14.5965 2.86128 14.4714C2.73625 14.3464 2.66602 14.1768 2.66602 14V2.00003Z'
            stroke='#6B7280'
            strokeWidth='1.33333'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
        </svg>
        <h3 className='font-semibold'>Upcoming Bills</h3>
      </div>

      {/* "This week"  */}
      <div className='w-32 h-7 p-2.5 bg-white rounded-[5px] shadow-[inset_0px_2px_4px_0px_rgba(0,0,0,0.06)] outline outline-1 outline-offset-[-1px] outline-gray-300 inline-flex justify-between items-center'>
        <div className="text-black text-xs font-normal font-['Inter'] leading-4 tracking-tight">
          This week
        </div>
        <div className='w-4 h-4 flex items-center justify-center'>
          <div className='w-0 h-0 border-l-[4px] border-l-transparent border-r-[4px] border-r-transparent border-t-[6px] border-t-gray-400' />
        </div>
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
            <tr key={i} className='border-t'>
              <td className='py-2'>
                {b.status === 'late' ? (
                  <div className='px-2 py-0.5 bg-red-50 rounded-full outline outline-[0.5px] outline-offset-[-0.5px] outline-red-500 inline-flex justify-center items-center'>
                    <div className="text-red-700 text-xs font-medium font-['Inter']">
                      {b.deadline}
                    </div>
                  </div>
                ) : (
                  <div className="text-black text-xs font-medium font-['Inter']">
                    {b.deadline}
                  </div>
                )}
              </td>
              <td>{b.date}</td>
              <td>{b.name}</td>
              <td className='text-right font-medium'>{b.due}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default UpcomingBills

import React from 'react'

const ExpenditureOverview = ({ data }) => {
  if (!data) return null

  const pct = (value, max) => Math.min(100, Math.round((value / max) * 100))

  return (
    <div className='bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 hover:scale-105 hover:shadow-lg transition-transform duration-300'>
      <div className='flex items-center justify-between mb-4'>
        <h3 className='font-semibold text-lg text-gray-800 dark:text-gray-100'>
          Expenditure Overview
        </h3>
      </div>

      <div className='space-y-5'>
        {data.map((row, i) => (
          <div key={i} className='flex items-center gap-4'>
            <div className='w-24 text-sm text-gray-600 dark:text-gray-300'>
              {row.title}
            </div>

            <div className='flex-1'>
              <div className='space-y-1'>
                {/* Previous month */}
                <div className='relative bg-gray-100 dark:bg-gray-700 rounded-full h-2 overflow-hidden'>
                  <div
                    className='h-2 rounded-full bg-blue-300 dark:bg-blue-400'
                    style={{ width: `${pct(row.previous, row.max)}%` }}
                  />
                </div>

                {/* Current month */}
                <div className='relative bg-gray-100 dark:bg-gray-700 rounded-full h-3 overflow-hidden'>
                  <div
                    className='h-3 rounded-full bg-blue-600 dark:bg-blue-500'
                    style={{
                      width: `${pct(row.current, row.max)}%`,
                      boxShadow: '0 1px 6px rgba(0, 43, 233, 0.25)',
                    }}
                  />
                </div>
              </div>
            </div>

            <div className='w-28 text-right text-sm text-gray-700 dark:text-gray-200'>
              <div className='text-gray-500 dark:text-gray-400'>
                €{row.previous}
              </div>
              <div className='font-medium'>€{row.current}</div>
            </div>
          </div>
        ))}
      </div>

      {/* legend */}
      <div className='flex items-center gap-6 mt-6 text-sm text-gray-600 dark:text-gray-300'>
        <div className='flex items-center gap-2'>
          <span className='w-3 h-3 bg-blue-400 dark:bg-blue-500 rounded' />{' '}
          previous month
        </div>
        <div className='flex items-center gap-2'>
          <span className='w-3 h-3 bg-blue-600 dark:bg-blue-400 rounded' />{' '}
          current month
        </div>
      </div>
    </div>
  )
}

export default ExpenditureOverview

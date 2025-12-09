import { useNavigate } from 'react-router-dom'

const Home = () => {
  const navigate = useNavigate()

  return (
    <div className='bg-gray-50'>
      {/* Hero Section */}
      <section className='bg-gradient-to-r from-blue-100 to-white p-10 hover:scale-105 active:scale-95 transition-all duration-300 rounded-xl shadow-lg m-10 flex flex-col md:flex-row items-center'>
        <div className='flex-1 text-left'>
          <h1 className='text-3xl md:text-5xl font-bold text-gray-800 mb-4'>
            Your Money Your Rules
          </h1>
          <h2 className='text-2xl md:text-4xl font-semibold text-blue-500 mb-4'>
            SMART BUDGET
          </h2>
          <p className='text-gray-600 mb-6'>
            With SmartBudget, managing your finances has never been easier.
            Start tracking, planning, and achieving your financial goals today.
          </p>
          <button
            onClick={() => navigate('/signup')}
            className='bg-blue-600 text-white px-8 py-3 rounded-full shadow-lg 
                       hover:bg-blue-700 hover:scale-105 active:scale-95 
                       transition-all duration-300'>
            Get Started
          </button>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className='text-center my-16'>
        <h2 className='text-3xl font-semibold mb-10'>Why choose us?</h2>

        <div className='flex flex-col md:flex-row justify-center gap-6 px-4 md:px-20'>
          {['Budget Tracking', 'Budget Planning', 'Financial Insights'].map(
            (item, idx) => (
              <div
                key={idx}
                className='bg-white rounded-xl shadow-md p-8 flex-1
                           transform transition-transform duration-300
                           hover:scale-105 hover:shadow-xl'>
                <h3 className='text-xl font-bold mb-3'>{item}</h3>
                <p className='text-gray-600 text-sm'>
                  With the {item} feature, you can create budgets for different
                  categories, track daily expenses, and stay within your limits.
                </p>
              </div>
            )
          )}
        </div>
      </section>

      {/* Revolutionise Section */}
      <section className='my-16 px-4 md:px-20'>
        <h2 className='text-3xl md:text-4xl font-semibold text-center mb-16'>
          Revolutionise
        </h2>

        <div className='flex flex-col md:flex-row items-stretch gap-6 md:gap-8'>
          {/* Before Using SmartBudget */}
          <div
            className='flex-1 bg-gray-900 rounded-2xl p-6 md:p-10
                        transform transition-transform duration-300
                        hover:scale-105 hover:shadow-xl'>
            <h3 className='font-bold text-lg md:text-xl text-white mb-6'>Before Using SmartBudget</h3>

            <ul className='space-y-2 md:space-y-3'>
              {[
                'Manual, disorganized',
                'Estimated, often inaccurate',
                'Manual notes, often forgotten',
                'Manual, time-consuming',
                'Time-consuming, complicated',
                'Difficult, unstructured',
                'Complicated, manual',
                'Requires high discipline',
                'Risk of losing data',
              ].map((item, idx) => (
                <li key={idx} className='flex items-start gap-2 md:gap-3 text-gray-300 text-sm md:text-base'>
                  <span className='text-red-500 text-lg md:text-xl flex-shrink-0 mt-0.5'>✕</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Arrow in the middle */}
          <div className='flex md:hidden items-center justify-center py-4'>
            <div className='text-3xl text-gray-400'>↓</div>
          </div>
          
          <div className='hidden md:flex items-center justify-center'>
            <div className='text-4xl text-gray-400'>→</div>
          </div>

          {/* After Using SmartBudget */}
          <div
            className='flex-1 bg-green-50 rounded-2xl p-6 md:p-10 border-2 border-green-300
                        transform transition-transform duration-300
                        hover:scale-105 hover:shadow-xl'>
            <h3 className='font-bold text-lg md:text-xl text-gray-800 mb-6'>After Using SmartBudget</h3>

            <ul className='space-y-2 md:space-y-3'>
              {[
                'Automated, organized',
                'Easy, customizable',
                'Real-time tracking with csv exports',
                'Graphs, easy to understand',
                'Intuitive, easy to use',
                'Structured, easy to track',
                'Secure',
                'Fast, efficient',
              ].map((item, idx) => (
                <li key={idx} className='flex items-start gap-2 md:gap-3 text-gray-700 text-sm md:text-base'>
                  <span className='text-green-500 text-lg md:text-xl flex-shrink-0 mt-0.5'>✓</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home

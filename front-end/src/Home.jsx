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
        <h2 className='text-3xl font-semibold text-center mb-10'>
          Revolutionise
        </h2>

        {/* Increased gap + aligned padding */}
        <div className='flex flex-col md:flex-row gap- 20 md:gap-28'>
          {/* Before Using SmartBudget */}
          <div
            className='flex-1 bg-purple-100 rounded-xl pl-10 pr-6 py-10
                        transform transition-transform duration-300
                        hover:scale-105 hover:shadow-lg'>
            <h3 className='font-bold text-lg mb-4'>Before Using SmartBudget</h3>

            <ul className='list-disc list-inside text-gray-700 space-y-1'>
              {[
                'Manual, disorganized',
                'Offline, often inaccurate',
                'Manual notes, often forgotten',
                'Manual, time-consuming',
                'Complicated & unclear',
                'Unstructured tracking',
                'Risk of losing data',
                'Requires a lot of discipline',
                'Hard to understand spending patterns',
              ].map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>
          </div>

          {/* After Using SmartBudget */}
          <div
            className='flex-1 bg-green-100 rounded-xl pl-10 pr-6 py-10
                        transform transition-transform duration-300
                        hover:scale-105 hover:shadow-lg'>
            <h3 className='font-bold text-lg mb-4'>After Using SmartBudget</h3>

            <ul className='list-disc list-inside text-gray-700 space-y-1'>
              {[
                'Automated, organized',
                'Easy & customizable',
                'Real-time expense tracking',
                'Clear visual graphs',
                'Intuitive & user-friendly',
                'Structured budgeting',
                'Secure & reliable',
                'Fast and efficient',
              ].map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home

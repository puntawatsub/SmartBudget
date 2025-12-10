import React, { useEffect, useState } from 'react'
import AnalyticalOverview from './AnalyticalOverview.jsx'
import ExpenditureOverview from '../DashboardPage/ExpenditureOverview.jsx'
import GoalCard from '../DashboardPage/GoalCard'
import UpcomingBills from '../DashboardPage/UpcomingBills'

const Dashboard = () => {
  const [data, setData] = useState(null)
  const [goals, setGoals] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [userName, setUserName] = useState('User')

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const res = await fetch('/api/dashboard', {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem('token')}`,
          },
        })
        if (!res.ok) throw new Error(`Error: ${res.status} ${res.statusText}`)
        const json = await res.json()

        if (json.expenditureOverview) {
          const maxVal = Math.max(
            ...json.expenditureOverview.flatMap((row) => [
              row.current,
              row.previous,
            ]),
            1
          )
          json.expenditureOverview = json.expenditureOverview.map((row) => ({
            ...row,
            max: maxVal,
          }))
        }

        setData(json)
        if (json.user && json.user.name) setUserName(json.user.name)
      } catch (err) {
        setError('Failed to load dashboard data')
      } finally {
        setLoading(false)
      }
    }

    const fetchGoals = async () => {
      try {
        const res = await fetch('/api/goals', {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem('token')}`,
          },
        })
        if (!res.ok) throw new Error()
        const goalsData = await res.json()
        setGoals(goalsData)
      } catch (err) {
        console.error('Failed to load goals:', err)
      }
    }

    fetchDashboard()
    fetchGoals()
  }, [])

  if (loading)
    return (
      <p className='p-6 text-gray-800 dark:text-gray-200'>
        Loading dashboard...
      </p>
    )
  if (error) return <p className='p-6 text-red-500'>{error}</p>

  return (
    <div className='p-6 flex flex-col gap-6 bg-gray-50 dark:bg-gray-900 min-h-screen'>
      <div className='text-2xl font-semibold text-gray-800 dark:text-gray-100'>
        Hi, {userName} 👋
      </div>

      <AnalyticalOverview data={data} />

      {data?.expenditureOverview && (
        <ExpenditureOverview data={data.expenditureOverview} />
      )}

      {/* Goals Section Container */}
      <div className='bg-white dark:bg-gray-800 rounded-lg shadow dark:shadow-gray-700 p-6'>
        <h2 className='text-xl font-semibold text-gray-800 dark:text-gray-100 mb-4'>
          Your Goals
        </h2>

        <div className='flex flex-col md:flex-row gap-6'>
          {goals.slice(0, 3).map((goal) => (
            <GoalCard key={goal._id} data={goal} />
          ))}
        </div>

        {goals.length > 3 && (
          <div className='flex justify-center mt-6'>
            <a
              href='/goals'
              className='px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition'>
              View More Goals
            </a>
          </div>
        )}
      </div>

      <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
        <UpcomingBills data={data.upcomingBills} />
      </div>
    </div>
  )
}

export default Dashboard

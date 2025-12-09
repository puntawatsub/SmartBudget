import React, { useEffect, useState } from 'react'
import AnalyticalOverview from './AnalyticalOverview.jsx'
import ExpenditureOverview from '../DashboardPage/ExpenditureOverview.jsx'
import GoalCard from '../DashboardPage/GoalCard'
import UpcomingBills from '../DashboardPage/UpcomingBills'

const Dashboard = () => {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const res = await fetch('/api/dashboard', {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem('token')}`,
          },
        })
        if (!res.ok) {
          throw new Error(`Error: ${res.status} ${res.statusText}`)
        }
        const json = await res.json()

        // compute max for each
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
      } catch (err) {
        setError('Failed to load dashboard data')
      } finally {
        setLoading(false)
      }
    }

    fetchDashboard()
  }, [])

  if (loading) return <p className='p-6'>Loading dashboard...</p>
  if (error) return <p className='p-6 text-red-500'>{error}</p>

  return (
    <div className='p-6 flex flex-col gap-6'>
      <div className='text-2xl font-semibold text-gray-800'>Hi, User 👋</div>

      <AnalyticalOverview data={data} />
      <ExpenditureOverview data={data.expenditureOverview} />

      <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
        <GoalCard data={data.goals[0]} />
        <UpcomingBills data={data.upcomingBills} />
      </div>
    </div>
  )
}

export default Dashboard

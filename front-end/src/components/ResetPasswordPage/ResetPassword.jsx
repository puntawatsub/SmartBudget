import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const ResetPassword = () => {
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [loading, setLoading] = useState(false)

  const navigate = useNavigate()
  const { token } = useParams()

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (password !== confirmPassword) {
      alert('Passwords do not match!')
      return
    }

    setLoading(true)
    try {
      const res = await fetch(
        `http://localhost:3000/api/forgot-password/reset-password/${token}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ password }),
        }
      )

      const data = await res.json()
      alert(data.message)
      navigate('/login')
    } catch (error) {
      console.error(error)
      alert('Something went wrong.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='flex items-center justify-center min-h-screen bg-gray-100 px-4'>
      <div className='bg-white shadow-lg rounded-xl p-8 w-full max-w-md'>
        <h2 className='text-2xl font-bold text-gray-800 text-center mb-6'>
          Reset Your Password
        </h2>

        <form onSubmit={handleSubmit} className='space-y-4'>
          <input
            type='password'
            placeholder='New Password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className='w-full p-3 border border-gray-300 rounded-lg'
            required
          />

          <input
            type='password'
            placeholder='Confirm Password'
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className='w-full p-3 border border-gray-300 rounded-lg'
            required
          />

          <button
            type='submit'
            className='w-full py-3 bg-blue-600 text-white rounded-lg font-semibold'
            disabled={loading}>
            {loading ? 'Resetting...' : 'Reset Password'}
          </button>
        </form>
      </div>
    </div>
  )
}

export default ResetPassword

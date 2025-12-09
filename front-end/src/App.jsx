import ResetPassword from './components/ResetPasswordPage/ResetPassword'
import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
  useNavigate,
} from 'react-router-dom'
import Layout from './Layout'
import Home from './Home'

import SignUp from './pages/SignUpPage/SignUp'
import Login from './pages/LoginPage/Login'
import ForgotPassword from './pages/ForgotPasswordPage/ForgotPassword'
import Dashboard from './pages/DashboardPage/Dashboard'
import Setting from './pages/SettingPage/Setting'
import Transaction from './pages/TransactionPage/Transaction'

// import ResetPassword from './components/ResetPasswordPage/ResetPassword'
import GoalPage from './components/GoalPage/GoalPage'
import AddGoalPage from './pages/GoalPage/AddGoalPage'

import './index.css'
import useRefresh from './hooks/useRefresh'
import { useEffect } from 'react'

function App() {
  const { isAuth, loading, error } = useRefresh()

  useEffect(() => {
    if (error) {
      console.error('Authentication refresh error:', error)
      alert('Authentication error. Please log in again.')
    }
  }, [error])

  return (
    <>
      <BrowserRouter>
        <Routes>
          {/* Layout wrapper for nested routes */}
          <Route path='/' element={<Layout />}>
            {/* Main site pages */}
            <Route index element={<Home />} />
            <Route path='signup' element={<SignUp />} />
            <Route path='login' element={<Login />} />
            <Route path='forgot-password' element={<ForgotPassword />} />
            {/* <Route path="reset-password" element={<ResetPassword />} /> */}
            <Route path='reset-password/:token' element={<ResetPassword />} />
            <Route
              path='dashboard'
              element={isAuth ? <Dashboard /> : <Navigate to='/' />}
            />
            <Route
              path='settings'
              element={isAuth ? <Setting /> : <Navigate to='/' />}
            />
            <Route
              path='transaction'
              element={isAuth ? <Transaction /> : <Navigate to='/' />}
            />
            {/* Goals system */}
            <Route
              path='goals'
              element={isAuth ? <GoalPage /> : <Navigate to='/' />}
            />
            {/* Goals overview */}
            <Route
              path='goals/new'
              element={isAuth ? <AddGoalPage /> : <Navigate to='/' />}
            />
            {/* Create new goal */}
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App

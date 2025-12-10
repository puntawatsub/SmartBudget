import { Outlet, Link, useLocation } from 'react-router-dom'
import useRefresh from './hooks/useRefresh'
import Footer from './components/Footer/Footer'
import Sidebar from './components/Sidebar'
import logo from './assets/logo.png'

const Layout = () => {
  const { pathname } = useLocation()
  const { isAuth } = useRefresh()

  const isAuthPage = ['/login', '/signup', '/forgot-password', '/'].includes(
    pathname
  )

  return (
    <div className='flex flex-col min-h-screen bg-gray-50 dark:bg-gray-950 text-black dark:text-white'>
      {/* Top nav for auth pages */}
      {isAuthPage && (
        <nav className='w-full flex items-center justify-between py-4 px-6 shadow-sm bg-white dark:bg-gray-800'>
          <Link to='/'>
            <img src={logo} alt='SmartBudget Logo' className='h-7' />
          </Link>

          <div className='flex items-center gap-4'>
            {!isAuth ? (
              <>
                <Link
                  className='px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700'
                  to='/login'>
                  Login
                </Link>
                <Link
                  className='px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700'
                  to='/signup'>
                  Sign up
                </Link>
              </>
            ) : (
              <Link
                className='px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700'
                to='/dashboard'>
                Dashboard
              </Link>
            )}
          </div>
        </nav>
      )}

      {/* Sidebar + Main content */}
      <div className='flex flex-1 min-h-screen'>
        {isAuth && <Sidebar />}
        <main className='flex-1 overflow-auto'>
          <Outlet />
        </main>
      </div>

      <Footer />
    </div>
  )
}

export default Layout

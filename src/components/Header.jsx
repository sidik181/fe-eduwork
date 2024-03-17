import { ShoppingCartIcon, Bars3Icon, XMarkIcon, ArrowDownIcon, UserIcon, PowerIcon, AdjustmentsHorizontalIcon } from '@heroicons/react/24/outline'
import logoURL from "../assets/logo.png"
import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { logoutUser } from '../app/api/auth'
import { userLogout } from '../app/features/auth/actions'
import { useDispatch } from 'react-redux'


export const Header = () => {
  const auth = localStorage.getItem('auth') ? JSON.parse(localStorage.getItem('auth')) : null;

  const [mobileMenu, setMobileMenu] = useState(false)
  const [desktopAccount, setDesktopAccount] = useState(false)

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const cartItems = JSON.parse(localStorage.getItem('cart') || '[]')
  const totalQtyCart = cartItems.reduce((sum, item) => sum + item.qty, 0)

  const toggleAccount = () => {
    setDesktopAccount(!desktopAccount)
  }

  const toggleMobileMenu = () => {
    setMobileMenu(!mobileMenu)
  }

  const handleLogout = async () => {
    await logoutUser()
    dispatch(userLogout())
    navigate('/')
  }

  return (
    <div className="bg-indigo-950">
      <nav className='flex justify-between mx-auto p-4 items-center max-w-2xl px-4 sm:px-6 lg:max-w-7xl lg:px-8'>
        <Link to={'/'}>
          <div>
            <span className="sr-only">Jejualan</span>
            <img className="h-7" src={logoURL} alt="Jejualan" />
          </div>
        </Link>
        <div>
        </div>
        <div className="text-white md:flex hidden">
          <Link to={'/cart'} className='flex'>
            <ShoppingCartIcon className="cursor-pointer w-6 h-6 mr-1" />
            <span className='mr-3'>{`(${totalQtyCart})`}</span>
          </Link>
          {!auth?.user ?
            <div className='hidden md:block'>
              <Link to={'/login'}>
                <span className='bg-blue-600 px-4 py-2 hover:bg-blue-400 rounded-md text-md font-semibold leading-6 text-white'>Log in</span>
              </Link>
            </div> :
            <div onClick={toggleAccount} className='hidden relative md:flex'>
              <span className='text-md font-semibold leading-6 text-white cursor-pointer'>Hi, {auth.user.full_name}</span>
              <ArrowDownIcon className='ml-1 w-4 cursor-pointer'></ArrowDownIcon>
              <div className={desktopAccount ? 'absolute flex flex-col w-full rounded-md top-10 right-0 px-3 bg-indigo-950' : 'hidden'}>
                <Link to={'/account'}>
                  <div className='flex hover:bg-gray-200 hover:text-black rounded-sm p-1 cursor-pointer'>
                    <UserIcon className='w-4 mr-2'></UserIcon>
                    <span className='text-md'>Account</span>
                  </div>
                </Link>
                {auth?.user?.role === 'admin' &&
                  <Link to={'/settings'}>
                    <div className='flex hover:bg-gray-200 hover:text-black rounded-sm p-1 cursor-pointer'>
                      <AdjustmentsHorizontalIcon className='w-4 mr-2'></AdjustmentsHorizontalIcon>
                      <span className='text-md'>Pengaturan</span>
                    </div>
                  </Link>
                }
                <div onClick={handleLogout} className='flex mb-3 hover:bg-gray-200 hover:text-black rounded-sm p-1 cursor-pointer'>
                  <PowerIcon className='w-4 mr-2'></PowerIcon>
                  <span className='text-md'>Logout</span>
                </div>
              </div>
            </div>
          }
        </div>
        <Bars3Icon onClick={toggleMobileMenu} className={mobileMenu ? "hidden" : "block sm:hidden w-8"}></Bars3Icon>
        <XMarkIcon onClick={toggleMobileMenu} className={mobileMenu ? "block w-8 z-50" : "hidden"}></XMarkIcon>
      </nav>
      <div className={mobileMenu ? "sm:hidden fixed inset-0 z-10 bg-gray-900 bg-opacity-50" : "hidden"} id="mobile-menu">
        <div className="fixed top-14 w-full">
          <div className="space-y-1 px-2 pb-3 pt-2 flex flex-col bg-indigo-950">
            {
              auth?.user ?
                <>
                  <span className='text-md font-semibold leading-6 px-3 py-1 text-white cursor-pointer'>Hi, {auth.user.full_name}</span>
                  <Link to={'/cart'} className="text-white hover:bg-gray-700 hover:text-white rounded-md px-3 py-1 text-base font-medium">
                    <span>Keranjang</span>
                  </Link>
                  {auth.role === 'admin' &&
                    <Link to={'/settings'} className="text-white hover:bg-gray-700 hover:text-white rounded-md px-3 py-1 text-base font-medium">
                      <span>Pengaturan</span>
                    </Link>
                  }
                  <Link to={'/account'} className="text-white hover:bg-gray-700 hover:text-white rounded-md px-3 py-1 text-base font-medium">
                    <span>Akun</span>
                  </Link>
                  <span onClick={handleLogout} className="text-white hover:bg-gray-700 hover:text-white rounded-md px-3 py-1 text-base font-medium">Logout</span>
                </>
                :
                <Link to={'/login'} className='mt-3'>
                  <span className='text-white rounded-md px-3 py-2 text-base font-bold'>Log in</span>
                </Link>
            }
          </div>
        </div>
      </div>
    </div>
  )
}

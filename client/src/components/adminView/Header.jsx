import React from 'react'
import { Button } from '../ui/button'
import { AlignJustify, LogOut } from 'lucide-react'
import { useDispatch } from 'react-redux'
import { logoutUser, resetTokenAndCredentials } from '@/store/authSlice'
import { useNavigate } from 'react-router-dom'

const AdminHeader = ({ setOpen }) => {

  const dispatch = useDispatch()
  const navigation = useNavigate()

  
  function handleLogout() {
    // dispatch(logoutUser())
      dispatch(resetTokenAndCredentials());
        sessionStorage.clear();
        navigation("/auth/login");
    
  }

  return (
    <header className='flex items-center justify-between px-4 py-3 bg-background border-b'>
      <Button className="lg:hidden sm:block" onClick={() => setOpen(true)}>
        <AlignJustify />
        <span className='sr-only'>Toggle menu</span>
      </Button>

      <div className="flex flex-1 justify-end">
        <Button onClick={handleLogout} className="inline-flex gap-2 items-center ic rounded-md px-4 py-2 text-sm font-medium shadow">
          <LogOut />
          Logout
        </Button>
      </div>
    </header>
  )
}

export default AdminHeader
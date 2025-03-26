import CommonForm from '@/components/common/form';
import { registerFormControls } from '@/config';
import { registerUser } from '@/store/authSlice';
import React, { useState } from 'react'
import toast, { Toaster } from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom'


const initialState = {
  userName: "",
  email: "",
  password:""
}

const AuthRegister = () => {

  const [formData, setFormData] = useState(initialState);
  const dispatch = useDispatch()
  const navigate = useNavigate()

  function onSubmit(e) {
    e.preventDefault();
    dispatch(registerUser(formData)).then((data) => {
      if (data?.payload?.success) {
        toast.success(`${formData.userName} Successfully Registered!`)
        navigate("/auth/login")
      } else {
        toast.error(`${formData.email} Already! exists. login with same credentials`)
        
      }
    })
  }


  return (
    <div className='mx-auto w-full max-w-md space-y-6'>
      <div className="text-center">
        <h1 className='text-3xl font-bold tracking-tighter text-foreground'>Create new account</h1>
        <p className='mt-2'>Already have an account</p>
        <Link to={"/auth/login"} className='font-medium ml-1 text-primary hover:underline'>Login</Link>
      </div>

      <CommonForm formControls={registerFormControls} buttonText={"Sign Up"} formData={formData} setFormData={setFormData} onSubmit={onSubmit} />
     
    </div>
  )
}

export default AuthRegister
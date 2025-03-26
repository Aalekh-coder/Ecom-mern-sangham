import CommonForm from '@/components/common/form';
import { loginFormControls } from '@/config';
import { loginUser } from '@/store/authSlice';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom'


const initialState = {
  email: "",
  password:""
}

const AuthLogin = () => {

  const [formData, setFormData] = useState(initialState);
const dispatch  = useDispatch()

  function onSubmit(e) {
    e.preventDefault();
    dispatch(loginUser(formData)).then(data => {
      if (data?.payload?.success) {
        toast.success("user Logged in successfully")
      } else {
        toast.error(data?.payload?.message)
      }
    })
  }

  return (
    <div className='mx-auto w-full max-w-md space-y-6'>
      <div className="text-center">
        <h1 className='text-3xl font-bold tracking-tighter text-foreground'>Sign in to your account</h1>
        <p className='mt-2'>Don't have an account</p>
        <Link to={"/auth/register"} className='font-medium ml-1 text-primary hover:underline'>Register</Link>
      </div>

      <CommonForm formControls={loginFormControls} buttonText={"Sign In"} formData={formData} setFormData={setFormData} onSubmit={onSubmit} />
    </div>
  )
}

export default AuthLogin
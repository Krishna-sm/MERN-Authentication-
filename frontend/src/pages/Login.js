import React, { useState } from 'react'
import { toast } from 'react-toastify'
import {  useLoginUserMutation } from '../providers/redux/queries/Auth.query'
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {


  const [LoginUser,LoginUserResponse] = useLoginUserMutation();
  const navigate = useNavigate()

  const [form,setForm] = useState({
    email:"",
    password:""
  })

  const onChangeTextHandler = (e)=>setForm({...form,[e.target.name]:e.target.value})


  const onSubmitHandler = async(e)=>{
    e.preventDefault()

    if( !form.password || !form.email){
      toast.error("fill all details...");
      return
    }
    try {
    // form data

    // const formData = new FormData();
    // formData.append("email",form.email);
    // formData.append("password",form.password);


    const {data,error} = await LoginUser(form)
    
    if(error){
      toast.error(error?.data?.message);

      return 
    }
    
    
 

               if(data.token){
                      
    setForm({
      email:"",
      password:""
    })
    toast.success(data.msg);

                localStorage.setItem("token",data.token);
                navigate("/");
               }

               
    } catch (error) {
          toast.error(error.message)
    }
  }


  return (
    <>
          <div className="d-flex justify-content-center align-items-center " style={{minHeight:"82vh"}}>
              <form onSubmit={onSubmitHandler} className="col-sm-12 col-md-6 mx-auto">
              <div className="mb-3">
                   <h1 className="text-center">Login</h1>
                  </div>
                
                  <div className="mb-3">
                    <label htmlFor="email">EMail</label>
                    <input type="email" className='form-control' id='email' name='email' placeholder='Enter your Email' value={form.email} onChange={onChangeTextHandler}  />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="password">Password</label>
                    <input type="password" className='form-control' id='password' name='password' placeholder='Enter your Password' value={form.password} onChange={onChangeTextHandler}  />
                  </div>
                 
                  <div className="mb-3 d-flex justify-content-between">
                    <button type='submit' disabled={LoginUserResponse.isLoading} className="btn-dark btn-sm btn">{LoginUserResponse.isLoading?"loading...":`Login`}</button>
                    <Link to={'/forget'} className='text-center'>Forget Password ? </Link>
                  </div>
                  <div className="mb-3 ">
                    <p className='text-center'>Don't Have An Account?  <Link to={'/register'}>Register</Link> </p>
                  </div>
              </form>
          </div>
    </>
  )
}

export default Login
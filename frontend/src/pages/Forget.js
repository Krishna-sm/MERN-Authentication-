import React, { useState } from 'react'
import { toast } from 'react-toastify'
import {  useForgetPasswordMutation } from '../providers/redux/queries/Auth.query'
import { Link, useNavigate } from 'react-router-dom';

const Forget = () => {


  const [ForgetPassword,ForgetPasswordResponse] = useForgetPasswordMutation();
  const navigate = useNavigate()

  const [form,setForm] = useState({
  })

  const onChangeTextHandler = (e)=>setForm({...form,[e.target.name]:e.target.value})


  const onSubmitHandler = async(e)=>{
    e.preventDefault()

    if( !form.email){
      toast.error("fill all details...");
      return
    }
    try {
    // form data

    // const formData = new FormData();
    // formData.append("email",form.email);
    // formData.append("password",form.password);


    const {data,error} = await ForgetPassword(form)
    
    if(error){
      toast.error(error?.data?.message);

      return 
    }
    
    
 
                      
    setForm({
      email:""
    })
    toast.success(data.msg);

                navigate("/login");

               
    } catch (error) {
          toast.error(error.message)
    }
  }


  return (
    <>
          <div className="d-flex justify-content-center align-items-center " style={{minHeight:"82vh"}}>
              <form onSubmit={onSubmitHandler} className="col-sm-12 col-md-6 mx-auto">
              <div className="mb-3">
                   <h1 className="text-center">Forget Password</h1>
                  </div>
                
                  <div className="mb-3">
                    <label htmlFor="email">EMail</label>
                    <input type="email" className='form-control' id='email' name='email' placeholder='Enter your Email' value={form.email} onChange={onChangeTextHandler}  />
                  </div>
                  <div className="mb-3 d-flex justify-content-between">
                    <button type='submit' disabled={ForgetPasswordResponse.isLoading} className="btn-dark btn-sm btn">{ForgetPasswordResponse.isLoading?"loading...":`Forget`}</button>
                    <Link to={'/login'} className='text-center'>Already Know ? </Link>
                  </div>
                 
              </form>
          </div>
    </>
  )
}

export default Forget
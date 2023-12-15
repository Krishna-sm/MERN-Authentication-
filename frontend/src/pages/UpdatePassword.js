import React, { useState } from 'react'
import { toast } from 'react-toastify'
import {  useUpdatePasswordMutation } from '../providers/redux/queries/Auth.query'
import { Link, useNavigate,useSearchParams ,Navigate} from 'react-router-dom';

const UpdatePassword = () => {



    const [query] = useSearchParams();

    



  const [UpdatePassword,UpdatePasswordResponse] = useUpdatePasswordMutation();
  const navigate = useNavigate()

  const [form,setForm] = useState({
    email:'',
    password:'',
    cpassword:'',
    token:query.get("token")
  })


  if(!query.get("token")){
    return <Navigate to={'/login'}  />
  }

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


    const {data,error} = await UpdatePassword(form)
    
    if(error){
      toast.error(error?.data?.message);

      return 
    }
    
    
 
                      
    setForm({
      email:'',
      password:'',
      cpassword:''
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
                   <h1 className="text-center">Update Password</h1>
                  </div>
                
                  <div className="mb-3">
                    <label htmlFor="email">EMail</label>
                    <input type="email" className='form-control' id='email' name='email' placeholder='Enter your Email' value={form.email} onChange={onChangeTextHandler}  />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="password">Password</label>
                    <input type="password" className='form-control' id='password' name='password' placeholder='Enter Your Password' value={form.password} onChange={onChangeTextHandler}  />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="cpassword">Confirm Password</label>
                    <input type="password" className='form-control' id='cpassword' name='cpassword' placeholder='Re-Enter Your Password' value={form.cpassword} onChange={onChangeTextHandler}  />
                  </div>
                  <div className="mb-3 ">
                    <button type='submit' disabled={UpdatePasswordResponse.isLoading} className="btn-dark btn-sm btn">{UpdatePasswordResponse.isLoading?"loading...":`Update`}</button>
                  </div>
                 
              </form>
          </div>
    </>
  )
}

export default UpdatePassword
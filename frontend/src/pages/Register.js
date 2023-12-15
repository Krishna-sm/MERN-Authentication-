import React, { useState } from 'react'
import { toast } from 'react-toastify'
import { useRegisterUserMutation } from '../providers/redux/queries/Auth.query'
import { Link } from 'react-router-dom';

const Register = () => {


  const [RegisterUser,RegisterUserResponse] = useRegisterUserMutation();

  const [form,setForm] = useState({
    name:"",
    email:"",
    password:"",
    image:null
  })

  const onChangeTextHandler = (e)=>setForm({...form,[e.target.name]:e.target.value})
  const onChangeImageHandler = (e)=>setForm({...form,image:e.target.files[0]})


  const onSubmitHandler = async(e)=>{
    e.preventDefault()

    if(!form.image || !form.name || !form.password || !form.email){
      toast.error("fill all details...");
      return
    }
    try {
    // form data

    const formData = new FormData();
    formData.append("name",form.name);
    formData.append("email",form.email);
    formData.append("password",form.password);
    formData.append("image",form.image);


    const {data,error} = await RegisterUser(formData)
    
    if(error){
      toast.error(error?.data?.message);

      return 
    }
    
    
       
    setForm({
                  name:"",
                  email:"",
                  password:"",
                  image:null
                })
                toast.success(data.msg);


    } catch (error) {
          toast.error(error.message)
    }
  }


  return (
    <>
          <div className="d-flex justify-content-center align-items-center " style={{minHeight:"82vh"}}>
              <form onSubmit={onSubmitHandler} className="col-sm-12 col-md-6 mx-auto">
              <div className="mb-3">
                   <h1 className="text-center">Register</h1>
                  </div>
                  <div className="mb-3">
                    <label htmlFor="name">Name</label>
                    <input type="text" className='form-control' id='name' name='name'  placeholder='Enter your Name' value={form.name} onChange={onChangeTextHandler} />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="email">EMail</label>
                    <input type="email" className='form-control' id='email' name='email' placeholder='Enter your Email' value={form.email} onChange={onChangeTextHandler}  />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="password">Password</label>
                    <input type="password" className='form-control' id='password' name='password' placeholder='Enter your Password' value={form.password} onChange={onChangeTextHandler}  />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="pic">Picture</label>
                    <input type="file" className='form-control' id='pic' name='image' onChange={onChangeImageHandler}  />
                   {form.image && <div className="w-25">
                      <img src={URL.createObjectURL(form.image)} alt="" className="w-50" />
                    </div>}
                  </div>
                  <div className="mb-3">
                    <button type='submit' disabled={RegisterUserResponse.isLoading} className="btn-dark btn-sm btn">{RegisterUserResponse.isLoading?"loading...":`Register`}</button>
                  </div>
                  <div className="mb-3">
                    <p className='text-center'>Don't Have An Account?  <Link to={'/login'}>Login</Link> </p>
                  </div>
              </form>
          </div>
    </>
  )
}

export default Register
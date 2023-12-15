import React, { useState } from 'react'
import { toast } from 'react-toastify'
import {  useUpdateProfileMutation,useUserProfileQuery } from '../providers/redux/queries/Auth.query'
import {useSelector} from 'react-redux'
import MainLayout from '../Layout/MainLayout';
const Forget = () => {

  const user = useSelector(state=>state.userSlice.user);
  const {refetch} = useUserProfileQuery()
const [UpdateProfile,setUpdateProfile] = useUpdateProfileMutation()
  

  const [form,setForm] = useState({
    email:user.email || "",
    name: user.name||""
  })

  
  const [image,setImage] = useState({
    image:null
  })
  if(!user){
    return <div>loading...</div>
  }



  const onChangeTextHandler = (e)=>setForm({...form,[e.target.name]:e.target.value})
  const onChangeImageHandler = (e)=>setImage({image:e.target.files[0]})


  const onSubmitHandler = async(e)=>{
    e.preventDefault()
 
    if( !form.email || !form.name){
      toast.error("fill all details...");
      return
    }
    try {




      const {data,error} = await UpdateProfile(form);
    
      if(error){
        toast.error(error.data.message);
        return
      }
      refetch()
      toast.success(data.msg);
  
    
                
               
    } catch (error) {
          toast.error(error.message)
    }
  }


  const onSubmitImageHandler =async (e)=>{
    e.preventDefault()

    if( !image.image){
      toast.error("fill all details...");
      return
    }

    const formData = new FormData();
    formData.append("image",image.image);
    // formData.append("password",form.password);


    const {data,error} = await UpdateProfile(formData);
    
    if(error){
      toast.error(error.data.message);
      return
    }
    refetch()
    toast.success(data.msg);



  }





  
  return (
    <MainLayout>

<div className="container d-flex col justify-content-center align-items-center w-full">
        <div className=" gap-5">
        <img src={image.image ?URL.createObjectURL(image.image): user?.image} alt="images" className="w-25 rounded-circle" />

            <form onSubmit={onSubmitImageHandler} className="col-sm-6 col-md-3">
              <input type="file" onChange={onChangeImageHandler} className="form-control" />
              <button type='submit' 
              disabled={setUpdateProfile.isLoading}
               className="btn-dark btn-sm btn">{`Update Image`}</button>
            </form>
     

         </div>
</div>

          <div className="d-flex justify-content-center align-items-center " style={{minHeight:"82vh"}}>
              <form onSubmit={onSubmitHandler} className="col-sm-12 col-md-6 mx-auto">
              <div className="mb-3">
                   <h1 className="text-center">Update Profile</h1>
                  </div>
                  <div className="mb-3">
                    <label htmlFor="name">Name</label>
                    <input type="text" className='form-control' id='name' name='name' placeholder='Enter your Name' value={form.name} onChange={onChangeTextHandler}  />
                  </div>
                
                  <div className="mb-3">
                    <label htmlFor="email">EMail</label>
                    <input type="email" className='form-control' id='email' name='email' placeholder='Enter your Email' value={form.email} onChange={onChangeTextHandler}  />
                  </div>
                  <div className="mb-3 d-flex justify-content-between">
                    <button type='submit' disabled={UpdateProfile.isLoading} className="btn-dark btn-sm btn">{UpdateProfile.isLoading?"loading...":`Update`}</button>
                  </div>
                 
              </form>
          </div>
    </MainLayout>
  )
}

export default Forget
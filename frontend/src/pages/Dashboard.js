import React from 'react'
import MainLayout from '../Layout/MainLayout';
import {useSelector} from 'react-redux'
const Dashboard = () => {

const user = useSelector(state=>state.userSlice.user);

// console.log({user})

  return (
          <MainLayout>
          
          <div className='d-flex justify-content-center align-items-center ' style={{minHeight:"82vh"}}>
      <div className="col-sm-12 col md-6 container">
            <div className="card-heading">
              <h1>Profile</h1>
            </div>
            <div className="card-body">
              <img src={user?.image} className='w-25' alt="" />
              <h1>Name : {user?.name}</h1>
              <h1>Email : {user?.email}</h1>
            </div>
      </div>
      

    </div>
          </MainLayout>
  )
}

export default Dashboard
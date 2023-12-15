import React from 'react'
import { useUserProfileQuery } from '../providers/redux/queries/Auth.query'
import { setUser } from '../providers/redux/slices/User.slice'
import {  useNavigate } from 'react-router-dom';
import {useDispatch} from 'react-redux'

const MainLayout = ({children}) => {
    const {data,isLoading,isError} = useUserProfileQuery()
    const dispatch = useDispatch()
    const navigate = useNavigate()



  
    if(isError){
        navigate("/login")
            return <>
            
            </>
    }
    if(isLoading){

        return <>loading...</>
    }

    if( !isLoading &&  data){
        dispatch(setUser(data?.user));
    }


  return (
    <>
        {children}
    </>
  )
}

export default MainLayout
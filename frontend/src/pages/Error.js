import React from 'react'
import { useNavigate } from 'react-router-dom'

const Error = () => {
    const navigate = useNavigate()
  return (
    <>
                <h1>Not Found</h1>
                <button  onClick={()=>navigate("/")} className="btn btn-dark">back</button>
    </>
  )
}

export default Error
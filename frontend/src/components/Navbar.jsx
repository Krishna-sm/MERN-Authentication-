import React from 'react'
import { Link } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import {useSelector,useDispatch} from 'react-redux'
import { toast } from 'react-toastify'
import { removeUser } from '../providers/redux/slices/User.slice'
import {  useNavigate } from 'react-router-dom';
const Navbar = () => {
  const user = useSelector(state=>state.userSlice.user);
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const LogoutHandler = async()=>{
    try{
      dispatch(removeUser());
      toast.success("logout success")
      navigate("/login");
    }catch(e){
      toast.error(e.message)
    }
  }

  return (
    <>

    <ToastContainer/>
           <nav className="navbar navbar-expand-lg bg-dark navbar-dark">
  <div className="container-fluid">
    <Link to={'/'} className="navbar-brand" >Authentication</Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon" />
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
       
     { !user ?<>
       
       <li className="nav-item">
          <Link className="btn btn-outline-danger mx-1" aria-current="page" to="/login">Login</Link>
         
        </li>
        <li className="nav-item">
        <Link className="btn btn-outline-primary mx-1" aria-current="page" to="/register">Register</Link>
        </li>
       </>:
       <>
        <li className="nav-item">
          <Link className="nav-link active" aria-current="page" to="/">Dashboard</Link>
        </li>
        <li className="nav-item">
        <Link to="/profile" className="nav-link active mx-1">Profile</Link>
        </li>
        <li className="nav-item">
        <button onClick={LogoutHandler} className="btn btn-outline-primary mx-1">Logout</button>
        </li>

</>

}
        

      </ul>
     
    </div>
  </div>
</nav>

    </>
  )
}

export default Navbar
import React from 'react'
import { BrowserRouter,Routes,Route } from 'react-router-dom'
import Dashboard from './pages/Dashboard'
import Login from './pages/Login'
import Register from './pages/Register'
import Forget from './pages/Forget'
import Profile from './pages/Profile'
import UpdatePassword from './pages/UpdatePassword'
import Error from './pages/Error'
import Navbar from './components/Navbar'

const App = () => {
  return (
    <>

            <BrowserRouter>
            <Navbar/>
                            <Routes>
                                    <Route path={'/'} Component={Dashboard} />
                                    <Route path={'/login'} Component={Login} />
                                    <Route path={'/register'} Component={Register} />
                                    <Route path={'/forget'} Component={Forget} />
                                    <Route path={'/profile'} Component={Profile} />
                                    <Route path={'/update-password'} Component={UpdatePassword} />
                                    <Route path={'*'} Component={Error} />
                            </Routes>
                            
            </BrowserRouter>
    </>
  )
}

export default App
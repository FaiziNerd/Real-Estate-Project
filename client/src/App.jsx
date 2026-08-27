/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */

import './App.css'
import { Route,Routes } from 'react-router-dom'
import Header from './components/Header'
import Home from './pages/Home'
import SignUp from './pages/SignUp'
import SignIn from './pages/SignIn'
import SignOut from './pages/SignOut'
import About from './pages/About'
import Profile from './pages/Profile'
import PrivateRoute from './components/PrivateRoute'
import CreateListing from './pages/CreateListing'



function App() {


  return (
    <>
     <Header/>
     <Routes>
      <Route path='/' element = {<Home/>}/>
      <Route element = {<PrivateRoute/>}>
        <Route path='/profile' element = {<Profile/>}/>
        <Route path='/create-listing' element = {<CreateListing/>}/>
      </Route>
      <Route path='/about' element = {<About/>}/>
      <Route path='/sign-in' element = {<SignIn/>}/>
      <Route path='/sign-up' element = {<SignUp/>}/>
      <Route path='/sign-out' element = {<SignOut/>}/>
      </Routes>
    </>
  )
}

export default App

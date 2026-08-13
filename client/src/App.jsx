/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */

import './App.css'
import { Route,Routes } from 'react-router-dom'
import Header from './components/Header'
import Home from './pages/Home'
import SignIn from './pages/SignIn'
import SignOut from './pages/SignOut'
import About from './pages/About'
import Profile from './pages/Profile'



function App() {


  return (
    <>
     <Header/>
     <Routes>
      <Route path='/' element = {<Home/>}/>
      <Route path='/profile' element = {<Profile/>}/>
      <Route path='/about' element = {<About/>}/>
      <Route path='/sign-in' element = {<SignIn/>}/>
      <Route path='/sign-out' element = {<SignOut/>}/>
      </Routes>
    </>
  )
}

export default App

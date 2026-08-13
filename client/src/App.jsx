/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */

import './App.css'
import { Route,Routes } from 'react-router-dom'

function App() {


  return (
    <>
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

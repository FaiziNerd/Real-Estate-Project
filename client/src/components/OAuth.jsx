/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import React from 'react'
import  { signInWithPopup, GoogleAuthProvider,getAuth } from 'firebase/auth'
import { app } from '../firebase'
import { useDispatch } from 'react-redux'
import { signInSuccess } from '../redux/user/UserSlice'
import { useNavigate } from 'react-router-dom'
function OAuth() {

    const dispatch = useDispatch()
    const navigate = useNavigate()
   

   async function handleGoogleClick ()
   {
    try {
        const provider = new GoogleAuthProvider()
        const auth = getAuth(app)

        const result = await signInWithPopup(auth, provider)

        const res = await fetch('/api/auth/google',{
            method: 'POST',
            headers: {
                'Content-type': 'application/json'

            },
            body: JSON.stringify({name: result.user.displayName, email:result.user.email,
                photo:result.user.photoURL
            })
        })

        const data = await res.json()
        dispatch(signInSuccess(data))
        navigate('/')
        
        console.log(data)

    } catch (error) {
        console.log("Couldn't Sign in with Google", error)
    }
   }
 
 
    return (
    <button   onClick = {handleGoogleClick} type= 'button'className='bg-red-700 text-white
    p-3 rounded-lg uppercase hover:opacity-95'>Continue with Google</button>
  )
}

export default OAuth
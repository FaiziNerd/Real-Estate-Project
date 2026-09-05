import  { signInWithPopup, GoogleAuthProvider,getAuth } from 'firebase/auth'
import { app } from '../firebase'
import { useDispatch } from 'react-redux'
import { signInSuccess } from '../redux/user/UserSlice'
import { useNavigate } from 'react-router-dom'
import { PiGoogleLogo } from 'react-icons/pi'
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
            credentials: 'include',
            body: JSON.stringify({name: result.user.displayName, email:result.user.email,
                photo:result.user.photoURL
            })
        })

        const data = await res.json()
        if (!res.ok || data.success === false) {
            throw new Error(data.message || "Couldn't Sign in with Google")
        }
        dispatch(signInSuccess(data))
        navigate('/')

    } catch (error) {
        console.log("Couldn't Sign in with Google", error)
    }
   }
 
 
    return (
    <button onClick={handleGoogleClick} type="button" className="btn-secondary gap-2">
      <PiGoogleLogo className="h-5 w-5" aria-hidden="true" />
      Continue with Google
    </button>
  )
}

export default OAuth
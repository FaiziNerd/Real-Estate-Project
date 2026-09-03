import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { signOutUserFailure, signOutUserStart, signOutUserSuccess } from '../redux/user/UserSlice'

function SignOut ()
{
  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    const signOut = async () => {
      try {
        dispatch(signOutUserStart())
        const res = await fetch('/api/auth/sign-out', {
          credentials: 'include',
        })
        const data = await res.json()
        if (data.success === false) {
          dispatch(signOutUserFailure(data.message))
          return
        }
        dispatch(signOutUserSuccess())
        navigate('/sign-in')
      } catch (error) {
        dispatch(signOutUserFailure(error.message))
      }
    }

    signOut()
  }, [dispatch, navigate])

  return (
    <p className="text-center my-7 text-2xl">Signing out...</p>
  )
}


export default SignOut

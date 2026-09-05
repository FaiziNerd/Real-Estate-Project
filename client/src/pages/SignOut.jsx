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
    <section className="mx-auto max-w-lg px-4 py-16">
      <div className="surface-card p-8 text-center" aria-live="polite">
        <h1 className="text-3xl font-semibold">Signing out</h1>
        <p className="mt-3 text-pretty text-sm text-muted">
          Clearing your session. You will land on sign in in a moment.
        </p>
      </div>
    </section>
  )
}


export default SignOut

import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { signInStart, signInFailure, signInSuccess } from '../redux/user/UserSlice'
import OAuth from '../components/OAuth'

function SignIn() {
  const { loading, error } = useSelector((state) => state.user)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  })

  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    })
  }

  async function handlesubmit(e) {
    e.preventDefault()

    try {
      dispatch(signInStart())
      const res = await fetch('/api/auth/sign-in', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(formData),
      })
      const data = await res.json()
      if (data.success === false) {
        dispatch(signInFailure(data.message))
        return
      }
      dispatch(signInSuccess(data))
      navigate('/')
    } catch (error) {
      dispatch(signInFailure(error.message))
    }
  }

  return (
    <div className="mx-auto max-w-lg px-4 py-16">
      <header className="text-center">
        <h1 className="text-balance text-3xl font-semibold sm:text-4xl">Sign in</h1>
        <p className="mt-3 text-pretty text-sm text-muted">
          Use your email to manage listings and write to owners.
        </p>
      </header>

      <div className="surface-card mt-8 p-6 sm:p-8">
        <form onSubmit={handlesubmit} className="flex flex-col gap-4">
          <div>
            <label htmlFor="email" className="field-label">
              Email
            </label>
            <input
              onChange={handleChange}
              type="email"
              inputMode="email"
              autoComplete="email"
              spellCheck={false}
              placeholder="you@example.com…"
              className="input-field"
              id="email"
              name="email"
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="field-label">
              Password
            </label>
            <input
              onChange={handleChange}
              type="password"
              autoComplete="current-password"
              placeholder="Your password…"
              className="input-field"
              id="password"
              name="password"
              required
            />
          </div>

          {error && (
            <p className="field-error text-sm" role="alert">
              {error}
            </p>
          )}

          <button disabled={loading} className="btn-primary">
            {loading ? 'Signing in…' : 'Sign in'}
          </button>

          <div className="relative my-1 flex items-center gap-3">
            <span className="h-px flex-1 bg-line" aria-hidden="true" />
            <span className="text-xs font-semibold uppercase tracking-wide text-muted">
              Or
            </span>
            <span className="h-px flex-1 bg-line" aria-hidden="true" />
          </div>

          <OAuth />
        </form>

        <p className="mt-6 text-sm text-muted">
          Need an account?{' '}
          <Link to="/sign-up" className="font-semibold text-forest hover:underline">
            Create account
          </Link>
        </p>
      </div>
    </div>
  )
}

export default SignIn

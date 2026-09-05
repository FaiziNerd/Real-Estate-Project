import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import OAuth from '../components/OAuth'

function SignUp() {
  const [error, setError] = useState(null)
  const [loading, setloading] = useState(false)
  const navigate = useNavigate()

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
      setloading(true)
      const res = await fetch('/api/auth/sign-up', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })
      const data = await res.json()
      if (data.success === false) {
        setError(data.message)
        setloading(false)
        return
      }
      setloading(false)
      setError(null)
      navigate('/sign-in')
    } catch (error) {
      setloading(false)
      setError(error.message)
    }
  }

  return (
    <div className="mx-auto max-w-lg px-4 py-16">
      <header className="text-center">
        <h1 className="text-balance text-3xl font-semibold sm:text-4xl">Create account</h1>
        <p className="mt-3 text-pretty text-sm text-muted">
          Publish homes and message owners from one login.
        </p>
      </header>

      <div className="surface-card mt-8 p-6 sm:p-8">
        <form onSubmit={handlesubmit} className="flex flex-col gap-4">
          <div>
            <label htmlFor="username" className="field-label">
              Username
            </label>
            <input
              onChange={handleChange}
              type="text"
              autoComplete="username"
              spellCheck={false}
              placeholder="Choose a username…"
              className="input-field"
              id="username"
              name="username"
              required
            />
          </div>

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
              autoComplete="new-password"
              placeholder="Create a password…"
              className="input-field"
              id="password"
              name="password"
              required
            />
            <p className="mt-2 text-xs text-muted">Use a password you do not reuse elsewhere.</p>
          </div>

          {error && (
            <p className="field-error text-sm" role="alert">
              {error}
            </p>
          )}

          <button disabled={loading} className="btn-primary">
            {loading ? 'Creating account…' : 'Create account'}
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
          Already have an account?{' '}
          <Link to="/sign-in" className="font-semibold text-forest hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  )
}

export default SignUp

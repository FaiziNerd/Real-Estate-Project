import { useState } from 'react'
import { Link } from 'react-router-dom'

const STORAGE_KEY = 'havenlane-cookie-choice'

export default function CookieBanner() {
  const [choice, setChoice] = useState(() => {
    try {
      return localStorage.getItem(STORAGE_KEY)
    } catch {
      return null
    }
  })

  if (choice) return null

  const save = (value) => {
    localStorage.setItem(STORAGE_KEY, value)
    setChoice(value)
  }

  return (
    <div
      className="fixed inset-x-0 bottom-0 z-50 overflow-y-auto overscroll-contain border border-line bg-surface p-4 pb-[max(1rem,env(safe-area-inset-bottom))] shadow-[0_-4px_12px_rgba(0,0,0,0.06)]"
      role="dialog"
      aria-labelledby="cookie-title"
      aria-describedby="cookie-copy"
    >
      <div className="mx-auto flex max-w-6xl flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div className="min-w-0">
          <h2 id="cookie-title" className="text-base font-semibold">
            Cookies on this site
          </h2>
          <p id="cookie-copy" className="mt-2 max-w-2xl text-pretty text-sm text-muted">
            We use a session cookie so you stay signed in, and we store this choice and a guest shortlist on your device. Signed in hearts are stored with your account. There are no ad trackers. Read the{' '}
            <Link to="/privacy" className="font-semibold text-forest underline">
              privacy policy
            </Link>
            .
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <button type="button" className="btn-secondary" onClick={() => save('essential')}>
            Essential only
          </button>
          <button type="button" className="btn-primary" onClick={() => save('accepted')}>
            Accept cookies
          </button>
        </div>
      </div>
    </div>
  )
}

import { useEffect, useState } from 'react'
import { PiMagnifyingGlass, PiList, PiX, PiMoon, PiSun } from 'react-icons/pi'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useSavedHomes } from '../context/SavedHomesContext'
import { useTheme } from '../context/ThemeContext'

const NAV_LINKS = [
  { to: '/', label: 'Home' },
  { to: '/search', label: 'Listings' },
  { to: '/saved', label: 'Saved' },
  { to: '/about', label: 'About' },
]

function Header() {
  const { currentUser } = useSelector((state) => state.user)
  const { count } = useSavedHomes()
  const { isDark, toggle } = useTheme()
  const [searchTerm, setSearchTerm] = useState('')
  const [menuOpen, setMenuOpen] = useState(false)
  const [menuReveal, setMenuReveal] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()

  const handleSubmit = (e) => {
    e.preventDefault()
    const urlParams = new URLSearchParams(window.location.search)
    urlParams.set('searchTerm', searchTerm)
    navigate(`/search?${urlParams.toString()}`)
    setMenuOpen(false)
  }

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search)
    const searchTermFromUrl = urlParams.get('searchTerm') || ''
    setSearchTerm(searchTermFromUrl)
  }, [location.search])

  useEffect(() => {
    setMenuOpen(false)
  }, [location.pathname])

  useEffect(() => {
    if (!menuOpen) {
      setMenuReveal(false)
      return
    }
    const frame = requestAnimationFrame(() => setMenuReveal(true))
    return () => cancelAnimationFrame(frame)
  }, [menuOpen])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  useEffect(() => {
    const onKey = (event) => {
      if (event.key === 'Escape') setMenuOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  return (
    <header className="sticky top-0 z-40 px-4 pt-6">
      <div className="mx-auto flex w-full max-w-6xl items-center gap-3 rounded-full border border-line bg-surface/80 px-4 py-2 shadow-[0_1px_2px_rgba(0,0,0,0.05)] backdrop-blur-xl">
        <Link to="/" className="shrink-0 text-base font-semibold sm:text-lg" translate="no">
          <span className="text-muted">Haven</span>
          <span className="text-ink">lane</span>
        </Link>

        <form
          onSubmit={handleSubmit}
          className="hidden min-w-0 flex-1 items-center rounded-full bg-linen px-3 py-1 sm:flex"
          role="search"
        >
          <label htmlFor="header-search" className="sr-only">
            Search homes
          </label>
          <input
            id="header-search"
            name="searchTerm"
            type="search"
            autoComplete="off"
            spellCheck={false}
            placeholder="Neighborhood, street, or city…"
            className="min-w-0 flex-1 bg-transparent py-2 text-sm text-ink placeholder:text-muted focus-visible:outline-none"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button type="submit" className="btn-ghost min-h-11 min-w-11 rounded-full" aria-label="Search listings">
            <PiMagnifyingGlass className="h-5 w-5" aria-hidden="true" />
          </button>
        </form>

        <div className="ml-auto flex items-center gap-1">
          <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary">
            {NAV_LINKS.map((item) => {
              const current = location.pathname === item.to
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  aria-current={current ? 'page' : undefined}
                  className={`inline-flex items-center gap-2 rounded-full px-3 py-2 text-sm font-semibold transition-colors duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] ${
                    current ? 'bg-linen text-ink' : 'text-muted hover:text-ink'
                  }`}
                >
                  {item.label}
                  {item.to === '/saved' && count > 0 && (
                    <span className="tabular rounded-full bg-forest px-2 py-0.5 text-xs font-semibold text-white">
                      {count}
                    </span>
                  )}
                </Link>
              )
            })}
          </nav>

          <Link to="/profile" className="hidden items-center lg:flex" aria-label={currentUser ? 'Account' : 'Sign in'}>
            {currentUser ? (
              <img
                className="h-11 w-11 rounded-full object-cover"
                src={currentUser.avatar}
                alt=""
                width={44}
                height={44}
              />
            ) : (
              <span className="btn-primary text-sm">Sign in</span>
            )}
          </Link>

          <button
            type="button"
            className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-full text-forest transition-colors duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] hover:bg-forest/10"
            onClick={toggle}
            aria-label={isDark ? 'Switch to light theme' : 'Switch to dark theme'}
          >
            {isDark ? (
              <PiSun className="h-5 w-5" aria-hidden="true" />
            ) : (
              <PiMoon className="h-5 w-5" aria-hidden="true" />
            )}
          </button>

          <button
            type="button"
            className="relative flex h-11 w-11 items-center justify-center rounded-full lg:hidden"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((open) => !open)}
          >
            <span className="sr-only">{menuOpen ? 'Close menu' : 'Open menu'}</span>
            <span className="relative block h-4 w-5">
              <span
                className={`absolute left-0 top-0 h-0.5 w-5 bg-ink transition-transform duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] ${
                  menuOpen ? 'top-1.5 rotate-45' : ''
                }`}
              />
              <span
                className={`absolute left-0 top-1.5 h-0.5 w-5 bg-ink transition-opacity duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] ${
                  menuOpen ? 'opacity-0' : 'opacity-100'
                }`}
              />
              <span
                className={`absolute left-0 top-3 h-0.5 w-5 bg-ink transition-transform duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] ${
                  menuOpen ? 'top-1.5 -rotate-45' : ''
                }`}
              />
            </span>
            {menuOpen ? <PiX className="sr-only" /> : <PiList className="sr-only" />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="fixed inset-0 z-[60] overflow-y-auto overscroll-contain bg-surface/80 backdrop-blur-3xl lg:hidden">
          <div className="flex justify-end p-6">
            <button
              type="button"
              className="flex h-11 w-11 items-center justify-center rounded-full"
              aria-label="Close menu"
              onClick={() => setMenuOpen(false)}
            >
              <PiX className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <form onSubmit={handleSubmit} className="mx-6 mb-8 flex items-center rounded-2xl bg-linen px-3" role="search">
            <label htmlFor="mobile-search" className="sr-only">
              Search homes
            </label>
            <input
              id="mobile-search"
              name="searchTerm"
              type="search"
              autoComplete="off"
              spellCheck={false}
              placeholder="Neighborhood, street, or city…"
              className="min-w-0 flex-1 bg-transparent py-3 text-base focus-visible:outline-none"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button type="submit" className="btn-ghost" aria-label="Search listings">
              <PiMagnifyingGlass className="h-5 w-5" aria-hidden="true" />
            </button>
          </form>
          <nav aria-label="Mobile" className="flex flex-col gap-2 px-6">
            {NAV_LINKS.map((item, index) => (
              <Link
                key={item.to}
                to={item.to}
                className={`flex items-center gap-3 text-3xl font-semibold text-ink ${
                  menuReveal ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'
                }`}
                style={{
                  transition: 'transform 700ms cubic-bezier(0.32, 0.72, 0, 1), opacity 700ms cubic-bezier(0.32, 0.72, 0, 1)',
                  transitionDelay: `${100 + index * 50}ms`,
                }}
              >
                {item.label}
                {item.to === '/saved' && count > 0 && (
                  <span className="tabular rounded-full bg-forest px-2 py-1 text-sm font-semibold text-white">
                    {count}
                  </span>
                )}
              </Link>
            ))}
            <Link
              to="/profile"
              className="mt-4 text-3xl font-semibold text-ink"
              style={{ transitionDelay: '250ms' }}
            >
              {currentUser ? 'Account' : 'Sign in'}
            </Link>
            <button
              type="button"
              className="btn-secondary mt-6 w-fit"
              onClick={toggle}
            >
              {isDark ? 'Use light theme' : 'Use dark theme'}
            </button>
          </nav>
        </div>
      )}
    </header>
  )
}

export default Header

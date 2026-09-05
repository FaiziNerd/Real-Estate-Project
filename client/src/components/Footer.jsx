import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="mt-16 bg-surface px-4 py-12">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 sm:flex-row sm:items-start sm:justify-between">
        <div className="min-w-0">
          <p className="text-lg font-semibold" translate="no">
            Havenlane
          </p>
          <p className="mt-2 max-w-sm text-pretty text-sm text-muted">
            Homes for sale and rent, with photos and prices you can compare before a viewing.
          </p>
        </div>
        <nav aria-label="Legal" className="flex flex-wrap gap-6 text-sm font-semibold">
          <Link className="text-forest hover:underline" to="/saved">
            Saved homes
          </Link>
          <Link className="text-forest hover:underline" to="/privacy">
            Privacy policy
          </Link>
          <Link className="text-forest hover:underline" to="/terms">
            Terms of use
          </Link>
          <Link className="text-forest hover:underline" to="/about">
            About
          </Link>
        </nav>
      </div>
    </footer>
  )
}

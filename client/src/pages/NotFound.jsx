import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <section className="mx-auto flex min-h-[60vh] max-w-[680px] flex-col justify-center px-4 py-16">
      <p className="text-sm font-semibold text-forest">404</p>
      <h1 className="mt-2 text-4xl font-semibold">This page is not on the map</h1>
      <p className="mt-4 text-pretty text-base text-muted">
        The address you opened does not match a listing or a page on Havenlane. Head home or search the catalog.
      </p>
      <div className="mt-8 flex flex-wrap gap-3">
        <Link to="/" className="btn-primary">
          Back to home
        </Link>
        <Link to="/search" className="btn-secondary">
          Browse listings
        </Link>
      </div>
    </section>
  )
}

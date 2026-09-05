import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import ListingItem from '../components/ListingItem'
import ListingCardSkeleton from '../components/ListingCardSkeleton'
import { useSavedHomes } from '../context/SavedHomesContext'

export default function Saved() {
  const { ids } = useSavedHomes()
  const { currentUser } = useSelector((state) => state.user)
  const [listings, setListings] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let cancelled = false

    const load = async () => {
      if (ids.length === 0) {
        setListings([])
        setLoading(false)
        return
      }

      setLoading(true)
      const results = await Promise.all(
        ids.map(async (id) => {
          try {
            const res = await fetch(`/api/listing/get/${id}`)
            const data = await res.json()
            if (!res.ok || data.success === false) return null
            return data
          } catch {
            return null
          }
        })
      )
      if (!cancelled) {
        setListings(results.filter(Boolean))
        setLoading(false)
      }
    }

    load()
    return () => {
      cancelled = true
    }
  }, [ids])

  return (
    <section className="mx-auto max-w-6xl px-4 py-12">
      <header className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <div className="flex flex-wrap items-center gap-3">
            <h1 className="text-3xl font-semibold">Saved homes</h1>
            {ids.length > 0 && (
              <span className="tabular rounded-lg bg-linen px-2 py-1 text-xs font-semibold text-muted">
                {ids.length} saved
              </span>
            )}
          </div>
          <p className="mt-2 max-w-[680px] text-pretty text-sm text-muted">
            {currentUser
              ? 'This shortlist is stored with your account. Sign in on another device to see the same hearts.'
              : 'This shortlist lives on this browser until you sign in. After you sign in it is stored with your account.'}
          </p>
        </div>
        {!currentUser && (
          <Link to="/sign-in" className="btn-secondary shrink-0">
            Sign in to sync
          </Link>
        )}
      </header>

      {loading && (
        <div className="mt-8 flex flex-wrap gap-4" aria-live="polite">
          <p className="sr-only">Loading saved homes…</p>
          {ids.map((id) => (
            <ListingCardSkeleton key={id} />
          ))}
        </div>
      )}

      {!loading && listings.length === 0 && (
        <div className="surface-card mt-8 p-8">
          <p className="text-xl font-semibold">No homes saved yet</p>
          <p className="mt-2 text-pretty text-sm text-muted">
            Tap the heart on a listing card to add it here, then come back when you are ready to
            contact owners.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link to="/search" className="btn-primary">
              Browse listings
            </Link>
            {!currentUser && (
              <Link to="/sign-in" className="btn-secondary">
                Sign in
              </Link>
            )}
          </div>
        </div>
      )}

      {!loading && listings.length > 0 && (
        <div className="mt-8 flex flex-wrap gap-4">
          {listings.map((listing) => (
            <ListingItem key={listing._id} listing={listing} />
          ))}
        </div>
      )}
    </section>
  )
}

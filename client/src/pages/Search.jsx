import { useEffect, useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import ListingItem from '../components/ListingItem'
import ListingCardSkeleton from '../components/ListingCardSkeleton'

export default function Search() {
  const navigate = useNavigate()
  const location = useLocation()
  const [sidebardata, setSidebardata] = useState({
    searchTerm: '',
    type: 'all',
    parking: false,
    furnished: false,
    offer: false,
    sort: 'createdAt',
    order: 'desc',
  })

  const [loading, setLoading] = useState(false)
  const [listings, setListings] = useState([])
  const [showMore, setShowMore] = useState(false)

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search)
    const searchTermFromUrl = urlParams.get('searchTerm')
    const typeFromUrl = urlParams.get('type')
    const parkingFromUrl = urlParams.get('parking')
    const furnishedFromUrl = urlParams.get('furnished')
    const offerFromUrl = urlParams.get('offer')
    const sortFromUrl = urlParams.get('sort')
    const orderFromUrl = urlParams.get('order')

    const nextSidebarData = {
      searchTerm: searchTermFromUrl || '',
      type: typeFromUrl === 'sale' ? 'sell' : typeFromUrl || 'all',
      parking: parkingFromUrl === 'true',
      furnished: furnishedFromUrl === 'true',
      offer: offerFromUrl === 'true',
      sort: sortFromUrl === 'created_at' ? 'createdAt' : sortFromUrl || 'createdAt',
      order: orderFromUrl || 'desc',
    }

    setSidebardata(nextSidebarData)

    const fetchListings = async () => {
      setLoading(true)
      setShowMore(false)
      const searchQuery = urlParams.toString()
      const res = await fetch(`/api/listing/get?${searchQuery}`)
      const data = await res.json()
      if (Array.isArray(data) && data.length > 8) {
        setShowMore(true)
      } else {
        setShowMore(false)
      }
      setListings(Array.isArray(data) ? data : [])
      setLoading(false)
    }

    fetchListings()
  }, [location.search])

  const handleChange = (e) => {
    if (e.target.id === 'all' || e.target.id === 'rent' || e.target.id === 'sell') {
      setSidebardata({ ...sidebardata, type: e.target.id })
    }

    if (e.target.id === 'searchTerm') {
      setSidebardata({ ...sidebardata, searchTerm: e.target.value })
    }

    if (
      e.target.id === 'parking' ||
      e.target.id === 'furnished' ||
      e.target.id === 'offer'
    ) {
      setSidebardata({
        ...sidebardata,
        [e.target.id]: e.target.checked || e.target.checked === 'true' ? true : false,
      })
    }

    if (e.target.id === 'sort_order') {
      const sort = e.target.value.split('_')[0] || 'createdAt'
      const order = e.target.value.split('_')[1] || 'desc'
      setSidebardata({ ...sidebardata, sort, order })
    }
  }

  const setType = (type) => {
    setSidebardata((prev) => ({ ...prev, type }))
  }

  const toggleFilter = (id) => {
    setSidebardata((prev) => ({ ...prev, [id]: !prev[id] }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const urlParams = new URLSearchParams()
    urlParams.set('searchTerm', sidebardata.searchTerm)
    urlParams.set('type', sidebardata.type)
    urlParams.set('parking', sidebardata.parking)
    urlParams.set('furnished', sidebardata.furnished)
    urlParams.set('offer', sidebardata.offer)
    urlParams.set('sort', sidebardata.sort)
    urlParams.set('order', sidebardata.order)
    navigate(`/search?${urlParams.toString()}`)
  }

  const onShowMoreClick = async () => {
    const numberOfListings = listings.length
    const startIndex = numberOfListings
    const urlParams = new URLSearchParams(location.search)
    urlParams.set('startIndex', startIndex)
    const searchQuery = urlParams.toString()
    const res = await fetch(`/api/listing/get?${searchQuery}`)
    const data = await res.json()
    if (data.length < 9) {
      setShowMore(false)
    }
    setListings([...listings, ...data])
  }

  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-8 md:flex-row">
      <aside className="surface-card h-fit p-6 md:w-80 md:shrink-0">
        <h2 className="text-lg font-semibold">Filters</h2>
        <p className="mt-1 text-sm text-muted">Narrow by place, type, and extras.</p>

        <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-6">
          <div>
            <label htmlFor="searchTerm" className="field-label">
              Place
            </label>
            <input
              type="search"
              id="searchTerm"
              name="searchTerm"
              autoComplete="off"
              spellCheck={false}
              placeholder="City or neighborhood…"
              className="input-field"
              value={sidebardata.searchTerm}
              onChange={handleChange}
            />
          </div>

          <div>
            <p className="field-label">Type</p>
            <div
              className="grid grid-cols-3 gap-1 rounded-xl bg-linen p-1"
              role="group"
              aria-label="Listing type"
            >
              {[
                { id: 'all', label: 'All' },
                { id: 'rent', label: 'Rent' },
                { id: 'sell', label: 'Sale' },
              ].map((option) => {
                const active = sidebardata.type === option.id
                return (
                  <button
                    key={option.id}
                    type="button"
                    id={option.id}
                    onClick={() => setType(option.id)}
                    aria-pressed={active}
                    className={`min-h-11 rounded-lg text-sm font-semibold transition-colors duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] ${
                      active
                        ? 'bg-surface text-ink shadow-[0_1px_2px_rgba(0,0,0,0.06)]'
                        : 'text-muted hover:text-ink'
                    }`}
                  >
                    {option.label}
                  </button>
                )
              })}
            </div>
          </div>

          <div>
            <p className="field-label">Extras</p>
            <div className="flex flex-wrap gap-2">
              {[
                { id: 'parking', label: 'Parking' },
                { id: 'furnished', label: 'Furnished' },
                { id: 'offer', label: 'Price drop' },
              ].map((item) => {
                const active = sidebardata[item.id]
                return (
                  <button
                    key={item.id}
                    type="button"
                    id={item.id}
                    aria-pressed={active}
                    onClick={() => toggleFilter(item.id)}
                    className={`min-h-11 rounded-lg border px-3 text-sm font-semibold transition-colors duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] ${
                      active
                        ? 'border-forest bg-forest text-white'
                        : 'border-line bg-surface text-muted hover:text-ink'
                    }`}
                  >
                    {item.label}
                  </button>
                )
              })}
            </div>
          </div>

          <div>
            <label htmlFor="sort_order" className="field-label">
              Sort
            </label>
            <select
              onChange={handleChange}
              value={`${sidebardata.sort}_${sidebardata.order}`}
              id="sort_order"
              name="sort"
              className="input-field"
            >
              <option value="regularPrice_desc">Price, high to low</option>
              <option value="regularPrice_asc">Price, low to high</option>
              <option value="createdAt_desc">Newest</option>
              <option value="createdAt_asc">Oldest</option>
            </select>
          </div>

          <button type="submit" className="btn-primary">
            Apply filters
          </button>
        </form>
      </aside>

      <div className="min-w-0 flex-1 py-2">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <h1 className="text-3xl font-semibold text-ink">Listing results</h1>
            <p className="mt-2 text-sm text-muted">
              {loading
                ? 'Searching homes…'
                : listings.length === 0
                  ? 'No homes in this view yet'
                  : `${listings.length}${showMore ? '+' : ''} home${listings.length === 1 ? '' : 's'} shown`}
            </p>
          </div>
        </div>

        <div className="mt-6 flex flex-wrap gap-4">
          {!loading && listings.length === 0 && (
            <div className="surface-card w-full p-8">
              <p className="text-xl font-semibold">No homes match these filters</p>
              <p className="mt-2 text-pretty text-sm text-muted">
                Clear a filter or try a broader place name, then search again.
              </p>
            </div>
          )}
          {loading && (
            <>
              <p className="sr-only" aria-live="polite">
                Loading listings…
              </p>
              {[0, 1, 2, 3].map((slot) => (
                <ListingCardSkeleton key={slot} />
              ))}
            </>
          )}

          {!loading &&
            listings.map((listing) => (
              <ListingItem key={listing._id} listing={listing} />
            ))}

          {showMore && (
            <button type="button" onClick={onShowMoreClick} className="btn-ghost w-full">
              Show more listings
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

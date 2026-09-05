import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Swiper, SwiperSlide } from 'swiper/react'
import SwiperCore from 'swiper'
import { useSelector } from 'react-redux'
import { Navigation } from 'swiper/modules'
import 'swiper/css/bundle'
import {
  PiBathtub,
  PiBed,
  PiArmchair,
  PiMapPin,
  PiCar,
  PiShareNetwork,
} from 'react-icons/pi'
import Contact from '../components/Contact'
import SaveHomeButton from '../components/SaveHomeButton'
import UsdAmount from '../components/UsdAmount'

export default function Listing() {
  SwiperCore.use([Navigation])
  const [listing, setListing] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)
  const [copied, setCopied] = useState(false)
  const [contact, setContact] = useState(false)
  const params = useParams()
  const { currentUser } = useSelector((state) => state.user)

  useEffect(() => {
    const fetchListing = async () => {
      try {
        setLoading(true)
        const res = await fetch(`/api/listing/get/${params.listingId}`)
        const data = await res.json()
        if (data.success === false) {
          setError(true)
          setLoading(false)
          return
        }
        setListing(data)
        setLoading(false)
        setError(false)
      } catch {
        setError(true)
        setLoading(false)
      }
    }
    fetchListing()
  }, [params.listingId])

  const price = listing
    ? listing.offer
      ? listing.discountPrice
      : listing.regularPrice
    : 0

  return (
    <div>
      {loading && (
        <div className="mx-auto max-w-6xl px-4 py-8" aria-live="polite">
          <p className="sr-only">Loading listing…</p>
          <div className="aspect-video animate-pulse rounded-2xl bg-line" />
          <div className="mx-auto mt-8 flex max-w-4xl flex-col gap-3">
            <div className="h-8 w-3/4 animate-pulse rounded-lg bg-line" />
            <div className="h-4 w-1/2 animate-pulse rounded-lg bg-line" />
            <div className="h-24 w-full animate-pulse rounded-2xl bg-line" />
          </div>
        </div>
      )}
      {error && (
        <div className="mx-auto max-w-[680px] px-4 py-16 text-center">
          <p className="text-lg font-semibold">This listing could not be loaded</p>
          <p className="mt-2 text-pretty text-sm text-muted">
            Check your connection and try again, or return to search.
          </p>
          <Link to="/search" className="btn-primary mt-6">
            Browse listings
          </Link>
        </div>
      )}
      {listing && !loading && !error && (
        <article>
          <div className="relative mx-4 overflow-clip rounded-2xl lg:mx-auto lg:max-w-6xl">
            <Swiper navigation>
              {listing.imageUrls.map((url, index) => (
                <SwiperSlide key={url}>
                  <img
                    src={url}
                    alt={`${listing.name} photo ${index + 1}`}
                    width={1600}
                    height={900}
                    className="aspect-video w-full object-cover"
                  />
                </SwiperSlide>
              ))}
            </Swiper>
            <div className="absolute right-3 top-3 z-10 flex gap-3">
              <button
                type="button"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-line bg-surface transition-transform duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] active:scale-[0.98]"
                aria-label="Copy listing link"
                onClick={() => {
                  navigator.clipboard.writeText(window.location.href)
                  setCopied(true)
                  setTimeout(() => {
                    setCopied(false)
                  }, 2000)
                }}
              >
                <PiShareNetwork className="h-5 w-5 text-muted" aria-hidden="true" />
              </button>
              <SaveHomeButton listingId={listing._id} name={listing.name} />
            </div>
            {copied && (
              <p
                className="absolute right-3 top-16 z-10 rounded-lg border border-line bg-surface px-3 py-2 text-sm"
                role="status"
                aria-live="polite"
              >
                Link copied
              </p>
            )}
          </div>

          <div className="mx-auto my-8 flex max-w-4xl flex-col gap-6 px-4">
            <section className="surface-card p-6">
              <div className="flex flex-wrap gap-2">
                <span className="rounded-lg border border-forest/20 bg-linen px-3 py-2 text-sm font-semibold text-forest">
                  {listing.type === 'rent' ? 'For rent' : 'For sale'}
                </span>
                {listing.offer && (
                  <span className="rounded-lg border border-clay/30 bg-linen px-3 py-2 text-sm font-semibold text-clay">
                    <UsdAmount
                      value={+listing.regularPrice - +listing.discountPrice}
                      suffix=" off"
                    />
                  </span>
                )}
              </div>

              <h1 className="mt-4 text-balance text-2xl font-semibold sm:text-3xl">
                {listing.name}
              </h1>

              <p className="mt-3 text-2xl font-semibold tabular text-forest sm:text-3xl">
                <UsdAmount value={price} suffix={listing.type === 'rent' ? ' / month' : ''} />
              </p>

              {listing.offer && (
                <p className="mt-1 text-sm text-muted line-through">
                  <UsdAmount value={listing.regularPrice} />
                </p>
              )}

              <p className="mt-4 flex items-center gap-2 text-sm text-muted">
                <PiMapPin className="shrink-0 text-forest" aria-hidden="true" />
                {listing.address}
              </p>

              <ul className="mt-6 flex flex-wrap gap-3">
                <li className="inline-flex min-h-11 items-center gap-2 rounded-lg bg-linen px-3 text-sm font-semibold text-forest">
                  <PiBed className="text-lg" aria-hidden="true" />
                  {listing.bedrooms} {listing.bedrooms > 1 ? 'beds' : 'bed'}
                </li>
                <li className="inline-flex min-h-11 items-center gap-2 rounded-lg bg-linen px-3 text-sm font-semibold text-forest">
                  <PiBathtub className="text-lg" aria-hidden="true" />
                  {listing.bathrooms} {listing.bathrooms > 1 ? 'baths' : 'bath'}
                </li>
                <li className="inline-flex min-h-11 items-center gap-2 rounded-lg bg-linen px-3 text-sm font-semibold text-forest">
                  <PiCar className="text-lg" aria-hidden="true" />
                  {listing.parking ? 'Parking' : 'No parking'}
                </li>
                <li className="inline-flex min-h-11 items-center gap-2 rounded-lg bg-linen px-3 text-sm font-semibold text-forest">
                  <PiArmchair className="text-lg" aria-hidden="true" />
                  {listing.furnished ? 'Furnished' : 'Unfurnished'}
                </li>
              </ul>
            </section>

            <section className="surface-card p-6">
              <h2 className="text-lg font-semibold">Description</h2>
              <p className="mt-3 text-pretty text-base text-muted">{listing.description}</p>
            </section>

            {currentUser && listing.userRef !== currentUser._id && (
              <section className="surface-card p-6">
                <h2 className="text-lg font-semibold">Contact</h2>
                <p className="mt-1 text-sm text-muted">
                  Ask about a visit, timing, or anything the listing leaves open.
                </p>
                {!contact ? (
                  <button
                    type="button"
                    onClick={() => setContact(true)}
                    className="btn-primary mt-6"
                  >
                    Contact owner
                  </button>
                ) : (
                  <div className="mt-6">
                    <Contact listing={listing} />
                  </div>
                )}
              </section>
            )}
          </div>
        </article>
      )}
    </div>
  )
}

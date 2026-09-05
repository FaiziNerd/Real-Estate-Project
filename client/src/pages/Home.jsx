import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import SwiperCore from 'swiper'
import { Navigation } from 'swiper/modules'
import { PiHouse, PiMagnifyingGlass, PiChatCircle } from 'react-icons/pi'
import ListingItem from '../components/ListingItem'
import ListingCardSkeleton from '../components/ListingCardSkeleton'
import ScrollReveal from '../components/ScrollReveal'
import TaglineReveal from '../components/TaglineReveal'
import FaqSection from '../components/FaqSection'
import 'swiper/css/bundle'

export default function Home() {
  const [offerListings, setofferListings] = useState([])
  const [saleListings, setSaleListings] = useState([])
  const [rentListings, setrentListings] = useState([])
  const [loading, setLoading] = useState(true)
  SwiperCore.use([Navigation])

  useEffect(() => {
    const fetchofferListings = async () => {
      try {
        const res = await fetch(`/api/listing/get?offer=true&limit=4`)
        const data = await res.json()
        setofferListings(Array.isArray(data) ? data : [])
        fetchRentListings()
      } catch (error) {
        console.log(error)
        setLoading(false)
      }
    }

    const fetchRentListings = async () => {
      try {
        const res = await fetch(`/api/listing/get?type=rent&limit=4`)
        const data = await res.json()
        setrentListings(Array.isArray(data) ? data : [])
        fetchSaleListings()
      } catch (error) {
        console.log(error)
        setLoading(false)
      }
    }

    const fetchSaleListings = async () => {
      try {
        const res = await fetch(`/api/listing/get?type=sell&limit=4`)
        const data = await res.json()
        setSaleListings(Array.isArray(data) ? data : [])
      } catch (error) {
        console.log(error)
      } finally {
        setLoading(false)
      }
    }

    fetchofferListings()
  }, [])

  const gallery = offerListings.length > 0 ? offerListings : [...rentListings, ...saleListings].slice(0, 4)

  return (
    <div>
      <section className="mx-auto flex max-w-6xl flex-col gap-6 px-4 pb-12 pt-16 sm:pt-24">
        <p className="text-sm font-semibold text-forest">Homes for sale and rent</p>
        <h1 className="hero-heading max-w-[680px] text-4xl font-semibold leading-10 sm:text-6xl sm:leading-none">
          Find a home
          <br />
          that fits how you live
        </h1>
        <p className="max-w-[680px] text-pretty text-base text-muted sm:text-lg">
          Search by neighborhood, compare photos and price, then message the owner when you are ready to tour.
        </p>
        <div className="flex flex-wrap items-center gap-3">
          <Link to="/search" className="btn-primary">
            Browse listings
          </Link>
          <p className="text-sm text-muted">No account needed to search or save a shortlist</p>
        </div>
      </section>

      {gallery.length > 0 && (
        <Swiper navigation className="max-w-6xl overflow-clip rounded-2xl mx-4 lg:mx-auto">
          {gallery.map((listing) => (
            <SwiperSlide key={listing._id}>
              <img
                src={listing.imageUrls?.[0]}
                alt=""
                width={1600}
                height={900}
                fetchPriority="high"
                className="aspect-video w-full object-cover"
              />
            </SwiperSlide>
          ))}
        </Swiper>
      )}

      <ScrollReveal>
        <section className="mx-auto grid max-w-6xl gap-6 px-4 py-16 sm:grid-cols-3">
          {[
            {
              icon: PiMagnifyingGlass,
              title: 'Search with intent',
              body: 'Filter by sale, rent, parking, and furnished so you only open homes that match.',
            },
            {
              icon: PiHouse,
              title: 'See the rooms first',
              body: 'Cover photos lead every card. Open a listing for the full gallery before you travel.',
            },
            {
              icon: PiChatCircle,
              title: 'Talk to the owner',
              body: 'Send a note from the listing page. No extra form maze, just email ready to send.',
            },
          ].map((item) => (
            <div key={item.title} className="surface-card p-6">
              <item.icon className="h-8 w-8 text-forest" aria-hidden="true" />
              <h2 className="mt-4 text-xl font-semibold">{item.title}</h2>
              <p className="mt-2 text-pretty text-sm text-muted">{item.body}</p>
            </div>
          ))}
        </section>
      </ScrollReveal>

      <TaglineReveal />

      <ScrollReveal>
        <section className="mx-auto max-w-6xl px-4 py-12">
          <h2 className="text-3xl font-semibold">How a search works</h2>
          <ol className="mt-8 grid gap-6 sm:grid-cols-3">
            {[
              { step: '1', title: 'Enter a place', body: 'Type a city, street, or neighborhood in search.' },
              { step: '2', title: 'Narrow the list', body: 'Choose rent or sale, then parking or furnished if you need them.' },
              { step: '3', title: 'Open and write', body: 'Read the details, scan photos, then contact the owner.' },
            ].map((item) => (
              <li key={item.step} className="surface-card p-6">
                <p className="tabular text-sm font-semibold text-forest">Step {item.step}</p>
                <h3 className="mt-2 text-xl font-semibold">{item.title}</h3>
                <p className="mt-2 text-pretty text-sm text-muted">{item.body}</p>
              </li>
            ))}
          </ol>
        </section>
      </ScrollReveal>

      <ScrollReveal>
        <section className="mx-auto max-w-6xl px-4 py-12">
          <h2 className="text-3xl font-semibold">What people do first</h2>
          <div className="mt-8 grid gap-6 sm:grid-cols-3">
            {[
              {
                quote: 'I compared four two beds in one evening, then wrote the owner before I booked a tour.',
                name: 'Nadia Rahman',
                role: 'Renter, Lahore',
              },
              {
                quote: 'The offer price sat next to the original. Buyers asked fewer vague questions after that.',
                name: 'Marcus Hale',
                role: 'Owner, Chicago',
              },
              {
                quote: 'The shortlist on this browser was enough for a weekend of viewings with no extra app.',
                name: 'Priya Menon',
                role: 'Buyer, Karachi',
              },
            ].map((item) => (
              <figure key={item.name} className="surface-card flex flex-col p-6">
                <blockquote className="text-pretty text-base text-ink">{item.quote}</blockquote>
                <figcaption className="mt-4 text-sm font-semibold">
                  {item.name}
                  <span className="mt-1 block font-normal text-muted">{item.role}</span>
                </figcaption>
              </figure>
            ))}
          </div>
        </section>
      </ScrollReveal>

      <ScrollReveal>
        <section className="mx-auto max-w-6xl px-4 py-12">
          <h2 className="text-3xl font-semibold">Nothing extra to start</h2>
          <ul className="mt-8 grid gap-6 sm:grid-cols-3">
            {[
              {
                title: 'Browse as a guest',
                body: 'Search, open photos, and save homes before you create a login. Sign in later to keep the shortlist with your account.',
              },
              {
                title: 'Listing is free',
                body: 'Owners publish photos and price with no listing fee. Delete the home from your account anytime.',
              },
              {
                title: 'Leave when you want',
                body: 'Sign out, clear the shortlist, or delete your account. There is no paid plan to cancel.',
              },
            ].map((item) => (
              <li key={item.title} className="surface-card p-6">
                <h3 className="text-xl font-semibold">{item.title}</h3>
                <p className="mt-2 text-pretty text-sm text-muted">{item.body}</p>
              </li>
            ))}
          </ul>
        </section>
      </ScrollReveal>

      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-4 py-10">
        {loading && (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4" aria-live="polite">
            <p className="sr-only">Loading listings…</p>
            {[0, 1, 2, 3].map((slot) => (
              <ListingCardSkeleton key={slot} />
            ))}
          </div>
        )}

        {!loading && offerListings.length === 0 && rentListings.length === 0 && saleListings.length === 0 && (
          <div className="surface-card p-8">
            <h2 className="text-2xl font-semibold">No homes in the catalog yet</h2>
            <p className="mt-2 text-pretty text-sm text-muted">
              Sign in and publish a listing, or check back after owners add photos and prices.
            </p>
            <Link to="/sign-in" className="btn-primary mt-6">
              Sign in to list a home
            </Link>
          </div>
        )}

        {!loading && offerListings.length > 0 && (
          <ScrollReveal>
            <section>
              <div className="mb-6">
                <h2 className="text-2xl font-semibold">Homes with a price drop</h2>
                <Link className="btn-ghost mt-2 px-0" to="/search?offer=true">
                  Show more offers
                </Link>
              </div>
              <div className="flex flex-wrap gap-4">
                {offerListings.map((listing) => (
                  <ListingItem listing={listing} key={listing._id} />
                ))}
              </div>
            </section>
          </ScrollReveal>
        )}

        {!loading && rentListings.length > 0 && (
          <ScrollReveal>
            <section>
              <div className="mb-6">
                <h2 className="text-2xl font-semibold">Places for rent</h2>
                <Link className="btn-ghost mt-2 px-0" to="/search?type=rent">
                  Show more rentals
                </Link>
              </div>
              <div className="flex flex-wrap gap-4">
                {rentListings.map((listing) => (
                  <ListingItem listing={listing} key={listing._id} />
                ))}
              </div>
            </section>
          </ScrollReveal>
        )}

        {!loading && saleListings.length > 0 && (
          <ScrollReveal>
            <section>
              <div className="mb-6">
                <h2 className="text-2xl font-semibold">Homes for sale</h2>
                <Link className="btn-ghost mt-2 px-0" to="/search?type=sell">
                  Show more for sale
                </Link>
              </div>
              <div className="flex flex-wrap gap-4">
                {saleListings.map((listing) => (
                  <ListingItem listing={listing} key={listing._id} />
                ))}
              </div>
            </section>
          </ScrollReveal>
        )}
      </div>

      <ScrollReveal>
        <FaqSection />
      </ScrollReveal>

      <ScrollReveal>
        <section className="mx-auto mb-16 max-w-6xl px-4">
          <div className="surface-card flex flex-col items-start gap-4 p-8 sm:p-12">
            <h2 className="max-w-[680px] text-3xl font-semibold sm:text-4xl">
              Ready to shortlist a few addresses?
            </h2>
            <p className="max-w-[680px] text-pretty text-base text-muted">
              Open the full catalog, then filter by rent or sale. Listing is free for owners who sign in.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link to="/search" className="btn-primary">
                Browse listings
              </Link>
              <Link to="/saved" className="btn-secondary">
                Open saved homes
              </Link>
            </div>
          </div>
        </section>
      </ScrollReveal>
    </div>
  )
}

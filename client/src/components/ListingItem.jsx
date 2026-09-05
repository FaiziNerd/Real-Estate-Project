import { Link } from 'react-router-dom'
import { PiMapPin } from 'react-icons/pi'
import UsdAmount from './UsdAmount'
import SaveHomeButton from './SaveHomeButton'

export default function ListingItem({ listing }) {
  const price = listing.offer ? listing.discountPrice : listing.regularPrice
  const cover =
    listing.imageUrls?.[0] ||
    'https://53.fs1.hubspotusercontent-na1.net/hub/53/hubfs/Sales_Blog/real-estate-business-compressor.jpg?width=595&height=400&name=real-estate-business-compressor.jpg'

  return (
    <article className="group relative surface-card w-full overflow-clip sm:w-80">
      <div className="absolute right-3 top-3 z-10">
        <SaveHomeButton listingId={listing._id} name={listing.name} />
      </div>
      <Link to={`/listing/${listing._id}`} className="flex h-full flex-col">
        <div className="overflow-clip">
          <img
            src={cover}
            alt=""
            width={660}
            height={440}
            loading="lazy"
            className="listing-cover aspect-video w-full object-cover"
          />
        </div>
        <div className="flex min-w-0 flex-1 flex-col gap-2 p-4">
          <h3 className="truncate text-lg font-semibold text-ink">{listing.name}</h3>
          <div className="flex min-w-0 items-center gap-1">
            <PiMapPin className="h-4 w-4 shrink-0 text-forest" aria-hidden="true" />
            <p className="min-w-0 truncate text-sm text-muted">{listing.address}</p>
          </div>
          <p className="line-clamp-2 text-pretty text-sm text-muted">{listing.description}</p>
          <p className="mt-2 text-base font-semibold text-forest">
            <UsdAmount value={price} suffix={listing.type === 'rent' ? ' / month' : ''} />
          </p>
          <div className="flex gap-4 text-xs font-semibold text-ink">
            <span>
              {listing.bedrooms} {listing.bedrooms > 1 ? 'beds' : 'bed'}
            </span>
            <span>
              {listing.bathrooms} {listing.bathrooms > 1 ? 'baths' : 'bath'}
            </span>
          </div>
        </div>
      </Link>
    </article>
  )
}

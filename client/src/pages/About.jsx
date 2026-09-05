import { Link } from 'react-router-dom'

export default function About() {
  return (
    <article className="mx-auto max-w-[680px] px-4 py-16">
      <p className="text-sm font-semibold text-forest">About Havenlane</p>
      <h1 className="hero-heading mt-3 text-4xl font-semibold leading-10">
        A quieter way
        <br />
        to look at homes
      </h1>
      <p className="mt-6 text-pretty text-base text-muted">
        Havenlane is a listing site for people who want to buy, sell, or rent without a noisy
        marketplace. You search by place, read the details, and write to the owner when a home is
        worth a visit.
      </p>
      <p className="mt-4 text-pretty text-base text-muted">
        Owners publish photos, price, beds, baths, parking, and whether the home is furnished.
        Renters and buyers compare those facts side by side instead of guessing from a single street
        view.
      </p>

      <section className="surface-card mt-8 p-6">
        <h2 className="text-lg font-semibold">What we care about</h2>
        <ul className="mt-4 flex flex-col gap-3 text-sm text-muted">
          <li className="flex gap-3">
            <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-forest" aria-hidden="true" />
            <span className="text-pretty">Accurate photos that show the real rooms and light.</span>
          </li>
          <li className="flex gap-3">
            <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-forest" aria-hidden="true" />
            <span className="text-pretty">Clear prices, with rent or sale marked up front.</span>
          </li>
          <li className="flex gap-3">
            <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-forest" aria-hidden="true" />
            <span className="text-pretty">
              A short path from search to a conversation with the person who posted the home.
            </span>
          </li>
        </ul>
      </section>

      <p className="mt-6 text-pretty text-base text-muted">
        The team behind the site lives in the same markets we list. We keep the product calm so the
        homes stay the focus.
      </p>

      <div className="mt-8 flex flex-wrap gap-3">
        <Link to="/search" className="btn-primary">
          Browse listings
        </Link>
        <Link to="/sign-up" className="btn-secondary">
          Create account
        </Link>
      </div>
    </article>
  )
}

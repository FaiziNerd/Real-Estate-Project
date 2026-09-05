export default function Privacy() {
  return (
    <article className="mx-auto max-w-[680px] px-4 py-16">
      <h1 className="text-4xl font-semibold">Privacy policy</h1>
      <p className="mt-2 text-sm text-muted">Last updated 4 September 2026</p>
      <p className="mt-6 text-pretty text-base text-muted">
        This policy explains what Havenlane collects and why. It is a product description for this site, not legal advice, and it is not a substitute for counsel in your country.
      </p>
      <h2 className="mt-8 text-2xl font-semibold">Who we are</h2>
      <p className="mt-3 text-pretty text-base text-muted">
        Havenlane is a listing site for homes for sale and rent. If you have a privacy request, use the contact path on a listing you own, or delete your account from the profile page.
      </p>
      <h2 className="mt-8 text-2xl font-semibold">Account data</h2>
      <p className="mt-3 text-pretty text-base text-muted">
        If you create an account we store your username, email, a hashed password, an optional profile photo, and the listing identifiers you save. We use that data so you can sign in, publish listings, keep a shortlist, and message owners.
      </p>
      <h2 className="mt-8 text-2xl font-semibold">Listings you publish</h2>
      <p className="mt-3 text-pretty text-base text-muted">
        Photos, address, price, and description become public once you publish. Anyone with the link can view them. Delete the listing from your account to remove it from the catalog.
      </p>
      <h2 className="mt-8 text-2xl font-semibold">Saved homes</h2>
      <p className="mt-3 text-pretty text-base text-muted">
        Guests store a shortlist in local storage on this browser. After you sign in we copy that list into your account and keep it on the server so the same hearts can appear on another device. A saved home is not a reservation.
      </p>
      <h2 className="mt-8 text-2xl font-semibold">Cookies and device storage</h2>
      <p className="mt-3 text-pretty text-base text-muted">
        A session cookie keeps you signed in. Local storage holds a guest shortlist, your theme choice, and your cookie choice. We do not run advertising pixels or sell contact lists.
      </p>
      <h2 className="mt-8 text-2xl font-semibold">Messages</h2>
      <p className="mt-3 text-pretty text-base text-muted">
        Contact owner opens your email app. The message lives in email, not in our database.
      </p>
      <h2 className="mt-8 text-2xl font-semibold">How long we keep data</h2>
      <p className="mt-3 text-pretty text-base text-muted">
        Account and listing data stay until you delete the listing or the account. Session cookies expire when you sign out or the browser clears them. Guest shortlists stay until you clear site data or sign in and move them to your account.
      </p>
      <h2 className="mt-8 text-2xl font-semibold">Your choices</h2>
      <p className="mt-3 text-pretty text-base text-muted">
        You can update your profile, delete a listing, or delete your account. Account deletion removes your login, saved list on the server, and the homes you posted.
      </p>
    </article>
  )
}

import { useSelector, useDispatch } from 'react-redux'
import { useRef, useState } from 'react'
import {
  deleteUserFailure,
  deleteUserStart,
  deleteUserSuccess,
  signInSuccess,
  signOutUserFailure,
  signOutUserStart,
  signOutUserSuccess,
} from '../redux/user/UserSlice'
import { Link } from 'react-router-dom'
import { PiCamera, PiPencilSimple, PiTrash } from 'react-icons/pi'
import ConfirmDialog from '../components/ConfirmDialog'

function Profile() {
  const { currentUser } = useSelector((state) => state.user)
  const FileRef = useRef(null)
  const [file, setFile] = useState(null)
  const dispatch = useDispatch()
  const [error, setError] = useState('')
  const [updateSuccess, setUpdateSuccess] = useState(false)
  const [loading, setLoading] = useState(false)
  const [showListingsError, setshowListingsError] = useState(false)
  const [userlistings, setuserlistings] = useState([])
  const [listingsLoaded, setListingsLoaded] = useState(false)
  const [confirmAccount, setConfirmAccount] = useState(false)
  const [listingToDelete, setListingToDelete] = useState(null)

  const [FormDataState, setFormDataState] = useState({
    username: currentUser.username,
    email: currentUser.email,
    password: '',
  })

  const [filePreview, setfilePreview] = useState(currentUser.avatar)

  function handleChange(e) {
    setFormDataState({
      ...FormDataState,
      [e.target.id]: e.target.value,
    })
  }

  function handleFileChange(e) {
    const selectedFile = e.target.files[0]
    if (!selectedFile) return

    setFile(selectedFile)
    setfilePreview((prev) => {
      if (prev && prev.startsWith('blob:')) {
        URL.revokeObjectURL(prev)
      }
      return URL.createObjectURL(selectedFile)
    })
  }

  async function handleSubmit(e) {
    e.preventDefault()

    try {
      setError('')
      setUpdateSuccess(false)
      setLoading(true)

      const data = new FormData()
      data.append('username', FormDataState.username)
      data.append('email', FormDataState.email)

      if (FormDataState.password) {
        data.append('password', FormDataState.password)
      }

      if (file) {
        data.append('avatar', file)
      }

      const res = await fetch('/api/user/update', {
        method: 'POST',
        credentials: 'include',
        body: data,
      })

      const result = await res.json()

      if (!res.ok) {
        throw new Error(result.message || 'Something went Wrong')
      }

      dispatch(signInSuccess(result))
      if (filePreview && filePreview.startsWith('blob:')) {
        URL.revokeObjectURL(filePreview)
      }
      setfilePreview(result.avatar)
      setFile(null)
      setUpdateSuccess(true)
    } catch (error) {
      setError(error.message)
    } finally {
      setLoading(false)
    }
  }

  async function handleDeleteUser() {
    try {
      dispatch(deleteUserStart())

      const res = await fetch(`/api/user/delete/${currentUser._id}`, {
        credentials: 'include',
        method: 'DELETE',
      })

      const data = await res.json()

      if (data.success === false) {
        dispatch(deleteUserFailure(data.message))
        return
      }

      dispatch(deleteUserSuccess(data))
    } catch (error) {
      dispatch(deleteUserFailure(error.message))
    }
  }

  const handleSignOut = async () => {
    try {
      dispatch(signOutUserStart())
      const res = await fetch(`/api/auth/sign-out`, {
        credentials: 'include',
      })
      const data = await res.json()
      if (data.success === false) {
        dispatch(signOutUserFailure(data.message))
        return
      }

      dispatch(signOutUserSuccess())
    } catch (error) {
      dispatch(signOutUserFailure(error.message))
    }
  }

  async function handleShowListing() {
    try {
      setshowListingsError(false)

      const res = await fetch(`/api/user/listings/${currentUser._id}`, {
        credentials: 'include',
      })
      const data = await res.json()

      if (data.success === false) {
        setshowListingsError(true)
        return
      }

      setuserlistings(data)
      setListingsLoaded(true)
    } catch {
      setshowListingsError(true)
    }
  }

  async function handleListingDelete(listingId) {
    try {
      const res = await fetch(`/api/listing/delete/${listingId}`, {
        method: 'DELETE',
        credentials: 'include',
      })

      const data = await res.json()
      if (data.success === false) {
        console.log(data.message)
        return
      }

      setuserlistings((prev) => prev.filter((listing) => listing._id !== listingId))
    } catch (error) {
      console.log(error.message)
    }
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-12">
      <header className="text-center">
        <h1 className="text-balance text-3xl font-semibold sm:text-4xl">Account</h1>
        <p className="mt-3 text-pretty text-sm text-muted sm:text-base">
          Update your profile, manage listings, or sign out.
        </p>
      </header>

      <form onSubmit={handleSubmit} className="surface-card mt-10 p-6 sm:p-8">
        <h2 className="text-lg font-semibold">Profile</h2>
        <p className="mt-1 text-sm text-muted">Photo and login details for your account.</p>

        <input
          type="file"
          ref={FileRef}
          hidden
          accept="image/*"
          onChange={handleFileChange}
          id="avatar"
        />

        <div className="mt-6 flex flex-col items-center gap-3">
          <button
            type="button"
            className="group relative rounded-full"
            onClick={() => FileRef.current.click()}
            aria-label="Change profile photo"
          >
            <img
              src={filePreview}
              alt=""
              width={96}
              height={96}
              className="h-24 w-24 rounded-full object-cover ring-2 ring-line"
            />
            <span className="absolute inset-0 flex items-center justify-center rounded-full bg-ink/40 opacity-0 transition-opacity duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:opacity-100">
              <PiCamera className="h-6 w-6 text-white" aria-hidden="true" />
            </span>
          </button>
          <p className="text-xs text-muted">
            {file ? 'New photo selected · save to apply' : 'Tap photo to change'}
          </p>
        </div>

        <div className="mt-6 flex flex-col gap-4">
          <div>
            <label htmlFor="username" className="field-label">
              Username
            </label>
            <input
              value={FormDataState.username}
              type="text"
              autoComplete="username"
              spellCheck={false}
              placeholder="Your username…"
              id="username"
              name="username"
              className="input-field"
              onChange={handleChange}
            />
          </div>

          <div>
            <label htmlFor="email" className="field-label">
              Email
            </label>
            <input
              value={FormDataState.email}
              type="email"
              inputMode="email"
              autoComplete="email"
              spellCheck={false}
              placeholder="you@example.com…"
              id="email"
              name="email"
              className="input-field"
              onChange={handleChange}
            />
          </div>

          <div>
            <label htmlFor="password" className="field-label">
              New password
            </label>
            <input
              value={FormDataState.password}
              type="password"
              autoComplete="new-password"
              placeholder="Leave blank to keep current…"
              id="password"
              name="password"
              className="input-field"
              onChange={handleChange}
            />
            <p className="mt-2 text-xs text-muted">Optional. Only fill this to change your password.</p>
          </div>

          <button disabled={loading} type="submit" className="btn-primary">
            {loading ? 'Saving…' : 'Save profile'}
          </button>

          {error && (
            <p className="field-error text-sm" role="alert">
              {error}
            </p>
          )}
          {updateSuccess && (
            <p className="text-sm font-semibold text-forest" role="status">
              Profile saved
            </p>
          )}
        </div>
      </form>

      <section className="surface-card mt-6 p-6 sm:p-8">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <h2 className="text-lg font-semibold">Your listings</h2>
            <p className="mt-1 text-sm text-muted">Homes you have published on Havenlane.</p>
          </div>
          <Link className="btn-secondary shrink-0" to="/create-listing">
            Create listing
          </Link>
        </div>

        <button type="button" onClick={handleShowListing} className="btn-ghost mt-4 w-full sm:w-fit">
          {listingsLoaded ? 'Refresh listings' : 'Show your listings'}
        </button>

        {showListingsError && (
          <p className="field-error mt-4 text-sm" role="alert">
            Listings could not be loaded. Refresh and try again.
          </p>
        )}

        {listingsLoaded && userlistings.length === 0 && !showListingsError && (
          <div className="mt-6 rounded-xl bg-linen p-6 text-center">
            <p className="font-semibold">No listings yet</p>
            <p className="mt-2 text-pretty text-sm text-muted">
              Publish a home with photos and price to see it here.
            </p>
          </div>
        )}

        {userlistings.length > 0 && (
          <ul className="mt-6 flex flex-col gap-3">
            {userlistings.map((listing) => (
              <li
                key={listing._id}
                className="flex items-center gap-3 rounded-xl border border-line p-3"
              >
                <Link to={`/listing/${listing._id}`} className="shrink-0">
                  <img
                    src={listing.imageUrls?.[0] || currentUser.avatar}
                    alt=""
                    width={64}
                    height={64}
                    className="h-16 w-16 rounded-lg object-cover"
                  />
                </Link>

                <div className="min-w-0 flex-1">
                  <Link
                    to={`/listing/${listing._id}`}
                    className="block truncate font-semibold text-ink hover:underline"
                  >
                    {listing.name}
                  </Link>
                  <p className="mt-1 text-xs font-semibold text-muted">
                    {listing.type === 'rent' ? 'For rent' : 'For sale'}
                    {listing.offer ? ' · Price drop' : ''}
                  </p>
                </div>

                <div className="flex shrink-0 items-center gap-1">
                  <Link
                    to={`/update-listing/${listing._id}`}
                    className="inline-flex h-11 w-11 items-center justify-center rounded-full text-forest hover:bg-linen"
                    aria-label={`Edit ${listing.name}`}
                  >
                    <PiPencilSimple className="h-5 w-5" aria-hidden="true" />
                  </Link>
                  <button
                    type="button"
                    onClick={() => setListingToDelete(listing._id)}
                    className="inline-flex h-11 w-11 items-center justify-center rounded-full text-clay hover:bg-linen"
                    aria-label={`Delete ${listing.name}`}
                  >
                    <PiTrash className="h-5 w-5" aria-hidden="true" />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>

      <section className="surface-card mt-6 p-6 sm:p-8">
        <h2 className="text-lg font-semibold">Session</h2>
        <p className="mt-1 text-sm text-muted">Sign out of this device, or remove the account.</p>
        <div className="mt-6 flex flex-wrap gap-3">
          <button type="button" onClick={handleSignOut} className="btn-secondary">
            Sign out
          </button>
          <button type="button" onClick={() => setConfirmAccount(true)} className="btn-danger">
            Delete account
          </button>
        </div>
      </section>

      <ConfirmDialog
        open={confirmAccount}
        title="Delete this account?"
        body="This permanently removes your login and every listing you published."
        confirmLabel="Delete account"
        onCancel={() => setConfirmAccount(false)}
        onConfirm={() => {
          setConfirmAccount(false)
          handleDeleteUser()
        }}
      />
      <ConfirmDialog
        open={Boolean(listingToDelete)}
        title="Delete this listing?"
        body="The home will leave the catalog. This cannot be undone."
        confirmLabel="Delete listing"
        onCancel={() => setListingToDelete(null)}
        onConfirm={() => {
          const id = listingToDelete
          setListingToDelete(null)
          handleListingDelete(id)
        }}
      />
    </div>
  )
}

export default Profile

import { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { PiImage, PiTrash, PiUploadSimple } from 'react-icons/pi'

function CreateListing() {
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [imageUploadError, setimageUploadError] = useState(false)
  const [files, setFiles] = useState([])
  const fileInputRef = useRef(null)
  const navigate = useNavigate()
  const { currentUser } = useSelector((state) => state.user)

  const [formData, setFormData] = useState({
    imageUrls: [],
    name: '',
    description: '',
    address: '',
    type: 'rent',
    bedrooms: 1,
    bathrooms: 1,
    regularPrice: 50,
    discountPrice: 0,
    offer: false,
    parking: false,
    furnished: false,
  })

  const handleChange = (e) => {
    if (e.target.id === 'sell' || e.target.id === 'rent') {
      setFormData({
        ...formData,
        type: e.target.id,
      })
    }

    if (
      e.target.id === 'furnished' ||
      e.target.id === 'parking' ||
      e.target.id === 'offer'
    ) {
      setFormData({
        ...formData,
        [e.target.id]: e.target.checked,
      })
    }

    if (
      e.target.type === 'number' ||
      e.target.type === 'text' ||
      e.target.type === 'textarea'
    ) {
      setFormData({
        ...formData,
        [e.target.id]:
          e.target.type === 'number' ? +e.target.value : e.target.value,
      })
    }
  }

  const setListingType = (type) => {
    setFormData((prev) => ({ ...prev, type }))
  }

  const toggleAmenity = (id) => {
    setFormData((prev) => ({ ...prev, [id]: !prev[id] }))
  }

  const handleImageSubmit = async () => {
    if (files.length < 1) {
      return setimageUploadError('Please select at least one image')
    }

    if (files.length + formData.imageUrls.length > 6) {
      return setimageUploadError('You can only upload a maximum of 6 images per listing')
    }

    setUploading(true)
    setimageUploadError(false)

    try {
      const data = new FormData()
      for (let i = 0; i < files.length; i++) {
        data.append('images', files[i])
      }

      const res = await fetch('/api/listing/upload', {
        method: 'POST',
        credentials: 'include',
        body: data,
      })

      let result
      try {
        result = await res.json()
      } catch {
        setimageUploadError('Image upload failed')
        setUploading(false)
        return
      }

      if (!res.ok) {
        setimageUploadError(result.message || 'Image upload failed')
        setUploading(false)
        return
      }

      if (!Array.isArray(result)) {
        setimageUploadError('Image upload failed')
        setUploading(false)
        return
      }

      setFormData((prev) => ({
        ...prev,
        imageUrls: prev.imageUrls.concat(result),
      }))
      setFiles([])
      if (fileInputRef.current) fileInputRef.current.value = ''
      setUploading(false)
    } catch (err) {
      setimageUploadError(err.message || 'Image upload failed')
      setUploading(false)
    }
  }

  const handleRemoveImage = (index) => {
    setFormData({
      ...formData,
      imageUrls: formData.imageUrls.filter((_, i) => i !== index),
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (formData.imageUrls.length < 1) {
      return setError('You must upload at least one image')
    }

    if (+formData.regularPrice < +formData.discountPrice) {
      return setError('Discount price must be lower than regular price')
    }

    try {
      setError(false)
      setLoading(true)

      const res = await fetch(`/api/listing/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          ...formData,
          userRef: currentUser._id,
        }),
      })

      const data = await res.json()
      setLoading(false)

      if (data.success === false) {
        setError(data.message)
        return
      }

      if (data._id) {
        navigate(`/listing/${data._id}`)
      }
    } catch (err) {
      setError(err.message)
      setLoading(false)
    }
  }

  const selectedCount = files.length || 0
  const remainingSlots = 6 - formData.imageUrls.length

  return (
    <div className="mx-auto max-w-5xl px-4 py-12">
      <header className="mx-auto max-w-2xl text-center">
        <h1 className="text-balance text-3xl font-semibold sm:text-4xl">
          Create a listing
        </h1>
        <p className="mt-3 text-pretty text-sm text-muted sm:text-base">
          Add the home details and photos. Publish when everything looks right.
        </p>
      </header>

      <form onSubmit={handleSubmit} className="mt-10 grid gap-6 lg:grid-cols-5">
        <div className="flex flex-col gap-6 lg:col-span-3">
          <section className="surface-card p-6">
            <h2 className="text-lg font-semibold">The home</h2>
            <p className="mt-1 text-sm text-muted">Title, story, and where it sits.</p>

            <div className="mt-6 flex flex-col gap-4">
              <div>
                <label htmlFor="name" className="field-label">
                  Home title
                </label>
                <input
                  type="text"
                  placeholder="Sunny two bed near the park…"
                  className="input-field"
                  id="name"
                  name="name"
                  maxLength="62"
                  minLength="10"
                  required
                  onChange={handleChange}
                  value={formData.name}
                />
              </div>

              <div>
                <label htmlFor="description" className="field-label">
                  Description
                </label>
                <textarea
                  placeholder="Light, layout, and who the home fits…"
                  className="input-field min-h-36"
                  id="description"
                  name="description"
                  required
                  onChange={handleChange}
                  value={formData.description}
                />
              </div>

              <div>
                <label htmlFor="address" className="field-label">
                  Address
                </label>
                <input
                  type="text"
                  placeholder="Street, city…"
                  className="input-field"
                  id="address"
                  name="address"
                  autoComplete="street-address"
                  required
                  onChange={handleChange}
                  value={formData.address}
                />
              </div>
            </div>
          </section>

          <section className="surface-card p-6">
            <h2 className="text-lg font-semibold">Listing details</h2>
            <p className="mt-1 text-sm text-muted">How the home is offered and what it includes.</p>

            <div className="mt-6">
              <p className="field-label">Listing type</p>
              <div
                className="grid grid-cols-2 gap-2 rounded-xl bg-linen p-1"
                role="group"
                aria-label="Listing type"
              >
                {[
                  { id: 'rent', label: 'Rent' },
                  { id: 'sell', label: 'Sale' },
                ].map((option) => {
                  const active = formData.type === option.id
                  return (
                    <button
                      key={option.id}
                      type="button"
                      id={option.id}
                      onClick={() => setListingType(option.id)}
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

            <div className="mt-6">
              <p className="field-label">Extras</p>
              <div className="flex flex-wrap gap-2">
                {[
                  { id: 'parking', label: 'Parking' },
                  { id: 'furnished', label: 'Furnished' },
                  { id: 'offer', label: 'Price drop' },
                ].map((item) => {
                  const active = formData[item.id]
                  return (
                    <button
                      key={item.id}
                      type="button"
                      id={item.id}
                      aria-pressed={active}
                      onClick={() => toggleAmenity(item.id)}
                      className={`min-h-11 rounded-lg border px-4 text-sm font-semibold transition-colors duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] ${
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

            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="bedrooms" className="field-label">
                  Beds
                </label>
                <input
                  type="number"
                  inputMode="numeric"
                  id="bedrooms"
                  min="1"
                  max="10"
                  required
                  className="input-field tabular"
                  onChange={handleChange}
                  value={formData.bedrooms}
                />
              </div>

              <div>
                <label htmlFor="bathrooms" className="field-label">
                  Baths
                </label>
                <input
                  type="number"
                  inputMode="numeric"
                  id="bathrooms"
                  min="1"
                  max="10"
                  required
                  className="input-field tabular"
                  onChange={handleChange}
                  value={formData.bathrooms}
                />
              </div>

              <div className={formData.offer ? '' : 'sm:col-span-2'}>
                <label htmlFor="regularPrice" className="field-label">
                  Regular price
                </label>
                <input
                  type="number"
                  inputMode="numeric"
                  id="regularPrice"
                  min="50"
                  max="1000000"
                  required
                  className="input-field tabular"
                  onChange={handleChange}
                  value={formData.regularPrice}
                />
                <p className="mt-2 text-xs text-muted">
                  {formData.type === 'rent' ? 'USD per month' : 'USD total'}
                </p>
              </div>

              {formData.offer && (
                <div>
                  <label htmlFor="discountPrice" className="field-label">
                    Offer price
                  </label>
                  <input
                    type="number"
                    inputMode="numeric"
                    id="discountPrice"
                    min="0"
                    max="1000000"
                    required
                    className="input-field tabular"
                    onChange={handleChange}
                    value={formData.discountPrice}
                  />
                  <p className="mt-2 text-xs text-muted">Must stay below regular price</p>
                </div>
              )}
            </div>
          </section>
        </div>

        <div className="flex flex-col gap-6 lg:col-span-2">
          <section className="surface-card p-6">
            <div className="flex items-start justify-between gap-3">
              <div>
                <h2 className="text-lg font-semibold">Photos</h2>
                <p className="mt-1 text-sm text-muted">
                  First photo is the cover. Up to 6.
                </p>
              </div>
              <span className="tabular rounded-lg bg-linen px-2 py-1 text-xs font-semibold text-muted">
                {formData.imageUrls.length}/6
              </span>
            </div>

            <label
              htmlFor="images"
              className="mt-6 flex cursor-pointer flex-col items-center justify-center gap-3 rounded-xl border border-dashed border-line bg-linen/60 px-4 py-10 text-center transition-colors duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] hover:border-forest hover:bg-linen"
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-surface text-forest">
                <PiImage className="h-6 w-6" aria-hidden="true" />
              </span>
              <span className="text-sm font-semibold text-ink">Choose photos</span>
              <span className="text-pretty text-xs text-muted">
                {selectedCount > 0
                  ? `${selectedCount} selected · ${remainingSlots} slots left`
                  : 'JPG or PNG · under 5MB each'}
              </span>
              <input
                ref={fileInputRef}
                onChange={(e) => setFiles(e.target.files)}
                className="sr-only"
                type="file"
                id="images"
                accept="image/*"
                multiple
              />
            </label>

            <button
              type="button"
              disabled={uploading || selectedCount < 1}
              onClick={handleImageSubmit}
              className="btn-secondary mt-4 w-full gap-2"
            >
              <PiUploadSimple className="h-5 w-5" aria-hidden="true" />
              {uploading ? 'Uploading…' : 'Upload photos'}
            </button>

            {imageUploadError && (
              <p className="field-error mt-3 text-sm" role="alert">
                {imageUploadError}
              </p>
            )}

            {formData.imageUrls.length > 0 && (
              <ul className="mt-6 grid grid-cols-2 gap-3">
                {formData.imageUrls.map((url, index) => (
                  <li key={url} className="group relative overflow-hidden rounded-xl">
                    <img
                      src={url}
                      alt={`Listing photo ${index + 1}`}
                      width={200}
                      height={160}
                      className="aspect-[5/4] w-full object-cover"
                    />
                    {index === 0 && (
                      <span className="absolute left-2 top-2 rounded-md bg-surface/90 px-2 py-1 text-xs font-semibold text-ink">
                        Cover
                      </span>
                    )}
                    <button
                      type="button"
                      onClick={() => handleRemoveImage(index)}
                      className="absolute right-2 top-2 inline-flex h-9 w-9 items-center justify-center rounded-full bg-surface/90 text-clay"
                      aria-label={`Remove photo ${index + 1}`}
                    >
                      <PiTrash className="h-4 w-4" aria-hidden="true" />
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </section>

          <div className="surface-card sticky bottom-4 z-10 p-4 sm:static sm:bottom-auto sm:p-6">
            <button
              disabled={loading || uploading}
              className="btn-primary w-full"
            >
              {loading ? 'Publishing…' : 'Publish listing'}
            </button>
            {error && (
              <p className="field-error mt-3 text-sm" role="alert">
                {error}
              </p>
            )}
          </div>
        </div>
      </form>
    </div>
  )
}

export default CreateListing

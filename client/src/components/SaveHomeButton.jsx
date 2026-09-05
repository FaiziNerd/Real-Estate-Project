import { PiHeart, PiHeartFill } from 'react-icons/pi'
import { useSavedHomes } from '../context/SavedHomesContext'

export default function SaveHomeButton({ listingId, name }) {
  const { isSaved, toggle } = useSavedHomes()
  const saved = isSaved(listingId)

  return (
    <button
      type="button"
      className="flex h-11 w-11 items-center justify-center rounded-full border border-line bg-surface text-forest transition-transform duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] active:scale-[0.98]"
      aria-pressed={saved}
      aria-label={saved ? `Remove ${name || 'home'} from saved` : `Save ${name || 'home'}`}
      onClick={(event) => {
        event.preventDefault()
        event.stopPropagation()
        toggle(listingId)
      }}
    >
      {saved ? (
        <PiHeartFill className="h-5 w-5" aria-hidden="true" />
      ) : (
        <PiHeart className="h-5 w-5" aria-hidden="true" />
      )}
    </button>
  )
}

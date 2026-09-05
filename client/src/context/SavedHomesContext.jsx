import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react'
import { useSelector } from 'react-redux'

const SavedHomesContext = createContext(null)
const GUEST_KEY = 'havenlane-saved:guest'

function readLocal(key) {
  try {
    const parsed = JSON.parse(localStorage.getItem(key) || '[]')
    return Array.isArray(parsed) ? parsed.filter(Boolean) : []
  } catch {
    return []
  }
}

function writeLocal(key, ids) {
  localStorage.setItem(key, JSON.stringify(ids))
}

export function SavedHomesProvider({ children }) {
  const { currentUser } = useSelector((state) => state.user)
  const userId = currentUser?._id
  const storageKey = `havenlane-saved:${userId || 'guest'}`
  const [ids, setIds] = useState([])
  const persistTimer = useRef(null)

  const persistServer = useCallback((next) => {
    clearTimeout(persistTimer.current)
    persistTimer.current = setTimeout(async () => {
      try {
        await fetch('/api/user/saved', {
          method: 'PUT',
          credentials: 'include',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ listingIds: next }),
        })
      } catch {
        /* keep local copy if the request fails */
      }
    }, 250)
  }, [])

  useEffect(() => {
    let cancelled = false

    const load = async () => {
      if (!userId) {
        setIds(readLocal(GUEST_KEY))
        return
      }

      const guest = readLocal(GUEST_KEY)
      let server = []
      try {
        const res = await fetch('/api/user/saved', { credentials: 'include' })
        const data = await res.json()
        if (res.ok && Array.isArray(data.savedHomes)) {
          server = data.savedHomes.filter(Boolean)
        }
      } catch {
        server = readLocal(storageKey)
      }

      const next = [...new Set([...server, ...guest])]
      if (cancelled) return
      setIds(next)
      writeLocal(storageKey, next)
      if (guest.length > 0) {
        localStorage.removeItem(GUEST_KEY)
        persistServer(next)
      }
    }

    load()
    return () => {
      cancelled = true
      clearTimeout(persistTimer.current)
    }
  }, [userId, storageKey, persistServer])

  const toggle = useCallback(
    (listingId) => {
      setIds((current) => {
        const next = current.includes(listingId)
          ? current.filter((id) => id !== listingId)
          : [...current, listingId]
        writeLocal(storageKey, next)
        if (!userId) {
          writeLocal(GUEST_KEY, next)
        } else {
          persistServer(next)
        }
        return next
      })
    },
    [storageKey, userId, persistServer]
  )

  const value = useMemo(
    () => ({
      ids,
      count: ids.length,
      isSaved: (listingId) => ids.includes(listingId),
      toggle,
    }),
    [ids, toggle]
  )

  return <SavedHomesContext.Provider value={value}>{children}</SavedHomesContext.Provider>
}

export function useSavedHomes() {
  const ctx = useContext(SavedHomesContext)
  if (!ctx) {
    throw new Error('useSavedHomes must be used inside SavedHomesProvider')
  }
  return ctx
}

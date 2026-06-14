import { useCallback, useEffect, useState } from 'react'

/*
  Itinerary store — localStorage-backed so CRUD works fully offline today,
  with no backend required. When Convex is provisioned (see convex/), this
  module is the seam to swap for live multi-device sync: keep the same
  ItineraryItem shape and the same hook API, back it with useQuery/useMutation.
*/

export type ItineraryItem = {
  id: string
  title: string
  /** ISO date string, e.g. 2026-07-14 */
  date: string
  time?: string
  location?: string
  notes?: string
  category: ItineraryCategory
  done: boolean
  createdAt: number
}

export type ItineraryCategory =
  | 'travel'
  | 'food'
  | 'sightseeing'
  | 'medical'
  | 'rest'
  | 'other'

export const itineraryCategories: { value: ItineraryCategory; label: string }[] = [
  { value: 'travel', label: 'Travel' },
  { value: 'food', label: 'Food' },
  { value: 'sightseeing', label: 'Sightseeing' },
  { value: 'medical', label: 'Medical' },
  { value: 'rest', label: 'Rest' },
  { value: 'other', label: 'Other' },
]

const STORAGE_KEY = 'greece.itinerary.v1'

function load(): ItineraryItem[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return []
    return JSON.parse(raw) as ItineraryItem[]
  } catch {
    return []
  }
}

function save(items: ItineraryItem[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
}

function uid() {
  return crypto.randomUUID?.() ?? `${Date.now()}-${Math.random().toString(36).slice(2)}`
}

export type NewItineraryItem = Omit<ItineraryItem, 'id' | 'done' | 'createdAt'>

export function useItinerary() {
  const [items, setItems] = useState<ItineraryItem[]>(() =>
    typeof window === 'undefined' ? [] : load(),
  )

  useEffect(() => {
    save(items)
  }, [items])

  // Keep multiple open tabs in sync.
  useEffect(() => {
    const onStorage = (e: StorageEvent) => {
      if (e.key === STORAGE_KEY) setItems(load())
    }
    window.addEventListener('storage', onStorage)
    return () => window.removeEventListener('storage', onStorage)
  }, [])

  const add = useCallback((data: NewItineraryItem) => {
    setItems((prev) => [
      ...prev,
      { ...data, id: uid(), done: false, createdAt: Date.now() },
    ])
  }, [])

  const update = useCallback((id: string, patch: Partial<ItineraryItem>) => {
    setItems((prev) => prev.map((it) => (it.id === id ? { ...it, ...patch } : it)))
  }, [])

  const toggle = useCallback((id: string) => {
    setItems((prev) =>
      prev.map((it) => (it.id === id ? { ...it, done: !it.done } : it)),
    )
  }, [])

  const remove = useCallback((id: string) => {
    setItems((prev) => prev.filter((it) => it.id !== id))
  }, [])

  // Sorted by date then time for display.
  const sorted = [...items].sort((a, b) => {
    const d = a.date.localeCompare(b.date)
    if (d !== 0) return d
    return (a.time ?? '').localeCompare(b.time ?? '')
  })

  return { items: sorted, add, update, toggle, remove }
}

import { useState } from 'react'
import { Clock, MapPin, Plus, Trash2, X } from 'lucide-react'
import {
  itineraryCategories,
  useItinerary,
  type ItineraryCategory,
  type NewItineraryItem,
} from '@/store/itinerary'
import { Notice, PageHeader, Panel } from '@/components/kit'
import { cn } from '@/lib/utils'

const emptyDraft: NewItineraryItem = {
  title: '',
  date: '',
  time: '',
  location: '',
  notes: '',
  category: 'sightseeing',
}

export function ItineraryPage() {
  const { items, add, toggle, remove } = useItinerary()
  const [open, setOpen] = useState(false)
  const [draft, setDraft] = useState<NewItineraryItem>(emptyDraft)

  const submit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!draft.title.trim() || !draft.date) return
    add(draft)
    setDraft(emptyDraft)
    setOpen(false)
  }

  // Group by date for display.
  const groups = items.reduce<Record<string, typeof items>>((acc, it) => {
    ;(acc[it.date] ??= []).push(it)
    return acc
  }, {})

  return (
    <div>
      <div className="flex items-start justify-between gap-4">
        <PageHeader
          eyebrow="Plan the days"
          title="Itinerary"
          subtitle="Saved on this device — add and check off plans even offline."
        />
        <button
          onClick={() => setOpen(true)}
          className="mt-1 inline-flex items-center gap-1.5 rounded-md bg-primary px-3 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-brand-hover"
        >
          <Plus className="size-4" />
          Add
        </button>
      </div>

      {items.length === 0 && (
        <Notice>No plans yet. Tap “Add” to create your first itinerary item.</Notice>
      )}

      <div className="space-y-5">
        {Object.entries(groups).map(([date, dayItems]) => (
          <div key={date}>
            <div className="mb-2 text-sm font-medium text-ink-subtle">
              {new Date(date + 'T00:00:00').toLocaleDateString(undefined, {
                weekday: 'long',
                month: 'short',
                day: 'numeric',
              })}
            </div>
            <Panel className="p-0">
              {dayItems.map((it) => (
                <div
                  key={it.id}
                  className="flex items-start gap-3 border-b border-hairline p-4 last:border-b-0"
                >
                  <input
                    type="checkbox"
                    checked={it.done}
                    onChange={() => toggle(it.id)}
                    className="mt-1 size-4 accent-[var(--brand)]"
                  />
                  <div className="min-w-0 flex-1">
                    <div
                      className={cn(
                        'font-medium',
                        it.done && 'text-ink-tertiary line-through',
                      )}
                    >
                      {it.title}
                    </div>
                    <div className="mt-0.5 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-ink-subtle">
                      <span className="rounded-full bg-surface-3 px-2 py-0.5">
                        {itineraryCategories.find((c) => c.value === it.category)?.label}
                      </span>
                      {it.time && (
                        <span className="inline-flex items-center gap-1">
                          <Clock className="size-3" />
                          {it.time}
                        </span>
                      )}
                      {it.location && (
                        <span className="inline-flex items-center gap-1">
                          <MapPin className="size-3" />
                          {it.location}
                        </span>
                      )}
                    </div>
                    {it.notes && (
                      <p className="mt-1.5 text-sm text-ink-muted">{it.notes}</p>
                    )}
                  </div>
                  <button
                    onClick={() => remove(it.id)}
                    className="rounded-md p-1.5 text-ink-tertiary transition-colors hover:bg-surface-2 hover:text-destructive"
                    aria-label="Delete"
                  >
                    <Trash2 className="size-4" />
                  </button>
                </div>
              ))}
            </Panel>
          </div>
        ))}
      </div>

      {/* Add dialog (lightweight; swap for shadcn <Dialog> once registry is available) */}
      {open && (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/60 p-0 md:items-center md:p-4">
          <form
            onSubmit={submit}
            className="w-full max-w-md rounded-t-xl border border-hairline bg-surface-1 p-5 md:rounded-xl"
          >
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-semibold tracking-tight">New plan</h2>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="rounded-md p-1.5 text-ink-subtle hover:bg-surface-2"
              >
                <X className="size-4" />
              </button>
            </div>

            <div className="space-y-3">
              <Field label="Title">
                <input
                  autoFocus
                  value={draft.title}
                  onChange={(e) => setDraft({ ...draft, title: e.target.value })}
                  placeholder="e.g. Visit Meteora"
                  className={inputCls}
                />
              </Field>
              <div className="grid grid-cols-2 gap-3">
                <Field label="Date">
                  <input
                    type="date"
                    value={draft.date}
                    onChange={(e) => setDraft({ ...draft, date: e.target.value })}
                    className={inputCls}
                  />
                </Field>
                <Field label="Time (optional)">
                  <input
                    type="time"
                    value={draft.time}
                    onChange={(e) => setDraft({ ...draft, time: e.target.value })}
                    className={inputCls}
                  />
                </Field>
              </div>
              <Field label="Category">
                <select
                  value={draft.category}
                  onChange={(e) =>
                    setDraft({ ...draft, category: e.target.value as ItineraryCategory })
                  }
                  className={inputCls}
                >
                  {itineraryCategories.map((c) => (
                    <option key={c.value} value={c.value}>
                      {c.label}
                    </option>
                  ))}
                </select>
              </Field>
              <Field label="Location (optional)">
                <input
                  value={draft.location}
                  onChange={(e) => setDraft({ ...draft, location: e.target.value })}
                  placeholder="e.g. Kalambaka"
                  className={inputCls}
                />
              </Field>
              <Field label="Notes (optional)">
                <textarea
                  value={draft.notes}
                  onChange={(e) => setDraft({ ...draft, notes: e.target.value })}
                  rows={2}
                  className={cn(inputCls, 'resize-none')}
                />
              </Field>
            </div>

            <div className="mt-5 flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="rounded-md border border-hairline bg-surface-1 px-3 py-2 text-sm hover:bg-surface-2"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="rounded-md bg-primary px-3 py-2 text-sm font-medium text-primary-foreground hover:bg-brand-hover"
              >
                Save
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  )
}

const inputCls =
  'h-10 w-full rounded-md border border-input bg-surface-2 px-3 text-sm outline-none placeholder:text-ink-tertiary focus:border-brand-focus focus:ring-2 focus:ring-brand-focus/40'

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1 block text-xs font-medium text-ink-subtle">{label}</span>
      {children}
    </label>
  )
}

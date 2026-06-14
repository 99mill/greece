import { useEffect, useState } from 'react'
import { AlertTriangle, MapPin, Phone, ShieldCheck } from 'lucide-react'
import {
  dialysisTravelChecklist,
  emergencyNumbers,
  facilities,
  medicalDisclaimer,
  type PrepItem,
} from '@/data/medical'
import { Notice, PageHeader, Panel } from '@/components/kit'

const CHECKLIST_KEY = 'greece.dialysisChecklist.v1'

function useChecklist() {
  const [items, setItems] = useState<PrepItem[]>(() => {
    try {
      const raw = localStorage.getItem(CHECKLIST_KEY)
      if (raw) return JSON.parse(raw) as PrepItem[]
    } catch {
      /* ignore */
    }
    return dialysisTravelChecklist
  })
  useEffect(() => {
    localStorage.setItem(CHECKLIST_KEY, JSON.stringify(items))
  }, [items])
  const toggle = (i: number) =>
    setItems((prev) => prev.map((it, idx) => (idx === i ? { ...it, done: !it.done } : it)))
  return { items, toggle }
}

export function MedicalPage() {
  const { items, toggle } = useChecklist()

  return (
    <div>
      <PageHeader
        eyebrow="In case of emergency"
        title="Medical resources"
        subtitle="Tap a number to call. This screen works offline."
      />

      <div className="mb-4 flex items-start gap-2 rounded-lg border border-hairline-strong bg-surface-2 p-3 text-sm text-ink-muted">
        <AlertTriangle className="mt-0.5 size-4 shrink-0 text-amber-400" />
        <p>{medicalDisclaimer}</p>
      </div>

      <Panel className="mb-4">
        <h2 className="mb-3 text-lg font-semibold tracking-tight">Emergency numbers</h2>
        <div className="space-y-2">
          {emergencyNumbers.map((c) => (
            <a
              key={c.number}
              href={`tel:${c.number}`}
              className="flex items-center gap-3 rounded-md border border-hairline bg-surface-1 p-3 transition-colors hover:bg-surface-3"
            >
              <div className="flex size-10 items-center justify-center rounded-md bg-surface-3 text-brand">
                <Phone className="size-4" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="font-medium">{c.label}</div>
                <div className="text-xs text-ink-subtle">{c.note}</div>
              </div>
              <div className="text-xl font-semibold tabular-nums text-ink">{c.number}</div>
            </a>
          ))}
        </div>
      </Panel>

      <Panel className="mb-4">
        <h2 className="mb-3 text-lg font-semibold tracking-tight">Hospitals & dialysis</h2>
        <div className="space-y-2">
          {facilities.map((f) => (
            <a
              key={f.name}
              href={`https://maps.google.com/?q=${encodeURIComponent(f.mapsQuery)}`}
              target="_blank"
              rel="noreferrer"
              className="flex items-start gap-3 rounded-md border border-hairline bg-surface-1 p-3 transition-colors hover:bg-surface-3"
            >
              <MapPin className="mt-0.5 size-4 shrink-0 text-ink-subtle" />
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <span className="font-medium">{f.name}</span>
                  {f.verifyBeforeTravel && (
                    <span className="rounded-full border border-amber-500/40 bg-amber-500/10 px-2 py-0.5 text-[10px] font-medium text-amber-400">
                      Verify before travel
                    </span>
                  )}
                </div>
                <div className="text-xs text-ink-subtle">{f.area}</div>
                <p className="mt-1 text-sm text-ink-muted">{f.details}</p>
              </div>
            </a>
          ))}
        </div>
        <Notice>
          Opening a facility uses Google Maps, which needs a connection. Save offline
          directions to the nearest ER once you’ve confirmed it.
        </Notice>
      </Panel>

      <Panel>
        <div className="mb-3 flex items-center gap-2">
          <ShieldCheck className="size-4 text-success" />
          <h2 className="text-lg font-semibold tracking-tight">Dialysis travel checklist</h2>
        </div>
        <div className="space-y-1">
          {items.map((it, i) => (
            <label
              key={i}
              className="flex cursor-pointer items-start gap-3 rounded-md p-2 hover:bg-surface-2"
            >
              <input
                type="checkbox"
                checked={it.done}
                onChange={() => toggle(i)}
                className="mt-0.5 size-4 accent-[var(--brand)]"
              />
              <span className={it.done ? 'text-sm text-ink-tertiary line-through' : 'text-sm'}>
                {it.text}
              </span>
            </label>
          ))}
        </div>
      </Panel>
    </div>
  )
}

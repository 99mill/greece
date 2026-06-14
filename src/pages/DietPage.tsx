import { useMemo, useState } from 'react'
import { AlertTriangle, Search } from 'lucide-react'
import {
  dietCategories,
  dietDisclaimer,
  dietPrinciples,
  levelLabels,
  nutrientLabels,
  type FoodItem,
} from '@/data/diet'
import { LevelBadge, Notice, PageHeader, Panel } from '@/components/kit'

function FoodCard({ item }: { item: FoodItem }) {
  return (
    <div className="border-b border-hairline py-4 last:border-b-0">
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="font-medium">{item.name}</div>
          {item.greek && (
            <div className="text-xs text-ink-tertiary">{item.greek}</div>
          )}
        </div>
        <LevelBadge level={item.rating}>{levelLabels[item.rating]}</LevelBadge>
      </div>

      <p className="mt-1.5 text-sm text-ink-subtle">{item.ingredients.join(' · ')}</p>

      {item.flags.length > 0 && (
        <div className="mt-2.5 flex flex-wrap gap-1.5">
          {item.flags.map((f, i) => (
            <LevelBadge key={i} level={f.level}>
              {nutrientLabels[f.nutrient]}
            </LevelBadge>
          ))}
        </div>
      )}

      {item.tip && (
        <p className="mt-2.5 text-sm text-ink-muted">
          <span className="text-brand">Tip · </span>
          {item.tip}
        </p>
      )}
    </div>
  )
}

export function DietPage() {
  const [query, setQuery] = useState('')

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return dietCategories
    return dietCategories
      .map((c) => ({
        ...c,
        items: c.items.filter(
          (it) =>
            it.name.toLowerCase().includes(q) ||
            it.greek?.toLowerCase().includes(q) ||
            it.ingredients.some((ing) => ing.toLowerCase().includes(q)),
        ),
      }))
      .filter((c) => c.items.length > 0)
  }, [query])

  return (
    <div>
      <PageHeader
        eyebrow="Stage 5 CKD"
        title="Diet plan"
        subtitle="Greek dishes rated for a renal diet. Search a food before you order."
      />

      <div className="mb-4 flex items-start gap-2 rounded-lg border border-amber-500/30 bg-amber-500/5 p-3 text-sm text-amber-200/90">
        <AlertTriangle className="mt-0.5 size-4 shrink-0 text-amber-400" />
        <p>{dietDisclaimer}</p>
      </div>

      <Panel className="mb-4">
        <div className="text-sm font-medium">The five things to watch</div>
        <ul className="mt-2 space-y-1.5 text-sm text-ink-subtle">
          {dietPrinciples.map((p, i) => (
            <li key={i} className="flex gap-2">
              <span className="text-brand">·</span>
              {p}
            </li>
          ))}
        </ul>
      </Panel>

      <div className="relative mb-4">
        <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-ink-subtle" />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search a dish or ingredient…"
          className="h-10 w-full rounded-md border border-input bg-surface-1 pl-9 pr-3 text-sm outline-none placeholder:text-ink-tertiary focus:border-brand-focus focus:ring-2 focus:ring-brand-focus/40"
        />
      </div>

      <div className="space-y-4">
        {filtered.map((c) => (
          <Panel key={c.id}>
            <h2 className="text-lg font-semibold tracking-tight">{c.title}</h2>
            <div className="mt-1">
              {c.items.map((it) => (
                <FoodCard key={it.name} item={it} />
              ))}
            </div>
          </Panel>
        ))}
        {filtered.length === 0 && (
          <Notice>No dishes match “{query}”.</Notice>
        )}
      </div>
    </div>
  )
}

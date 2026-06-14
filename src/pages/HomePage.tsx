import { Link } from 'react-router-dom'
import { ArrowRight, CalendarDays, HeartPulse, UtensilsCrossed } from 'lucide-react'
import { PageHeader } from '@/components/kit'

const cards = [
  {
    to: '/diet',
    icon: UtensilsCrossed,
    title: 'Diet plan',
    body: 'Kidney-friendly guidance for Greek food, available offline.',
  },
  {
    to: '/medical',
    icon: HeartPulse,
    title: 'Medical resources',
    body: 'Emergency numbers, hospitals, and the dialysis checklist.',
  },
  {
    to: '/itinerary',
    icon: CalendarDays,
    title: 'Itinerary',
    body: 'Plan and check off the days. Works without signal.',
  },
]

export function HomePage() {
  return (
    <div>
      <PageHeader
        eyebrow="Larissa · Thessaly"
        title="Greece Trip Companion"
        subtitle="Everything for the trip in one place — built to keep working when there’s no signal."
      />

      <div className="grid gap-3 sm:grid-cols-2">
        {cards.map(({ to, icon: Icon, title, body }) => (
          <Link
            key={to}
            to={to}
            className="panel group flex flex-col gap-3 p-5 transition-colors hover:bg-surface-2"
          >
            <div className="flex size-9 items-center justify-center rounded-md bg-surface-3 text-brand">
              <Icon className="size-4.5" />
            </div>
            <div>
              <div className="flex items-center gap-1 font-medium">
                {title}
                <ArrowRight className="size-3.5 text-ink-subtle transition-transform group-hover:translate-x-0.5" />
              </div>
              <p className="mt-1 text-sm text-ink-subtle">{body}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

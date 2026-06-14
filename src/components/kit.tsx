import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'
import type { Level } from '@/data/diet'

/* Small interim presentational helpers built on the design.md tokens.
   These can be replaced with shadcn/Base UI <Card>, <Badge>, etc. once the
   component registry host is allowlisted — the markup maps 1:1. */

export function PageHeader({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow?: string
  title: string
  subtitle?: string
}) {
  return (
    <div className="mb-6">
      {eyebrow && (
        <div className="mb-1.5 text-[13px] font-medium uppercase tracking-wider text-brand">
          {eyebrow}
        </div>
      )}
      <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">{title}</h1>
      {subtitle && <p className="mt-2 max-w-prose text-ink-subtle">{subtitle}</p>}
    </div>
  )
}

export function Panel({
  className,
  children,
}: {
  className?: string
  children: ReactNode
}) {
  return <div className={cn('panel p-5', className)}>{children}</div>
}

const levelStyles: Record<Level, string> = {
  good: 'border-success/40 bg-success/10 text-success',
  caution: 'border-amber-500/40 bg-amber-500/10 text-amber-400',
  limit: 'border-destructive/40 bg-destructive/10 text-destructive',
}

export function LevelBadge({
  level,
  children,
}: {
  level: Level
  children: ReactNode
}) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[11px] font-medium',
        levelStyles[level],
      )}
    >
      {children}
    </span>
  )
}

export function Notice({ children }: { children: ReactNode }) {
  return (
    <div className="rounded-lg border border-hairline-strong bg-surface-2 p-3 text-sm text-ink-muted">
      {children}
    </div>
  )
}

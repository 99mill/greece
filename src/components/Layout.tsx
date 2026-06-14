import { NavLink, Outlet } from 'react-router-dom'
import { CalendarDays, HeartPulse, Home, UtensilsCrossed } from 'lucide-react'
import { cn } from '@/lib/utils'
import { OfflineBadge } from '@/components/OfflineBadge'

const nav = [
  { to: '/', label: 'Home', icon: Home, end: true },
  { to: '/diet', label: 'Diet', icon: UtensilsCrossed },
  { to: '/medical', label: 'Medical', icon: HeartPulse },
  { to: '/itinerary', label: 'Itinerary', icon: CalendarDays },
]

export function Layout() {
  return (
    <div className="min-h-dvh md:grid md:grid-cols-[240px_1fr]">
      {/* Desktop sidebar */}
      <aside className="hidden border-r border-hairline bg-canvas md:flex md:flex-col">
        <div className="flex h-14 items-center gap-2 px-5">
          <span className="size-2.5 rounded-full bg-brand" />
          <span className="text-[15px] font-semibold tracking-tight">Greece Trip</span>
        </div>
        <nav className="flex flex-col gap-1 p-3">
          {nav.map(({ to, label, icon: Icon, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              className={({ isActive }) =>
                cn(
                  'flex items-center gap-3 rounded-md px-3 py-2 text-sm text-ink-subtle transition-colors hover:bg-surface-2 hover:text-ink',
                  isActive && 'bg-surface-2 text-ink',
                )
              }
            >
              <Icon className="size-4" />
              {label}
            </NavLink>
          ))}
        </nav>
        <div className="mt-auto p-3">
          <OfflineBadge />
        </div>
      </aside>

      {/* Main */}
      <div className="flex min-w-0 flex-col">
        <header className="sticky top-0 z-10 flex h-14 items-center justify-between border-b border-hairline bg-canvas/80 px-4 backdrop-blur md:hidden">
          <div className="flex items-center gap-2">
            <span className="size-2.5 rounded-full bg-brand" />
            <span className="font-semibold tracking-tight">Greece Trip</span>
          </div>
          <OfflineBadge />
        </header>

        <main className="mx-auto w-full max-w-3xl flex-1 px-4 py-6 pb-24 md:px-8 md:py-10 md:pb-10">
          <Outlet />
        </main>

        {/* Mobile bottom tab bar */}
        <nav className="fixed inset-x-0 bottom-0 z-10 grid grid-cols-4 border-t border-hairline bg-canvas/95 pb-[env(safe-area-inset-bottom)] backdrop-blur md:hidden">
          {nav.map(({ to, label, icon: Icon, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              className={({ isActive }) =>
                cn(
                  'flex flex-col items-center gap-1 py-2.5 text-[11px] text-ink-subtle transition-colors',
                  isActive && 'text-brand',
                )
              }
            >
              <Icon className="size-5" />
              {label}
            </NavLink>
          ))}
        </nav>
      </div>
    </div>
  )
}

import { useEffect, useState } from 'react'
import { Wifi, WifiOff } from 'lucide-react'
import { cn } from '@/lib/utils'

/** Shows whether the device currently has a connection — reassurance that the
 *  diet & medical screens still work when this says "Offline". */
export function OfflineBadge() {
  const [online, setOnline] = useState(
    typeof navigator === 'undefined' ? true : navigator.onLine,
  )

  useEffect(() => {
    const on = () => setOnline(true)
    const off = () => setOnline(false)
    window.addEventListener('online', on)
    window.addEventListener('offline', off)
    return () => {
      window.removeEventListener('online', on)
      window.removeEventListener('offline', off)
    }
  }, [])

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[11px]',
        online
          ? 'border-hairline text-ink-subtle'
          : 'border-hairline-strong bg-surface-2 text-ink-muted',
      )}
    >
      {online ? <Wifi className="size-3" /> : <WifiOff className="size-3" />}
      {online ? 'Online' : 'Offline'}
    </span>
  )
}

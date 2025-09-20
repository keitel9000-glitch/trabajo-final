import React, { useEffect, useRef } from 'react'

export default function PaginacionInfinita({ onLoadMore, enabled = true }) {
  const ref = useRef()

  useEffect(() => {
    if (!enabled) return
    const obs = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) onLoadMore()
    }, { rootMargin: '200px' })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [onLoadMore, enabled])

  return <div ref={ref} aria-hidden className="h-8" />
}

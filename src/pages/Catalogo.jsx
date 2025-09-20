import React, { useEffect, useState, useRef } from 'react'
import Buscador from '../components/Buscador'
import Filtros from '../components/Filtros'
import TarjetaItem from '../components/TarjetaItem'
import PaginacionInfinita from '../components/PaginacionInfinita'
import Loader from '../components/Loader'
import ErrorState from '../components/ErrorState'
import { listarRecursos } from '../services/api'
import { useFavoritos } from '../context/FavoritosContext'

export default function Catalogo() {
  const [query, setQuery] = useState('')
  const [filtros, setFiltros] = useState({ episodio: '', soloFavoritos: false })
  const [items, setItems] = useState([])
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [hasMore, setHasMore] = useState(true)
  const { favoritos } = useFavoritos()

  const abortRef = useRef(null)

  useEffect(() => {
    // reiniciar cuando cambie búsqueda o filtros
    setItems([])
    setPage(1)
    setHasMore(true)
  }, [query, filtros])

  useEffect(() => {
    let activo = true
    setLoading(true)
    setError(null)

    const fetchData = async () => {
      if (abortRef.current) abortRef.current.abort()
      abortRef.current = new AbortController()
      try {
        const res = await listarRecursos({ page, filtro: query, episodio: filtros.episodio, signal: abortRef.current.signal })
        if (!activo) return
        // evitar duplicados por id
        setItems(prev => {
          const ids = new Set(prev.map(i => i.id))
          const nuevos = res.resultados.filter(i => !ids.has(i.id))
          return [...prev, ...nuevos]
        })
        setHasMore(res.hasMore)
      } catch (e) {
        if (e.name === 'AbortError') return
        setError(e.message || 'Error desconocido')
      } finally {
        setLoading(false)
      }
    }

    fetchData()
    return () => { activo = false; if (abortRef.current) abortRef.current.abort() }
  }, [page, query, filtros.episodio, filtros.soloFavoritos])

  return (
    <div>
      <div className="mb-4 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <Buscador value={query} onChange={setQuery} />
        <Filtros value={filtros} onChange={setFiltros} favoritosCount={favoritos.length} />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {items
          .filter(i => (filtros.soloFavoritos ? favoritos.some(f => String(f.id) === String(i.id)) : true))
          .map(item => (
            <TarjetaItem key={item.id} item={item} />
          ))}

        {loading && Array.from({ length: 8 }).map((_, i) => (
          <div key={'skel'+i} className="rounded-xl bg-white dark:bg-gray-800 p-4 shadow animate-pulse h-32" />
        ))}
      </div>

      {error && <div className="mt-4"><ErrorState mensaje={error} onRetry={() => window.location.reload()} /></div>}
      {!loading && items.length === 0 && <div className="mt-6">No se encontraron resultados. Intenta otra búsqueda o borra los filtros.</div>}

      <PaginacionInfinita onLoadMore={() => { if (hasMore && !loading) setPage(p => p + 1) }} enabled={hasMore && !loading} />
    </div>
  )
}

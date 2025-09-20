import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { obtenerDetalle } from '../services/api'
import Loader from '../components/Loader'
import ErrorState from '../components/ErrorState'
import { useFavoritos } from '../context/FavoritosContext'

export default function Detalle() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [item, setItem] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const { toggleFavorito, esFavorito } = useFavoritos()

  useEffect(() => {
    let activo = true
    setLoading(true)
    obtenerDetalle(id).then(res => { if (activo) setItem(res) }).catch(e => setError(e.message)).finally(() => { if (activo) setLoading(false) })
    return () => { activo = false }
  }, [id])

  if (loading) return <Loader />
  if (error) return <ErrorState mensaje={error} onRetry={() => window.location.reload()} />

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">{item.name}</h1>
        <div>
          <button onClick={() => toggleFavorito({ ...item, id: String(item.id) })} className="text-xl" aria-pressed={esFavorito(item.id)} aria-label="Marcar favorito">{esFavorito(item.id) ? '⭐' : '☆'}</button>
        </div>
      </div>

      <div className="rounded-xl bg-white dark:bg-gray-800 p-4 shadow flex items-center gap-4">
        <img src={item.image} alt={item.name} onError={(e) => e.target.src = '/imagen-fallback.svg'} className="w-32 h-32 object-cover rounded" />
        <div>
          <p className="text-sm"><strong>Estado:</strong> {item.status}</p>
          <p className="text-sm"><strong>Especie:</strong> {item.species}</p>
          <p className="text-sm"><strong>Género:</strong> {item.gender}</p>
          <p className="text-sm"><strong>Origen:</strong> {item.origin?.name}</p>
          <p className="text-sm"><strong>Ubicación:</strong> {item.location?.name}</p>
        </div>
      </div>

      <div className="rounded-xl bg-white dark:bg-gray-800 p-4 shadow">
        <div className="mt-2">
          <h3 className="font-semibold">Episodios</h3>
          <ul className="list-disc list-inside">
            {item.episode?.map((ep, idx) => <li key={idx}><a href={ep} target="_blank" rel="noreferrer">{ep}</a></li>)}
          </ul>
        </div>
      </div>

      <div>
        <button onClick={() => navigate(-1)} className="px-3 py-2 bg-gray-200 rounded">Volver</button>
      </div>
    </div>
  )
}

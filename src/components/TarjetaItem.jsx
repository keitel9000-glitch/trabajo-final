import React from 'react'
import { Link } from 'react-router-dom'
import { useFavoritos } from '../context/FavoritosContext'

export default function TarjetaItem({ item }) {
  const { toggleFavorito, esFavorito } = useFavoritos()

  const handleImgError = (e) => { e.target.src = '/imagen-fallback.svg' }

  return (
    <article className="rounded-xl bg-white dark:bg-gray-800 p-4 shadow flex flex-col">
      <div className="flex items-center gap-3">
        <img src={item.image} alt={item.name} onError={handleImgError} className="w-20 h-20 object-cover rounded" />
        <div className="flex-1">
          <div className="flex justify-between items-start">
            <h3 className="font-semibold">{item.name}</h3>
            <button onClick={() => toggleFavorito({ ...item, id: String(item.id) })} aria-label="Marcar favorito" className="text-xl">{esFavorito(item.id) ? '⭐' : '☆'}</button>
          </div>
          <p className="text-sm mt-1">{item.species} — {item.status}</p>
        </div>
      </div>
      <div className="mt-4 mt-auto">
        <Link to={`/detalle/${item.id}`} className="inline-block bg-teal-500 text-white px-3 py-1 rounded">Ver detalle</Link>
      </div>
    </article>
  )
}

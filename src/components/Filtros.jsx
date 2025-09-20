import React from 'react'

export default function Filtros({ value, onChange, favoritosCount }) {
  return (
    <div className="flex gap-2 items-center">
      <label className="flex items-center gap-2">
  <span className="text-sm">Episodio</span>
  <input type="text" value={value.episodio} onChange={e => onChange({ ...value, episodio: e.target.value })} placeholder="Ej: S01E01 o 1" className="p-2 border rounded bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100" />
      </label>

      <label className="flex items-center gap-2">
  <input type="checkbox" checked={value.soloFavoritos} onChange={e => onChange({ ...value, soloFavoritos: e.target.checked })} className="w-4 h-4" />
        <span className="text-sm">Sólo favoritos ({favoritosCount})</span>
      </label>
    </div>
  )
}

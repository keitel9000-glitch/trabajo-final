import React from 'react'

export default function Buscador({ value, onChange }) {
  return (
    <div className="flex-1">
      <label htmlFor="busqueda" className="sr-only">Buscar</label>
  <input id="busqueda" type="search" value={value} onChange={e => onChange(e.target.value)} placeholder="Buscar por nombre..." className="w-full p-2 border rounded bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100" />
    </div>
  )
}

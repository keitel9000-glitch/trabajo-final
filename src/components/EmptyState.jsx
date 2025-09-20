import React from 'react'

export default function EmptyState({ mensaje = 'No hay elementos' }) {
  return <div className="p-4 text-center text-gray-600">{mensaje}</div>
}

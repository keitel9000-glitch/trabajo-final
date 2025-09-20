import React from 'react'

export default function ErrorState({ mensaje = 'Ocurrió un error', onRetry }) {
  return (
    <div role="alert" className="p-4 bg-red-100 text-red-800 rounded">
      <p>{mensaje}</p>
      {onRetry && <button onClick={onRetry} className="mt-2 px-3 py-1 bg-red-600 text-white rounded">Reintentar</button>}
    </div>
  )
}

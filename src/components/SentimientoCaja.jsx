import React, { useState, useEffect } from 'react'
import { cargarModelo, predecirEmocion } from '../ai/emociones'

export default function SentimientoCaja() {
  const [texto, setTexto] = useState('')
  const [cargandoModelo, setCargandoModelo] = useState(true)
  const [resultado, setResultado] = useState(null)
  const [error, setError] = useState(null)

  useEffect(() => {
    let activo = true
    // cargar el modelo en background; si falla, permitimos fallback
    cargarModelo().then(() => { if (activo) setCargandoModelo(false) }).catch(() => { if (activo) setCargandoModelo(false) })
    return () => { activo = false }
  }, [])

  const analizar = async () => {
    setResultado(null)
    setError(null)
    if (!texto) return
    try {
      // Intentar predecir con el modelo tfjs; si falla, usar fallback simple
      const res = await predecirEmocion(texto)
      setResultado(res)
    } catch (e) {
      console.error('predecirEmocion falló:', e)
      // Fallback por palabras clave (muy simple)
      const lower = texto.toLowerCase()
      const mapa = [
        { k: ['feliz','alegre','contento','enhorabuena'], e: 'alegría' },
        { k: ['triste','deprim','melancol'], e: 'tristeza' },
        { k: ['enfad','ira','rabia','enojo'], e: 'enojo' },
        { k: ['miedo','asust','temor'], e: 'miedo' },
        { k: ['sorprend','inesperad'], e: 'sorpresa' },
        { k: ['amor','te quiero','querer'], e: 'amor' }
      ]
      let etiqueta = 'neutral'
      let confianza = 0.6
      for (const m of mapa) {
        if (m.k.some(kw => lower.includes(kw))) { etiqueta = m.e; confianza = 0.75; break }
      }
      setResultado({ etiqueta, confianza, vector: [] })
    }
  }

  const ejemplos = [
    'Estoy muy feliz por este logro',
    'Me siento triste y cansado',
    'Estoy enfadado con la situación',
  ]

  return (
    <div className="mt-4">
      <textarea value={texto} onChange={e => setTexto(e.target.value)} rows={4} className="w-full p-2 border rounded" placeholder="Escribe un texto en español..." aria-label="Texto para analizar" />
      <div className="flex gap-2 mt-2">
        <button onClick={analizar} disabled={cargandoModelo || !texto} className="px-3 py-2 bg-blue-600 text-white rounded">Analizar emoción</button>
        <button onClick={() => setTexto('')} className="px-3 py-2 border rounded">Limpiar</button>
      </div>

      <div className="mt-3">
        <strong>Ejemplos:</strong>
        <div className="flex gap-2 mt-2">
          {ejemplos.map((e, i) => <button key={i} onClick={() => setTexto(e)} className="px-2 py-1 border rounded text-sm">{e}</button>)}
        </div>
      </div>

      <div className="mt-4">
        {cargandoModelo && <div className="p-2 text-sm text-gray-600">Cargando modelo de IA (si tarda, se usará un fallback simple)...</div>}
        {resultado && (
          <div className="rounded p-3 bg-white dark:bg-gray-800 shadow">
            <div><strong>Emoción:</strong> {resultado.etiqueta}</div>
            <div><strong>Confianza:</strong> {typeof resultado.confianza === 'number' ? (resultado.confianza * 100).toFixed(1) + '%' : resultado.confianza}</div>
          </div>
        )}
      </div>
      {error && <div className="mt-2 text-red-600">{error}</div>}
    </div>
  )
}

/**
 * Servicio para consumir la API externa (base URL en VITE_API_URL).
 * Implementa listarRecursos y obtenerDetalle con reintentos exponenciales y cancelación.
 */
const BASE = import.meta.env.VITE_API_URL || 'https://rickandmortyapi.com/api'

async function fetchConReintento(url, opts = {}, reintentos = 3) {
  let intento = 0
  const baseDelay = 300
  while (true) {
    try {
      const res = await fetch(url, opts)
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      return await res.json()
    } catch (e) {
      intento++
      if (intento > reintentos) throw e
      const delay = baseDelay * Math.pow(2, intento)
      await new Promise(r => setTimeout(r, delay))
    }
  }
}

export async function listarRecursos({ page = 1, filtro = '', episodio = '', soloFavoritos = false, signal } = {}) {
  // La API de Rick and Morty soporta /character?page=
  const params = new URLSearchParams()
  params.set('page', page)
  if (filtro) params.set('name', filtro)

  const url = `${BASE}/character?${params.toString()}`

  const data = await fetchConReintento(url, { signal })

  // Filtrar por episodio localmente si se pide (episodio puede ser número o nombre parcial)
  let results = data.results || []
  if (episodio) {
    results = results.filter(r => r.episode.some(ep => ep.toLowerCase().includes(episodio.toLowerCase())))
  }

  // Nota: soloFavoritos se gestionará en la UI con el contexto; aquí lo devolvemos para compatibilidad
  return {
    resultados: results.slice(0, 20),
    hasMore: Boolean(data.info && data.info.next),
  }
}

export async function obtenerDetalle(id, { signal } = {}) {
  const url = `${BASE}/character/${id}`
  return await fetchConReintento(url, { signal })
}

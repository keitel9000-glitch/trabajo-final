const KEY = 'app_favoritos_v1'

export function obtenerFavoritos() {
  try {
    const raw = localStorage.getItem(KEY)
    const parsed = raw ? JSON.parse(raw) : []
    // normalizar ids a string
    return parsed.map(i => ({ ...i, id: String(i.id) }))
  } catch (e) {
    return []
  }
}

export function guardarFavoritos(lista) {
  try { localStorage.setItem(KEY, JSON.stringify(lista)) } catch (e) {}
}

export function agregarFavorito(item) {
  const actuales = obtenerFavoritos()
  const nuevo = { ...item, id: String(item.id) }
  if (!actuales.find(i => String(i.id) === String(nuevo.id))) {
    actuales.push(nuevo)
    guardarFavoritos(actuales)
  }
}

export function quitarFavorito(id) {
  const actuales = obtenerFavoritos().filter(i => String(i.id) !== String(id))
  guardarFavoritos(actuales)
}

export function esFavorito(id) {
  return obtenerFavoritos().some(i => String(i.id) === String(id))
}

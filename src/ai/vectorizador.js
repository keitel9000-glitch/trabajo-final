// Tokenización y vectorización simple en español.
const separarTokens = (texto) => {
  if (!texto) return []
  return texto
    .toLowerCase()
    .normalize('NFD')
    .replace(/\p{Diacritic}/gu, '')
    .replace(/[^a-z\s]/g, '')
    .split(/\s+/)
    .filter(Boolean)
}

function construirVocabulario(dataset) {
  const vocab = new Set()
  dataset.forEach(item => {
    separarTokens(item.texto).forEach(t => vocab.add(t))
  })
  return Array.from(vocab)
}

function vectorizar(texto, vocab) {
  const tokens = separarTokens(texto)
  const vec = new Array(vocab.length).fill(0)
  tokens.forEach(t => {
    const idx = vocab.indexOf(t)
    if (idx >= 0) vec[idx] += 1
  })
  return vec
}

export { separarTokens as limpiarTexto, construirVocabulario, vectorizar }

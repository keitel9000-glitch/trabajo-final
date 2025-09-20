import * as tf from '@tensorflow/tfjs'
import dataset from './datos_emociones.json'
import { construirVocabulario, vectorizar, limpiarTexto } from './vectorizador'

const DB_MODEL_NAME = 'modelo_emociones_v1'
let modelo = null
let vocab = null
const etiquetas = ['alegría','tristeza','enojo','miedo','sorpresa','amor','neutral']

async function crearYEntrenarModelo() {
  // Construir vocabulario y datos
  vocab = construirVocabulario(dataset)
  const xs = tf.tensor2d(dataset.map(d => vectorizar(d.texto, vocab)))
  const ys = tf.tensor2d(dataset.map(d => {
    const v = new Array(etiquetas.length).fill(0)
    v[etiquetas.indexOf(d.etiqueta)] = 1
    return v
  }))

  const model = tf.sequential()
  model.add(tf.layers.dense({ inputShape: [vocab.length], units: 64, activation: 'relu' }))
  model.add(tf.layers.dropout({ rate: 0.2 }))
  model.add(tf.layers.dense({ units: etiquetas.length, activation: 'softmax' }))

  model.compile({ optimizer: tf.train.adam(0.01), loss: 'categoricalCrossentropy', metrics: ['accuracy'] })

  // Entrenamiento rápido
  await model.fit(xs, ys, { epochs: 40, batchSize: 8, verbose: 0 })

  // Guardar vocab y modelo
  await model.save(`indexeddb://${DB_MODEL_NAME}`)
  await saveVocab()
  return model
}

async function saveVocab() {
  try { localStorage.setItem(DB_MODEL_NAME + '_vocab', JSON.stringify(vocab)) } catch (e) {}
}

async function loadVocab() {
  try { return JSON.parse(localStorage.getItem(DB_MODEL_NAME + '_vocab')) } catch (e) { return null }
}

export async function cargarModelo() {
  if (modelo) return modelo
  try {
    modelo = await tf.loadLayersModel(`indexeddb://${DB_MODEL_NAME}`)
    vocab = await loadVocab()
    if (!vocab) throw new Error('No vocab')
    return modelo
  } catch (e) {
    modelo = await crearYEntrenarModelo()
    return modelo
  }
}

export async function predecirEmocion(texto) {
  if (!texto) throw new Error('Texto vacío')
  if (!modelo) await cargarModelo()
  if (!modelo) throw new Error('No se pudo cargar el modelo')
  try {
    const vec = vectorizar(texto, vocab)
    const input = tf.tensor2d([vec])
    const pred = modelo.predict(input)
    const datos = await pred.data()
    const idx = datos.indexOf(Math.max(...datos))
    return { etiqueta: etiquetas[idx], confianza: datos[idx], vector: vec }
  } catch (e) {
    throw new Error('Error durante la predicción: ' + e.message)
  }
}

export { limpiarTexto }

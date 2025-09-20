import React from 'react'
import SentimientoCaja from '../components/SentimientoCaja'

export default function Inicio() {
  return (
    <div className="space-y-8">
      <section className="rounded-xl bg-white dark:bg-gray-800 p-6 shadow">
        <h1 className="text-2xl font-bold">Inicio</h1>
        <p className="mt-2">Bienvenido a la SPA de ejemplo con IA de emociones integrada. Explora el catálogo o prueba el módulo de IA.</p>
        <div className="mt-4">
          <a href="/catalogo" className="inline-block bg-teal-500 text-white px-4 py-2 rounded">Ir al Catálogo</a>
        </div>
      </section>

      <section className="rounded-xl bg-white dark:bg-gray-800 p-6 shadow">
        <h2 className="text-xl font-semibold">IA de Emociones</h2>
        <p className="mt-2">Analiza un texto en español localmente en tu navegador.</p>
        <SentimientoCaja />
      </section>
    </div>
  )
}

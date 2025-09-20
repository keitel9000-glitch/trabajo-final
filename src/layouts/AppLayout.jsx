import React from 'react'
import { Link, Outlet } from 'react-router-dom'

export default function AppLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <header className="bg-white dark:bg-gray-800 shadow">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link to="/" className="text-xl font-bold" aria-label="Ir a Inicio">Trabajo Final - SPA</Link>
          <nav aria-label="Navegación principal">
            <ul className="flex gap-4">
              <li><Link to="/" className="hover:underline">Inicio</Link></li>
              <li><Link to="/catalogo" className="hover:underline">Catálogo</Link></li>
            </ul>
          </nav>
        </div>
      </header>

      <main className="flex-1 container mx-auto px-4 py-8">
        <Outlet />
      </main>

      <footer className="bg-white dark:bg-gray-800 border-t py-4">
        <div className="container mx-auto px-4 text-sm text-center">Hecho con ❤️ — Proyecto de ejemplo</div>
      </footer>
    </div>
  )
}

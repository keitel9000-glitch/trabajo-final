import React from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import AppRoutes from './router'
import { FavoritosProvider } from './context/FavoritosContext'
import ErrorBoundary from './components/ErrorBoundary'
import './index.css'

function App() {
  return (
    <React.StrictMode>
      <BrowserRouter>
        <FavoritosProvider>
          <ErrorBoundary>
            <AppRoutes />
          </ErrorBoundary>
        </FavoritosProvider>
      </BrowserRouter>
    </React.StrictMode>
  )
}

createRoot(document.getElementById('root')).render(<App />)

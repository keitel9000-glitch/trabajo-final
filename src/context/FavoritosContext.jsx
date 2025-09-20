import React, { createContext, useContext, useEffect, useState } from 'react'
import * as favService from '../services/favoritos'

const FavoritosContext = createContext()

export function FavoritosProvider({ children }) {
  const [favoritos, setFavoritos] = useState([])

  useEffect(() => { setFavoritos(favService.obtenerFavoritos()) }, [])

  const toggleFavorito = (item) => {
    if (favService.esFavorito(item.id)) {
      favService.quitarFavorito(item.id)
      setFavoritos(f => f.filter(i => i.id !== item.id))
    } else {
      favService.agregarFavorito(item)
      setFavoritos(f => [...f, item])
    }
  }

  const esFavorito = (id) => favService.esFavorito(id)

  return (
    <FavoritosContext.Provider value={{ favoritos, toggleFavorito, esFavorito }}>
      {children}
    </FavoritosContext.Provider>
  )
}

export function useFavoritos() {
  return useContext(FavoritosContext)
}

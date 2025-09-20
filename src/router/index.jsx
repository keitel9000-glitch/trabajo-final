import React from 'react'
import { Routes, Route } from 'react-router-dom'
import AppLayout from '../layouts/AppLayout'
import Inicio from '../pages/Inicio'
import Catalogo from '../pages/Catalogo'
import Detalle from '../pages/Detalle'

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<AppLayout />}>
        <Route index element={<Inicio />} />
        <Route path="catalogo" element={<Catalogo />} />
        <Route path="detalle/:id" element={<Detalle />} />
      </Route>
    </Routes>
  )
}

import { useState } from 'react'
import { AppDataContext } from './AppDataContext.js'

const initialFlowers = [
  { id: 1, nombre: 'Rosa Roja', tipo: 'Rosa', color: 'Rojo', precio: 12.5, stock: 24 },
  { id: 2, nombre: 'Girasol', tipo: 'Girasol', color: 'Amarillo', precio: 9.75, stock: 18 },
  { id: 3, nombre: 'Tulipán', tipo: 'Tulipán', color: 'Rosa', precio: 11, stock: 12 },
  { id: 4, nombre: 'Lirio', tipo: 'Lirio', color: 'Blanco', precio: 14.25, stock: 9 },
]

const initialClients = [
  { id: 1, nombre: 'Valentina', apellido: 'Gómez', telefono: '11 4567-8901', correo: 'valentina.gomez@email.com', direccion: 'Av. Santa Fe 1240' },
  { id: 2, nombre: 'Martín', apellido: 'Ruiz', telefono: '11 4822-1634', correo: 'martin.ruiz@email.com', direccion: 'Calle Arenales 835' },
  { id: 3, nombre: 'Camila', apellido: 'Sosa', telefono: '11 4109-7282', correo: 'camila.sosa@email.com', direccion: 'Av. Cabildo 2198' },
]

export function AppDataProvider({ children }) {
  const [flowers, setFlowers] = useState(initialFlowers)
  const [clients, setClients] = useState(initialClients)
  const [orders, setOrders] = useState([])

  return <AppDataContext.Provider value={{ flowers, setFlowers, clients, setClients, orders, setOrders }}>{children}</AppDataContext.Provider>
}

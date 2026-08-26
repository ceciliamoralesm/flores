import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Layout from './components/Layout.jsx'
import Home from './pages/Home.jsx'
import Flowers from './pages/Flowers.jsx'
import Clients from './pages/Clients.jsx'
import Orders from './pages/Orders.jsx'
import { AppDataProvider } from './context/AppDataContext.jsx'
import './index.css'

function App() {
  return (
    <BrowserRouter>
      <AppDataProvider>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/flores" element={<Flowers />} />
            <Route path="/clientes" element={<Clients />} />
            <Route path="/pedidos" element={<Orders />} />
          </Route>
        </Routes>
      </AppDataProvider>
    </BrowserRouter>
  )
}

export default App

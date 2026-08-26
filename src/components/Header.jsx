import { useLocation } from 'react-router-dom'

const titles = {
  '/': ['Inicio', 'Resumen general de tu florería'],
  '/flores': ['Flores', 'Gestiona el catálogo de flores'],
  '/clientes': ['Clientes', 'Consulta y organiza tus clientes'],
  '/pedidos': ['Pedidos', 'Mantén tus pedidos bajo control'],
}

function Header() {
  const { pathname } = useLocation()
  const [title, subtitle] = titles[pathname] || titles['/']

  return (
    <header className="page-header">
      <div>
        <p className="eyebrow">FloraGestión / Panel</p>
        <h1>{title}</h1>
        <p className="header-subtitle">{subtitle}</p>
      </div>
      <div className="user-badge" aria-label="Usuario administrador">A</div>
    </header>
  )
}

export default Header
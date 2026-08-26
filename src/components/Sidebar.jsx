import { NavLink } from 'react-router-dom'

const links = [
  { to: '/', label: 'Inicio', icon: '⌂' },
  { to: '/flores', label: 'Flores', icon: '✿' },
  { to: '/clientes', label: 'Clientes', icon: '♧' },
  { to: '/pedidos', label: 'Pedidos', icon: '▤' },
]

function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="brand">
        <span className="brand-mark">✿</span>
        <div>
          <strong>FloraGestión</strong>
          <small>Sistema de Gestión de Florería</small>
        </div>
      </div>
      <nav aria-label="Navegación principal">
        <p className="nav-label">Menú principal</p>
        {links.map((link) => (
          <NavLink key={link.to} to={link.to} end={link.to === '/'} className="nav-link">
            <span aria-hidden="true">{link.icon}</span>
            {link.label}
          </NavLink>
        ))}
      </nav>
      <div className="sidebar-note">
        <span aria-hidden="true">✦</span>
        <p>Tu florería,<br />más organizada.</p>
      </div>
    </aside>
  )
}

export default Sidebar
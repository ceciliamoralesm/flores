const stats = [
  { label: 'Flores', value: '0', icon: '✿', tone: 'green' },
  { label: 'Clientes', value: '0', icon: '♧', tone: 'yellow' },
  { label: 'Pedidos', value: '0', icon: '▤', tone: 'coral' },
]

function Home() {
  return (
    <div className="page-enter">
      <section className="welcome-banner">
        <div>
          <p className="eyebrow">Un nuevo día para crear</p>
          <h2>Todo listo para hacer florecer tu negocio.</h2>
          <p>Comienza organizando la información de tu florería desde un solo lugar.</p>
        </div>
        <div className="banner-flower" aria-hidden="true">✿</div>
      </section>
      <div className="section-heading">
        <div><p className="eyebrow">Vista general</p><h2>Resumen de actividad</h2></div>
        <span className="status-dot">Sistema inicial</span>
      </div>
      <div className="stats-grid">
        {stats.map((stat) => <article className="stat-card" key={stat.label}><div className={`stat-icon ${stat.tone}`}>{stat.icon}</div><div><p>{stat.label}</p><strong>{stat.value}</strong></div></article>)}
      </div>
      <section className="empty-state"><span aria-hidden="true">❀</span><h2>Tu espacio de trabajo</h2><p>Los datos de tu florería aparecerán aquí cuando comiences a cargar información.</p></section>
    </div>
  )
}

export default Home
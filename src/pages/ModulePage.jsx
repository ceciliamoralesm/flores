function ModulePage({ title, message, icon }) {
  return <section className="module-placeholder page-enter"><div className="placeholder-icon">{icon}</div><p className="eyebrow">Próximamente</p><h2>{title}</h2><p>{message}</p></section>
}

export default ModulePage
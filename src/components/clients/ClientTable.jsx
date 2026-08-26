function ClientTable({ clients, onEdit, onDelete }) {
  if (clients.length === 0) {
    return <div className="empty-table"><span aria-hidden="true">♧</span><p>No hay clientes registrados.</p></div>
  }

  return (
    <div className="table-container">
      <table>
        <caption>Clientes registrados</caption>
        <thead><tr><th>ID</th><th>Nombre</th><th>Apellido</th><th>Teléfono</th><th>Correo</th><th>Dirección</th><th>Acciones</th></tr></thead>
        <tbody>{clients.map((client) => <tr key={client.id}><td className="id-cell">#{client.id}</td><td className="name-cell">{client.nombre}</td><td>{client.apellido}</td><td>{client.telefono}</td><td>{client.correo}</td><td>{client.direccion}</td><td><div className="table-actions"><button className="text-button" type="button" onClick={() => onEdit(client)}>Editar</button><button className="text-button danger" type="button" onClick={() => onDelete(client)}>Eliminar</button></div></td></tr>)}</tbody>
      </table>
    </div>
  )
}

export default ClientTable
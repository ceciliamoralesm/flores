function OrderTable({ orders, clients, flowers, onEdit, onDelete }) {
  if (orders.length === 0) return <div className="empty-table"><span aria-hidden="true">▤</span><p>No hay pedidos registrados.</p></div>

  return (
    <div className="table-container">
      <table>
        <caption>Pedidos registrados</caption>
        <thead><tr><th>ID</th><th>Cliente</th><th>Flor</th><th>Cantidad</th><th>Fecha</th><th>Precio total</th><th>Estado</th><th>Acciones</th></tr></thead>
        <tbody>{orders.map((order) => { const client = clients.find((item) => item.id === order.clienteId); const flower = flowers.find((item) => item.id === order.florId); return <tr key={order.id}><td className="id-cell">#{order.id}</td><td className="name-cell">{client ? `${client.nombre} ${client.apellido}` : 'Cliente no disponible'}</td><td>{flower ? flower.nombre : 'Flor no disponible'}</td><td>{order.cantidad}</td><td>{order.fecha}</td><td>${Number(order.precioTotal).toFixed(2)}</td><td><span className={`status-tag ${order.estado.toLowerCase()}`}>{order.estado}</span></td><td><div className="table-actions"><button className="text-button" type="button" onClick={() => onEdit(order)}>Editar</button><button className="text-button danger" type="button" onClick={() => onDelete(order)}>Eliminar</button></div></td></tr> })}</tbody>
      </table>
    </div>
  )
}

export default OrderTable

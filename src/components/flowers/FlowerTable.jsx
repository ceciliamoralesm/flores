function FlowerTable({ flowers, onEdit, onDelete }) {
  if (flowers.length === 0) {
    return <div className="empty-table"><span aria-hidden="true">✿</span><p>No hay flores registradas.</p></div>
  }

  return (
    <div className="table-container">
      <table>
        <caption>Flores registradas</caption>
        <thead><tr><th>ID</th><th>Nombre</th><th>Tipo</th><th>Color</th><th>Precio</th><th>Stock</th><th>Acciones</th></tr></thead>
        <tbody>{flowers.map((flower) => <tr key={flower.id}><td className="id-cell">#{flower.id}</td><td className="name-cell">{flower.nombre}</td><td>{flower.tipo}</td><td><span className="color-tag">{flower.color}</span></td><td>${parseInt(flower.precio, 10).toFixed(2)}</td><td><span className={flower.stock === 0 ? 'stock-tag empty' : 'stock-tag'}>{flower.stock}</span></td><td><div className="table-actions"><button className="text-button" type="button" onClick={() => onEdit(flower)}>Editar</button><button className="text-button danger" type="button" onClick={() => onDelete(flower)}>Eliminar</button></div></td></tr>)}</tbody>
      </table>
    </div>
  )
}

export default FlowerTable
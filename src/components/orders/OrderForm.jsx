import { useState } from 'react'

const statuses = ['Pendiente', 'Preparando', 'Entregado', 'Cancelado']

function OrderForm({ order, clients, flowers, onSave, onCancel }) {
  const [formData, setFormData] = useState(order ? {
    clienteId: String(order.clienteId),
    florId: String(order.florId),
    cantidad: String(order.cantidad),
    fecha: order.fecha,
    estado: order.estado,
  } : {
    clienteId: '', florId: '', cantidad: '1', fecha: new Date().toISOString().slice(0, 10), estado: 'Pendiente',
  })
  const [errors, setErrors] = useState({})

  const selectedFlower = flowers.find((flower) => flower.id === Number(formData.florId))
  const total = selectedFlower ? parseInt(selectedFlower.precio, 10) * Number(formData.cantidad || 0) : 0

  function handleChange(event) {
    const { name, value } = event.target
    setFormData((currentData) => ({ ...currentData, [name]: value }))
    setErrors((currentErrors) => ({ ...currentErrors, [name]: '' }))
  }

  function validate() {
    const nextErrors = {}
    if (!clients.some((client) => client.id === Number(formData.clienteId))) nextErrors.clienteId = 'Selecciona un cliente.'
    if (!flowers.some((flower) => flower.id === Number(formData.florId))) nextErrors.florId = 'Selecciona una flor.'
    if (Number(formData.cantidad) <= 0) nextErrors.cantidad = 'Debe ser un entero mayor a 0.'
    if (!formData.fecha) nextErrors.fecha = 'La fecha es obligatoria.'
    if (!statuses.includes(formData.estado)) nextErrors.estado = 'Selecciona un estado válido.'
    return nextErrors
  }

  function handleSubmit(event) {
    event.preventDefault()
    const nextErrors = validate()
    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors)
      return
    }
    onSave({ clienteId: Number(formData.clienteId), florId: Number(formData.florId), cantidad: Number(formData.cantidad), fecha: formData.fecha, estado: formData.estado, precioTotal: total })
  }

  return (
    <form className="flower-form order-form" onSubmit={handleSubmit} noValidate>
      <div className="form-heading"><div><p className="eyebrow">{order ? 'Modificar registro' : 'Nuevo registro'}</p><h3>{order ? 'Editar pedido' : 'Registrar pedido'}</h3></div><button className="icon-button" type="button" onClick={onCancel} aria-label="Cerrar formulario">×</button></div>
      <div className="form-grid order-form-grid">
        <label>Cliente<select name="clienteId" value={formData.clienteId} onChange={handleChange} aria-invalid={Boolean(errors.clienteId)}><option value="">Seleccionar cliente</option>{clients.map((client) => <option key={client.id} value={client.id}>{client.nombre} {client.apellido}</option>)}</select>{errors.clienteId && <span className="field-error">{errors.clienteId}</span>}</label>
        <label>Flor<select name="florId" value={formData.florId} onChange={handleChange} aria-invalid={Boolean(errors.florId)}><option value="">Seleccionar flor</option>{flowers.map((flower) => <option key={flower.id} value={flower.id}>{flower.nombre} - ${flower.precio.toFixed(2)}</option>)}</select>{errors.florId && <span className="field-error">{errors.florId}</span>}</label>
        <label>Cantidad<input name="cantidad" type="number" min="1" step="1" value={formData.cantidad} onChange={handleChange} aria-invalid={Boolean(errors.cantidad)} />{errors.cantidad && <span className="field-error">{errors.cantidad}</span>}</label>
        <label>Fecha<input name="fecha" type="date" value={formData.fecha} onChange={handleChange} aria-invalid={Boolean(errors.fecha)} />{errors.fecha && <span className="field-error">{errors.fecha}</span>}</label>
        <label>Estado<select name="estado" value={formData.estado} onChange={handleChange} aria-invalid={Boolean(errors.estado)}>{statuses.map((status) => <option key={status} value={status}>{status}</option>)}</select>{errors.estado && <span className="field-error">{errors.estado}</span>}</label>
      </div>
      <div className="order-total"><span>Precio total</span><strong>${total.toFixed(2)}</strong></div>
      <div className="form-actions"><button className="secondary-button" type="button" onClick={onCancel}>Cancelar</button><button className="primary-button" type="submit">Guardar pedido</button></div>
    </form>
  )
}

export default OrderForm

import { useState } from 'react'

const emptyFlower = { nombre: '', tipo: '', color: '', precio: '', stock: '' }

function FlowerForm({ flower, onSave, onCancel }) {
  const [formData, setFormData] = useState(flower ? {
    nombre: flower.nombre,
    tipo: flower.tipo,
    color: flower.color,
    precio: String(flower.precio),
    stock: String(flower.stock),
  } : emptyFlower)
  const [errors, setErrors] = useState({})

  function handleChange(event) {
    const { name, value } = event.target
    setFormData((currentData) => ({ ...currentData, [name]: value }))
    setErrors((currentErrors) => ({ ...currentErrors, [name]: '' }))
  }

  function validate() {
    const nextErrors = {}
    if (!formData.nombre.trim()) nextErrors.nombre = 'El nombre es obligatorio.'
    if (!formData.tipo.trim()) nextErrors.tipo = 'El tipo es obligatorio.'
    if (!formData.color.trim()) nextErrors.color = 'El color es obligatorio.'
    if (!formData.precio || Number(formData.precio) <= 0) nextErrors.precio = 'Debe ser mayor a 0.'
    if (formData.stock === '' || !Number.isInteger(Number(formData.stock)) || Number(formData.stock) < 0) {
      nextErrors.stock = 'Debe ser un entero mayor o igual a 0.'
    }
    return nextErrors
  }

  function handleSubmit(event) {
    event.preventDefault()
    const nextErrors = validate()
    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors)
      return
    }
    onSave({
      nombre: formData.nombre.trim(),
      tipo: formData.tipo.trim(),
      color: formData.color.trim(),
      precio: Number(formData.precio),
      stock: Number(formData.stock),
    })
  }

  return (
    <form className="flower-form" onSubmit={handleSubmit} noValidate>
      <div className="form-heading"><div><p className="eyebrow">{flower ? 'Modificar registro' : 'Nuevo registro'}</p><h3>{flower ? 'Editar flor' : 'Registrar flor'}</h3></div><button className="icon-button" type="button" onClick={onCancel} aria-label="Cerrar formulario">×</button></div>
      <div className="form-grid">
        <label>Nombre<input name="nombre" value={formData.nombre} onChange={handleChange} aria-invalid={Boolean(errors.nombre)} />{errors.nombre && <span className="field-error">{errors.nombre}</span>}</label>
        <label>Tipo<input name="tipo" value={formData.tipo} onChange={handleChange} aria-invalid={Boolean(errors.tipo)} />{errors.tipo && <span className="field-error">{errors.tipo}</span>}</label>
        <label>Color<input name="color" value={formData.color} onChange={handleChange} aria-invalid={Boolean(errors.color)} />{errors.color && <span className="field-error">{errors.color}</span>}</label>
        <label>Precio<input name="precio" type="number" min="0.01" step="0.01" value={formData.precio} onChange={handleChange} aria-invalid={Boolean(errors.precio)} />{errors.precio && <span className="field-error">{errors.precio}</span>}</label>
        <label>Stock<input name="stock" type="number" min="0" step="1" value={formData.stock} onChange={handleChange} aria-invalid={Boolean(errors.stock)} />{errors.stock && <span className="field-error">{errors.stock}</span>}</label>
      </div>
      <div className="form-actions"><button className="secondary-button" onClick={onCancel}>Cancelar</button><button className="primary-button" type="submit">Guardar flor</button></div>
    </form>
  )
}

export default FlowerForm
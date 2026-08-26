import { useState } from 'react'

const emptyClient = { nombre: '', apellido: '', telefono: '', correo: '', direccion: '' }
const emailPattern = /@/

function ClientForm({ client, onSave, onCancel }) {
  const [formData, setFormData] = useState(client ? {
    nombre: client.nombre,
    apellido: client.apellido,
    telefono: client.telefono,
    correo: client.correo,
    direccion: client.direccion,
  } : emptyClient)
  const [errors, setErrors] = useState({})

  function handleChange(event) {
    const { name, value } = event.target
    setFormData((currentData) => ({ ...currentData, [name]: value }))
    setErrors((currentErrors) => ({ ...currentErrors, [name]: '' }))
  }

  function validate() {
    const nextErrors = {}
    if (!formData.nombre.trim()) nextErrors.nombre = 'El nombre es obligatorio.'
    if (!formData.apellido.trim()) nextErrors.apellido = 'El apellido es obligatorio.'
    if (!formData.telefono.trim()) nextErrors.telefono = 'El teléfono es obligatorio.'
    if (!formData.correo.trim()) nextErrors.correo = 'El correo es obligatorio.'
    else if (!emailPattern.test(formData.correo.trim())) nextErrors.correo = 'Ingresa un correo válido.'
    if (!formData.direccion.trim()) nextErrors.direccion = 'La dirección es obligatoria.'
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
      apellido: formData.apellido.trim(),
      telefono: formData.telefono.trim(),
      correo: formData.correo.trim(),
      direccion: formData.direccion.trim(),
    })
  }

  return (
    <form className="flower-form client-form" onSubmit={handleSubmit} noValidate>
      <div className="form-heading"><div><p className="eyebrow">{client ? 'Modificar registro' : 'Nuevo registro'}</p><h3>{client ? 'Editar cliente' : 'Registrar cliente'}</h3></div><button className="icon-button" type="button" onClick={onCancel} aria-label="Cerrar formulario">×</button></div>
      <div className="form-grid client-form-grid">
        <label>Nombre<input name="nombre" value={formData.nombre} onChange={handleChange} aria-invalid={Boolean(errors.nombre)} />{errors.nombre && <span className="field-error">{errors.nombre}</span>}</label>
        <label>Apellido<input name="apellido" value={formData.apellido} onChange={handleChange} aria-invalid={Boolean(errors.apellido)} />{errors.apellido && <span className="field-error">{errors.apellido}</span>}</label>
        <label>Teléfono<input name="telefono" type="tel" value={formData.telefono} onChange={handleChange} aria-invalid={Boolean(errors.telefono)} />{errors.telefono && <span className="field-error">{errors.telefono}</span>}</label>
        <label>Correo<input name="correo" type="email" value={formData.correo} onChange={handleChange} aria-invalid={Boolean(errors.correo)} />{errors.correo && <span className="field-error">{errors.correo}</span>}</label>
        <label className="wide-field">Dirección<input name="direccion" value={formData.direccion} onChange={handleChange} aria-invalid={Boolean(errors.direccion)} />{errors.direccion && <span className="field-error">{errors.direccion}</span>}</label>
      </div>
      <div className="form-actions"><button className="secondary-button" type="button" onClick={onCancel}>Cancelar</button><button className="primary-button" type="submit">Guardar cliente</button></div>
    </form>
  )
}

export default ClientForm
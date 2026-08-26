import { useState } from 'react'
import ClientForm from '../components/clients/ClientForm.jsx'
import ClientTable from '../components/clients/ClientTable.jsx'

const initialClients = [
	{ id: 1, nombre: 'Valentina', apellido: 'Gómez', telefono: '11 4567-8901', correo: 'valentina.gomez@email.com', direccion: 'Av. Santa Fe 1240' },
	{ id: 2, nombre: 'Martín', apellido: 'Ruiz', telefono: '11 4822-1634', correo: 'martin.ruiz@email.com', direccion: 'Calle Arenales 835' },
	{ id: 3, nombre: 'Camila', apellido: 'Sosa', telefono: '11 4109-7282', correo: 'camila.sosa@email.com', direccion: 'Av. Cabildo 2198' },
]

function Clients() {
	const [clients, setClients] = useState(initialClients)
	const [editingClient, setEditingClient] = useState(null)
	const [isFormOpen, setIsFormOpen] = useState(false)

	function openNewForm() {
		setEditingClient(null)
		setIsFormOpen(true)
	}

	function handleSave(clientData) {
		if (editingClient) {
			setClients((currentClients) => currentClients.map((client) => (
				client.id === editingClient.id ? { ...client, ...clientData } : client
			)))
		} else {
			setClients((currentClients) => [
				...currentClients,
				{ id: currentClients.length + 1, ...clientData },
			])
		}
		setEditingClient(null)
		setIsFormOpen(false)
	}

	function handleDelete(client) {
		setClients((currentClients) => currentClients.filter((item) => item.id !== client.id))
	}

	return (
		<section className="clients-page page-enter">
			<div className="module-toolbar">
				<div>
					<p className="eyebrow">Agenda</p>
					<h2>Gestión de Clientes</h2>
					<p className="module-description">Administra los datos de contacto de tus clientes.</p>
				</div>
				<button className="primary-button" type="button" onClick={openNewForm}>+ Nuevo cliente</button>
			</div>

			{isFormOpen && (
				<ClientForm
					key={editingClient ? editingClient.id : 'new'}
					client={editingClient}
					onSave={handleSave}
					onCancel={() => { setEditingClient(null); setIsFormOpen(false) }}
				/>
			)}

			<ClientTable
				clients={clients}
				onEdit={(client) => { setEditingClient(client); setIsFormOpen(true) }}
				onDelete={handleDelete}
			/>
		</section>
	)
}

export default Clients
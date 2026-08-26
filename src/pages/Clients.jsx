import ClientForm from '../components/clients/ClientForm.jsx'
import ClientTable from '../components/clients/ClientTable.jsx'
import { useAppData } from '../context/useAppData.js'

function Clients() {
	const { clients, setClients } = useAppData()
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
				{ id: Math.max(...currentClients.map((client) => client.id), 0) + 1, ...clientData },
			])
		}
		setEditingClient(null)
		setIsFormOpen(false)
	}

	function handleDelete(client) {
		if (window.confirm(`¿Deseas eliminar al cliente "${client.nombre} ${client.apellido}"?`)) {
			setClients((currentClients) => currentClients.filter((item) => item.id !== client.id))
			if (editingClient?.id === client.id) {
				setEditingClient(null)
				setIsFormOpen(false)
			}
		}
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
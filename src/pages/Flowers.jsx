import FlowerForm from '../components/flowers/FlowerForm.jsx'
import FlowerTable from '../components/flowers/FlowerTable.jsx'
import { useAppData } from '../context/useAppData.js'

function Flowers() {
	const { flowers, setFlowers } = useAppData()
	const [editingFlower, setEditingFlower] = useState(null)
	const [isFormOpen, setIsFormOpen] = useState(false)

	function openNewForm() {
		setEditingFlower(null)
		setIsFormOpen(true)
	}

	function handleSave(flowerData) {
		if (editingFlower) {
			setFlowers((currentFlowers) => currentFlowers.map((flower) => (
				flower.id === editingFlower.id ? { ...flower, ...flowerData } : flower
			)))
		} else {
			setFlowers((currentFlowers) => [
				...currentFlowers,
				{ id: Math.max(...currentFlowers.map((flower) => flower.id), 0) + 1, ...flowerData },
			])
		}
		setEditingFlower(null)
		setIsFormOpen(false)
	}

	function handleDelete(flower) {
		setFlowers((currentFlowers) => currentFlowers.filter((item) => item.id !== flower.id))
		if (editingFlower?.id === flower.id) {
			setEditingFlower(null)
			setIsFormOpen(false)
		}
	}

	return (
		<section className="flowers-page page-enter">
			<div className="module-toolbar">
				<div>
					<p className="eyebrow">Catálogo</p>
					<h2>Gestión de Flores</h2>
					<p className="module-description">Administra las flores disponibles en tu florería.</p>
				</div>
				<button className="primary-button" type="button" onClick={openNewForm}>+ Nueva flor</button>
			</div>

			{isFormOpen && (
				<FlowerForm
					key={editingFlower ? editingFlower.id : 'new'}
					flower={editingFlower}
					onSave={handleSave}
					onCancel={() => { setEditingFlower(null); setIsFormOpen(false) }}
				/>
			)}

			<FlowerTable
				flowers={flowers}
				onEdit={(flower) => { setEditingFlower(flower); setIsFormOpen(true) }}
				onDelete={handleDelete}
			/>
		</section>
	)
}

export default Flowers
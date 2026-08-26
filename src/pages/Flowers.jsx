import { useState } from 'react'
import FlowerForm from '../components/flowers/FlowerForm.jsx'
import FlowerTable from '../components/flowers/FlowerTable.jsx'

const initialFlowers = [
	{ id: 1, nombre: 'Rosa Roja', tipo: 'Rosa', color: 'Rojo', precio: 12.5, stock: 24 },
	{ id: 2, nombre: 'Girasol', tipo: 'Girasol', color: 'Amarillo', precio: 9.75, stock: 18 },
	{ id: 3, nombre: 'Tulipán', tipo: 'Tulipán', color: 'Rosa', precio: 11, stock: 12 },
	{ id: 4, nombre: 'Lirio', tipo: 'Lirio', color: 'Blanco', precio: 14.25, stock: 9 },
]

function Flowers() {
	const [flowers, setFlowers] = useState(initialFlowers)
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
				{ id: currentFlowers.length + 1, ...flowerData },
			])
		}
		setEditingFlower(null)
		setIsFormOpen(false)
	}

	function handleDelete(flower) {
		setFlowers((currentFlowers) => currentFlowers.filter((item) => item.id !== flower.id))
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
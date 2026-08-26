import { useState } from 'react'
import OrderForm from '../components/orders/OrderForm.jsx'
import OrderTable from '../components/orders/OrderTable.jsx'
import { useAppData } from '../context/useAppData.js'

function Orders() {
	const { clients, flowers, orders, setOrders } = useAppData()
	const [editingOrder, setEditingOrder] = useState(null)
	const [isFormOpen, setIsFormOpen] = useState(false)

	function handleSave(orderData) {
		if (editingOrder) {
			setOrders((currentOrders) => currentOrders.map((order) => (
				order.id === editingOrder.id ? { ...order, ...orderData } : order
			)))
		} else {
			setOrders((currentOrders) => [
				...currentOrders,
				{ id: Math.max(...currentOrders.map((order) => order.id), 0) + 1, ...orderData },
			])
		}
		setEditingOrder(null)
		setIsFormOpen(false)
	}

	function handleDelete(order) {
		setOrders((currentOrders) => currentOrders.filter((item) => item.id !== order.id))
	}

	const canCreateOrder = clients.length > 0 && flowers.length > 0

	return (
		<section className="orders-page page-enter">
			<div className="module-toolbar">
				<div>
					<p className="eyebrow">Operaciones</p>
					<h2>Gestión de Pedidos</h2>
					<p className="module-description">Registra y sigue los encargos de tu florería.</p>
				</div>
				<button className="primary-button" type="button" onClick={() => { setEditingOrder(null); setIsFormOpen(true) }} disabled={!canCreateOrder}>+ Nuevo pedido</button>
			</div>

			{!canCreateOrder && (
				<div className="order-notice"><span aria-hidden="true">!</span><div><strong>No se pueden crear pedidos todavía</strong><p>{clients.length === 0 ? 'Primero debe registrarse un cliente.' : 'Primero debe registrarse una flor.'}</p></div></div>
			)}

			{isFormOpen && canCreateOrder && <OrderForm key={editingOrder ? editingOrder.id : 'new'} order={editingOrder} clients={clients} flowers={flowers} onSave={handleSave} onCancel={() => { setEditingOrder(null); setIsFormOpen(false) }} />}
			<OrderTable orders={orders} clients={clients} flowers={flowers} onEdit={(order) => { setEditingOrder(order); setIsFormOpen(true) }} onDelete={handleDelete} />
		</section>
	)
}

export default Orders
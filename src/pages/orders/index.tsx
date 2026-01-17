import { useOrdersQuery } from "@/features/orders";

export default function OrdersPage() {
    const ordersQuery = useOrdersQuery();

    if (ordersQuery.isLoading) {
        return <div className="p-6">Cargando pedidos...</div>;
    }

    if (ordersQuery.isError) {
        return (
            <div className="p-6 text-red-600">
                Error al cargar pedidos. Intenta nuevamente.
            </div>
        );
    }

    const orders = ordersQuery.data ?? [];

    return (
        <div className="p-6 space-y-4">
            <div>
                <h1 className="text-xl font-semibold">Pedidos</h1>
                <p className="text-sm text-gray-600">
                    Ruta protegida (permiso orders:read)
                </p>
            </div>

            <ul className="space-y-2">
                {orders.map((order) => (
                    <li
                        key={order.id}
                        className="border rounded px-3 py-2 flex justify-between"
                    >
                        <span>{order.item}</span>
                        <span className="text-sm text-gray-700">
                            {order.status}
                        </span>
                    </li>
                ))}
            </ul>
        </div>
    );
}

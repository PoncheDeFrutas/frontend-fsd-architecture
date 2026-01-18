import { useOrdersQuery } from "@/features/orders";
import { OrdersList } from "@/widgets/orders-list";

export default function OrdersPage() {
    const ordersQuery = useOrdersQuery();

    if (ordersQuery.isLoading) {
        return (
            <div className="p-6">
                <p className="text-sm text-gray-600">Cargando pedidos...</p>
            </div>
        );
    }

    if (ordersQuery.isError) {
        return (
            <div className="p-6 text-red-600">
                <p className="font-semibold">Error al cargar pedidos.</p>
                <button
                    className="mt-2 underline"
                    onClick={() => ordersQuery.refetch()}
                >
                    Reintentar
                </button>
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

            <OrdersList orders={orders} />
        </div>
    );
}

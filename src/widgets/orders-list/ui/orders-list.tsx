import type { Order } from "@/entities/order";

type Props = {
    orders: Order[];
};

export function OrdersList({ orders }: Props) {
    if (!orders.length) {
        return (
            <div className="border rounded px-3 py-2 text-sm text-gray-700">
                No hay pedidos aún.
            </div>
        );
    }

    return (
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
    );
}

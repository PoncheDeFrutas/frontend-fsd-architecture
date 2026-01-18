import { useOrdersQuery } from "@/features/orders";
import { OrdersList } from "@/widgets/orders-list";
import { Card } from "@/shared/ui/layout/card";
import { Stack } from "@/shared/ui/layout/stack";
import { Alert } from "@/shared/ui/feedback/alert";
import { Button } from "@/shared/ui/primitives/button";
import { Spinner } from "@/shared/ui/feedback";

export default function OrdersPage() {
    const ordersQuery = useOrdersQuery();

    if (ordersQuery.isLoading) {
        return (
            <div className="py-6 flex justify-center">
                <Spinner />
            </div>
        );
    }

    if (ordersQuery.isError) {
        return (
            <Card className="bg-surface text-foreground border-border">
                <Stack gap="3">
                    <Alert
                        variant="error"
                        className="bg-danger text-danger-foreground"
                    >
                        Error al cargar pedidos.
                    </Alert>
                    <Button
                        variant="primary"
                        onClick={() => ordersQuery.refetch()}
                    >
                        Reintentar
                    </Button>
                </Stack>
            </Card>
        );
    }

    const orders = ordersQuery.data ?? [];

    return (
        <Stack gap="4" className="py-2">
            <div>
                <p className="text-sm text-muted-foreground">
                    Ruta protegida (permiso orders:read)
                </p>
                <h1 className="text-xl font-semibold text-foreground">
                    Pedidos
                </h1>
            </div>

            <Card className="bg-surface text-foreground border-border">
                <OrdersList orders={orders} />
            </Card>
        </Stack>
    );
}

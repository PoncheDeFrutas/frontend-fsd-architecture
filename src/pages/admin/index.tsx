import { Card } from "@/shared/ui/layout/card";
import { Stack } from "@/shared/ui/layout/stack";
import { Alert } from "@/shared/ui/feedback/alert";

export default function AdminPage() {
    return (
        <Stack gap="4" className="py-4">
            <div>
                <p className="text-sm text-muted-foreground">
                    Panel protegido por rol admin
                </p>
                <h1 className="text-xl font-semibold text-foreground">Admin</h1>
            </div>

            <Card className="bg-surface text-foreground border-border">
                <Stack gap="3">
                    <p className="text-sm text-muted-foreground">
                        Este panel demuestra guards de rol. Solo admins pueden
                        ver esta página.
                    </p>
                    <Alert
                        variant="info"
                        className="bg-surface-2 text-foreground border border-border"
                    >
                        Agrega tus módulos de configuración o dashboards aquí.
                    </Alert>
                </Stack>
            </Card>
        </Stack>
    );
}

import { Card } from "@/shared/ui/layout/card";
import { Container } from "@/shared/ui/layout/container";
import { Stack } from "@/shared/ui/layout/stack";
import { Button } from "@/shared/ui/primitives/button";
import { Input } from "@/shared/ui/primitives/input";
import { Label } from "@/shared/ui/primitives/label";
import { Alert, Spinner } from "@/shared/ui/feedback";

/**
 * UI Playground Page
 * Showcases various UI components from the shared/ui library.
 */
export default function UiPlaygroundPage() {
    return (
        <div className="bg-background text-foreground py-6">
            <Container>
                <Stack gap="4">
                    <div>
                        <p className="text-sm text-muted-foreground">
                            Catálogo UI (shared/ui)
                        </p>
                        <h1 className="text-2xl font-semibold">Playground</h1>
                        <p className="text-sm text-muted-foreground">
                            Componentes base listos para copiar y pegar.
                        </p>
                    </div>

                    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                        <Card title="Buttons" description="Variantes y estados">
                            <Stack gap="3">
                                <div className="flex flex-wrap gap-2">
                                    <Button variant="primary">Primary</Button>
                                    <Button variant="secondary">
                                        Secondary
                                    </Button>
                                    <Button variant="ghost">Ghost</Button>
                                </div>
                                <div className="flex flex-wrap gap-2">
                                    <Button variant="primary" size="sm">
                                        Small
                                    </Button>
                                    <Button variant="primary" size="md">
                                        Medium
                                    </Button>
                                    <Button variant="primary" size="lg">
                                        Large
                                    </Button>
                                </div>
                                <div className="flex flex-wrap gap-2">
                                    <Button variant="primary" disabled>
                                        Disabled
                                    </Button>
                                    <Button variant="primary" isLoading>
                                        Loading
                                    </Button>
                                </div>
                            </Stack>
                        </Card>

                        <Card
                            title="Form mini"
                            description="Label + Input + Button"
                        >
                            <Stack gap="3">
                                <div className="space-y-2">
                                    <Label htmlFor="email-demo">Email</Label>
                                    <Input
                                        id="email-demo"
                                        placeholder="correo@dominio.com"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="pass-demo">Password</Label>
                                    <Input
                                        id="pass-demo"
                                        type="password"
                                        placeholder="********"
                                    />
                                </div>
                                <Button variant="primary">Enviar</Button>
                            </Stack>
                        </Card>

                        <Card title="Alerts" description="Estados de feedback">
                            <Stack gap="3">
                                <Alert variant="info">
                                    Info: guardando cambios...
                                </Alert>
                                <Alert variant="success">
                                    Success: cambios guardados.
                                </Alert>
                                <Alert variant="warning">
                                    Warning: revisa los campos requeridos.
                                </Alert>
                                <Alert variant="error">
                                    Error: no se pudo guardar.
                                </Alert>
                            </Stack>
                        </Card>

                        <Card
                            title="Layout"
                            description="Stack, Card, Container"
                        >
                            <Stack gap="3">
                                <p className="text-sm text-muted-foreground">
                                    Stack permite direcciones responsivas. Card
                                    aporta padding y borde.
                                </p>
                                <Stack
                                    direction="col"
                                    mdDirection="row"
                                    gap="3"
                                >
                                    <Card className="flex-1 bg-surface-2 border-border">
                                        <p className="text-sm">Item A</p>
                                    </Card>
                                    <Card className="flex-1 bg-surface-2 border-border">
                                        <p className="text-sm">Item B</p>
                                    </Card>
                                </Stack>
                            </Stack>
                        </Card>

                        <Card title="Spinner" description="Indicador de carga">
                            <Stack gap="3" align="center">
                                <Spinner />
                                <div className="flex gap-3 items-center">
                                    <Spinner size="sm" />
                                    <Spinner size="md" />
                                    <Spinner size="lg" />
                                </div>
                            </Stack>
                        </Card>
                    </div>
                </Stack>
            </Container>
        </div>
    );
}

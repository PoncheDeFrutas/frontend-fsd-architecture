import { useNavigate, useRouter } from "@tanstack/react-router";
import { Container } from "@/shared/ui/layout/container";
import { Stack } from "@/shared/ui/layout/stack";
import { ErrorState } from "@/shared/ui/feedback";

type Props = {
    error: unknown;
};

export function RootErrorComponent({ error }: Props) {
    const navigate = useNavigate();
    const router = useRouter();
    const isDev = import.meta.env.DEV;

    const message =
        isDev && error instanceof Error
            ? error.message
            : "No pudimos cargar esta página.";

    const details =
        isDev && error ? ((error as Error).stack ?? String(error)) : null;

    return (
        <Container className="py-8">
            <Stack gap="4">
                <ErrorState
                    title="Algo salió mal"
                    message={message}
                    details={details}
                    onBack={() => router.history.go(-1)}
                    onHome={() => navigate({ to: "/" })}
                />
            </Stack>
        </Container>
    );
}

import { useNavigate } from "@tanstack/react-router";

export default function ForbiddenPage() {
    const navigate = useNavigate();

    return (
        <div className="p-6">
            <h1 className="text-xl font-semibold">403 - Forbidden</h1>
            <p className="mt-2">
                No tienes permisos para acceder a esta página.
            </p>

            <button
                className="mt-4 border rounded px-4 py-2"
                onClick={() => navigate({ to: "/" })}
            >
                Volver al inicio
            </button>
        </div>
    );
}

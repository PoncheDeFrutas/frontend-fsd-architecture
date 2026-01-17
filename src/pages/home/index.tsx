import { useAuth } from "@/features/auth";
import { useNavigate } from "@tanstack/react-router";

export default function HomePage() {
    const { user, signOut } = useAuth();
    const navigate = useNavigate();

    return (
        <div className="p-6 space-y-4">
            <h1 className="text-xl font-semibold">Home</h1>

            {user ? (
                <>
                    <p>Bienvenido, {user.email}</p>
                    <p>Rol: {user.role}</p>

                    <div className="flex gap-2">
                        <button
                            className="border rounded px-3 py-1"
                            onClick={() => navigate({ to: "/admin" })}
                        >
                            Admin
                        </button>

                        <button
                            className="border rounded px-3 py-1"
                            onClick={() => signOut()}
                        >
                            Logout
                        </button>
                    </div>
                </>
            ) : (
                <button
                    className="border rounded px-3 py-1"
                    onClick={() => navigate({ to: "/login" })}
                >
                    Login
                </button>
            )}
        </div>
    );
}

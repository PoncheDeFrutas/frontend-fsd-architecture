import { useState, useEffect } from "react";
import { useAuth } from "@/features/auth/model/use-auth";
import { useNavigate } from "@tanstack/react-router";

export default function LoginPage() {
    const { signIn, status, user } = useAuth();
    const navigate = useNavigate();

    const [email, setEmail] = useState("admin@test.com");
    const [password, setPassword] = useState("123");
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (user) {
            navigate({ to: "/" });
        }
    }, [user, navigate]);

    async function onSubmit(e: React.FormEvent) {
        e.preventDefault();
        setError(null);

        try {
            await signIn({ email, password });
            await navigate({ to: "/" });
        } catch (err) {
            setError(err instanceof Error ? err.message : "Login failed");
        }
    }

    return (
        <div className="p-6 max-w-md mx-auto">
            <h1 className="text-xl font-semibold mb-4">Login</h1>

            <form onSubmit={onSubmit} className="space-y-3">
                <input
                    className="w-full border rounded p-2"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="email"
                />

                <input
                    className="w-full border rounded p-2"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="password"
                    type="password"
                />

                <button
                    className="w-full border rounded p-2"
                    type="submit"
                    disabled={status === "loading"}
                >
                    {status === "loading" ? "Signing in..." : "Sign In"}
                </button>

                {error && <p className="text-sm text-red-600">{error}</p>}
            </form>
        </div>
    );
}

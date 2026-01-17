import { createContext } from "react";
import type { User, Permission } from "@/entities/user";
import type { SignInBody } from "@/features/auth";
import type { useMeQuery } from "./auth.queries";

export type AuthStatus = "loading" | "authenticated" | "anonymous";

export type AuthContextValue = {
    status: AuthStatus;
    user: User | null;

    isAdmin: boolean;
    hasPermission: (perm: Permission) => boolean;

    signIn: (body: SignInBody) => Promise<void>;
    signOut: () => Promise<void>;

    meQuery: ReturnType<typeof useMeQuery>;
};

export const AuthContext = createContext<AuthContextValue | null>(null);

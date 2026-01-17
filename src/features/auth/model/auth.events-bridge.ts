import { onAuthEvent } from "@/shared/api/http";
import { queryClient } from "@/shared/lib/react-query";
import { authKeys } from "./auth.keys";

/**
 * Call once on app startup.
 * - unauthorized: remove /auth/me cache so UI becomes anonymous
 * - forbidden: you can handle later (router redirect or toast)
 */
export function initAuthEventsBridge() {
    const unsubscribe = onAuthEvent((event) => {
        if (event.type === "unauthorized" || event.type === "signed_out") {
            queryClient.removeQueries({ queryKey: authKeys.me() });
        }

        // forbidden: leave it for routing/UI layer (later)
    });

    return unsubscribe;
}

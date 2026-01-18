// Model public API
export { AuthProvider } from "./model/auth.provider";
export { useAuth, useOptionalAuth } from "./model/use-auth";
export { requireAuth, requireRole, requirePermission } from "./model/guards";
export { authKeys } from "./model/auth.keys";
export { useMeQuery } from "./model/auth.queries";

// API public
export { authService } from "./api/auth.service";
export * from "./api/auth.schemas";
export type { MeResponse } from "./api/auth.service";

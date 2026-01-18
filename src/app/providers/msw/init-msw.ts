/**
 * Initializes Mock Service Worker (MSW) in development environment.
 * MSW is only activated if the VITE_MSW environment variable is set to "true".
 * This function dynamically imports the MSW worker and starts it with
 * unhandled requests set to "warn".
 */
export async function initMSW() {
    if (!import.meta.env.DEV) return;

    const enabled = String(import.meta.env.VITE_MSW ?? "false") === "true";
    if (!enabled) return;

    const { worker } = await import("@/shared/mocks/browser");

    await worker.start({
        onUnhandledRequest: "warn",
    });
}

export async function initMSW() {
    if (!import.meta.env.DEV) return;

    const enabled = String(import.meta.env.VITE_MSW ?? "false") === "true";
    if (!enabled) return;

    const { worker } = await import("@/shared/mocks/browser");

    await worker.start({
        onUnhandledRequest: "warn",
    });
}

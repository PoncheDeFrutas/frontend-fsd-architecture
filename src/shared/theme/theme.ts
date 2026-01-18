import type { ThemeMode } from "./types";

const DARK_QUERY = "(prefers-color-scheme: dark)";

export function getSystemPreference(): boolean {
    if (typeof window === "undefined" || !window.matchMedia) {
        return false;
    }

    return window.matchMedia(DARK_QUERY).matches;
}

export function resolveDark(mode: ThemeMode, systemIsDark?: boolean): boolean {
    if (mode === "dark") return true;
    if (mode === "light") return false;
    return systemIsDark ?? getSystemPreference();
}

export function subscribeToSystemTheme(
    onChange: (isDark: boolean) => void,
): () => void {
    if (typeof window === "undefined" || !window.matchMedia) {
        return () => {};
    }

    const media = window.matchMedia(DARK_QUERY);
    const listener = (event: MediaQueryListEvent) => {
        onChange(event.matches);
    };

    if (media.addEventListener) {
        media.addEventListener("change", listener);
    } else if (media.addListener) {
        media.addListener(listener);
    }

    return () => {
        if (media.removeEventListener) {
            media.removeEventListener("change", listener);
        } else if (media.removeListener) {
            media.removeListener(listener);
        }
    };
}

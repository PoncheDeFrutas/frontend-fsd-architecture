import type { ThemeMode } from "./types";

export const THEME_STORAGE_KEY = "app.theme";

export function getThemeMode(fallback: ThemeMode = "system"): ThemeMode {
    if (typeof window === "undefined") return fallback;

    const stored = window.localStorage.getItem(THEME_STORAGE_KEY);
    if (stored === "light" || stored === "dark" || stored === "system") {
        return stored;
    }

    return fallback;
}

export function setThemeMode(mode: ThemeMode) {
    if (typeof window === "undefined") return;
    window.localStorage.setItem(THEME_STORAGE_KEY, mode);
}

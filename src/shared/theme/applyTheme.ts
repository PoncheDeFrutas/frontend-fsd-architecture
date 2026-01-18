import { resolveDark, getSystemPreference } from "./theme";
import type { ThemeMode } from "./types";

export function applyTheme(mode: ThemeMode, systemIsDark?: boolean) {
    if (typeof document === "undefined") return;

    const isDark = resolveDark(mode, systemIsDark ?? getSystemPreference());
    const root = document.documentElement;

    root.classList.toggle("dark", isDark);
    root.style.colorScheme = isDark ? "dark" : "light";

    return isDark;
}

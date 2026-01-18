import {
    useCallback,
    useEffect,
    useMemo,
    useState,
    type ReactNode,
} from "react";
import { applyTheme } from "./applyTheme";
import { getThemeMode, setThemeMode } from "./storage";
import {
    getSystemPreference,
    resolveDark,
    subscribeToSystemTheme,
} from "./theme";
import type { ThemeMode } from "./types";
import { ThemeContext, type ThemeContextValue } from "./ThemeContext";

export function ThemeProvider({ children }: { children: ReactNode }) {
    const [mode, setModeState] = useState<ThemeMode>(() => getThemeMode());
    const [systemIsDark, setSystemIsDark] = useState<boolean>(() =>
        typeof window !== "undefined" ? getSystemPreference() : false,
    );

    useEffect(() => {
        if (mode !== "system") return;

        const unsubscribe = subscribeToSystemTheme((isDark) => {
            setSystemIsDark(isDark);
        });

        return unsubscribe;
    }, [mode]);

    useEffect(() => {
        setThemeMode(mode);
        applyTheme(mode, systemIsDark);
    }, [mode, systemIsDark]);

    const setMode = useCallback((nextMode: ThemeMode) => {
        setModeState(nextMode);
    }, []);

    const cycleMode = useCallback(() => {
        setModeState((prev) => {
            if (prev === "light") return "dark";
            if (prev === "dark") return "system";
            return "light";
        });
    }, []);

    const value = useMemo<ThemeContextValue>(
        () => ({
            mode,
            isDark: resolveDark(mode, systemIsDark),
            setMode,
            cycleMode,
        }),
        [cycleMode, mode, setMode, systemIsDark],
    );

    return (
        <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
    );
}

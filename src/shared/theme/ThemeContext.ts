import { createContext } from "react";
import type { ThemeMode } from "./types";

export interface ThemeContextValue {
    mode: ThemeMode;
    isDark: boolean;
    setMode: (mode: ThemeMode) => void;
    cycleMode: () => void;
}

export const ThemeContext = createContext<ThemeContextValue | undefined>(
    undefined,
);

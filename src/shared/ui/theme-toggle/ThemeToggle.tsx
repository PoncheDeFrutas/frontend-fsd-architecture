import { cn } from "@/shared/lib/cn";
import { useTheme } from "@/shared/theme";
import type { ThemeMode } from "@/shared/theme";

const options: { value: ThemeMode; label: string }[] = [
    { value: "light", label: "Claro" },
    { value: "dark", label: "Oscuro" },
    { value: "system", label: "Sistema" },
];

interface ThemeToggleProps {
    className?: string;
}

export function ThemeToggle({ className }: ThemeToggleProps) {
    const { mode, setMode, cycleMode } = useTheme();

    return (
        <div
            className={cn(
                "inline-flex items-center rounded-lg border border-border bg-surface text-foreground shadow-sm",
                className,
            )}
            role="group"
            aria-label="Cambiar tema"
        >
            {options.map((option) => {
                const isActive = option.value === mode;
                return (
                    <button
                        key={option.value}
                        type="button"
                        onClick={() => setMode(option.value)}
                        className={cn(
                            "px-3 py-1.5 text-xs font-medium transition-colors first:rounded-l-lg last:rounded-r-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary",
                            isActive
                                ? "bg-primary text-primary-foreground shadow"
                                : "text-foreground/80 hover:bg-surface-2",
                        )}
                        aria-pressed={isActive}
                    >
                        {option.label}
                    </button>
                );
            })}
            <button
                type="button"
                onClick={cycleMode}
                className={cn(
                    "hidden px-2 text-xs text-muted-foreground hover:text-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary sm:inline",
                )}
                title="Alternar tema"
                aria-label="Alternar tema"
            >
                ↺
            </button>
        </div>
    );
}
